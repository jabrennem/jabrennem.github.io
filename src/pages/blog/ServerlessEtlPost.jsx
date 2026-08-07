import { Link } from 'react-router-dom';
import ArchitectureDiagram from '../../components/ArchitectureDiagram';

export default function ServerlessEtlPost() {
  return (
    <article className="blog-article">
      <div className="page-intro">
        <p className="eyebrow">Series 01 &middot; Serverless ETL</p>
        <h1>From S3 event to Iceberg table</h1>
        <p>
          An in-depth walkthrough of a production-grade serverless ETL pipeline that ingests
          Parquet files from S3 into managed Apache Iceberg tables using AWS SAM, Step Functions,
          Lambda, and EMR Serverless.
        </p>
        <p>
          <a className="text-link" href="https://github.com/jabrennem/aws-sam-serverless-etl" target="_blank" rel="noopener noreferrer">
            View the repository on GitHub &rarr;
          </a>
        </p>
      </div>

      <ArchitectureDiagram />

      {/* --- Section 1: Why this architecture --- */}
      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Part 1</p>
          <h2>Why this ingestion boundary and event flow</h2>
        </div>

        <h3>The problem</h3>
        <p>
          A common data-platform pattern is: files land in S3, and something needs to turn them
          into queryable tables. The challenge is doing it reliably, cheaply, and with enough
          observability to diagnose failures without a dedicated operations team.
        </p>
        <p>
          This pipeline targets <strong>S3 Table Buckets</strong>&mdash;AWS's managed Apache Iceberg
          offering&mdash;as the output format. Iceberg gives us schema evolution, time-travel queries,
          and partition management without maintaining a metastore, while S3 Table Buckets handle
          compaction and snapshotting automatically.
        </p>

        <h3>Design decisions</h3>
        <dl className="design-decisions">
          <dt>Prefix-scoped triggers, not bucket-wide</dt>
          <dd>
            The EventBridge rule only fires for objects created under <code>feed/</code>. This keeps
            internal artifacts (the PySpark script at <code>emr/</code>, run stats at <code>runs/</code>)
            from triggering the pipeline recursively.
          </dd>
          <dt>EventBridge over S3 event notifications</dt>
          <dd>
            S3 sends events to EventBridge natively once <code>EventBridgeConfiguration</code> is enabled
            on the bucket. Compared to direct Lambda triggers or SQS destinations, EventBridge gives us
            content-based routing (the prefix filter), replay capability, and decoupling between the event
            source and the consumer.
          </dd>
          <dt>Step Functions as the orchestrator, not Lambda chaining</dt>
          <dd>
            The pipeline is not a single transform&mdash;it validates, fans out across tables, runs Spark
            jobs, collects stats, and emits downstream events. Step Functions makes this observable via
            execution history, adds retry/backoff for free, and removes the 15-minute Lambda timeout
            constraint from the critical path.
          </dd>
          <dt>EMR Serverless over Glue</dt>
          <dd>
            EMR Serverless gives direct control of the Spark session configuration&mdash;critical for
            wiring the Iceberg REST catalog (Glue's new REST interface for S3 Table Buckets). It
            also starts from zero and scales back to zero, so you only pay per-job.
          </dd>
        </dl>

        <h3>Event flow</h3>
        <p>The full path from upload to queryable table:</p>
        <ol>
          <li>A Parquet file lands in <code>s3://&lt;DataBucket&gt;/feed/</code></li>
          <li>S3 emits an <em>Object Created</em> event to EventBridge</li>
          <li>
            An EventBridge rule matches the <code>feed/</code> prefix and starts the Step Functions
            state machine, injecting the object key via an <code>InputTransformer</code>
          </li>
          <li>The state machine invokes a Lambda to validate the input and resolve table names</li>
          <li>A <code>Map</code> state fans out one EMR Serverless Spark job per table</li>
          <li>Each Spark job reads Parquet, writes to the Iceberg table, and emits a stats JSON</li>
          <li>The state machine reads stats back and emits a <code>TableLoadComplete</code> event</li>
          <li>If any table fails, the overall execution is marked <em>Failed</em></li>
        </ol>
      </section>

      {/* --- Section 2: The infrastructure --- */}
      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Part 2</p>
          <h2>Infrastructure as code: the SAM template</h2>
        </div>

        <p>
          The entire stack is defined in a single <code>template.yaml</code> using the AWS SAM
          transform. Here's what gets deployed and why each resource exists.
        </p>

        <h3>Security foundations</h3>
        <ul>
          <li>
            <strong>KMS key with auto-rotation</strong> &mdash; All data at rest in the data bucket
            is encrypted with a customer-managed key. Bucket-key is enabled to reduce KMS API costs.
          </li>
          <li>
            <strong>Bucket policy</strong> &mdash; Denies any non-SSL traffic and scopes access to
            the AWS Organization via <code>aws:PrincipalOrgID</code>. No public access is possible.
          </li>
          <li>
            <strong>Versioning + lifecycle</strong> &mdash; Non-current object versions expire after
            30 days, giving a recovery window without unbounded storage growth.
          </li>
          <li>
            <strong>Access logging</strong> &mdash; The bucket logs to a separate logging bucket
            with a stack-specific prefix.
          </li>
        </ul>

        <h3>S3 Table Bucket resources</h3>
        <p>
          Three CloudFormation resources define the Iceberg destination:
        </p>
        <ul>
          <li><code>AWS::S3Tables::TableBucket</code> &mdash; The bucket itself</li>
          <li><code>AWS::S3Tables::Namespace</code> &mdash; A <code>default</code> namespace</li>
          <li>
            <code>AWS::S3Tables::Table</code> &mdash; A <code>test_data</code> table with a declared
            Iceberg schema (id: long, name: string, amount: double)
          </li>
        </ul>
        <p>
          Defining the table in CloudFormation means it exists before the first pipeline run&mdash;no
          "create table if not exists" logic in Spark needed.
        </p>

        <h3>EMR Serverless application</h3>
        <p>
          The <code>EmrApp</code> resource creates a Spark application on EMR release 7.8.0 (ARM64).
          Auto-start and auto-stop are both enabled with a 2-minute idle timeout. This means:
        </p>
        <ul>
          <li>No pre-warmed capacity sitting idle between runs</li>
          <li>Cold-start latency only on the first job after idle timeout</li>
          <li>Zero ongoing cost when the pipeline isn't running</li>
        </ul>

        <h3>IAM: least-privilege per service</h3>
        <p>
          The template defines separate roles for each actor:
        </p>
        <dl className="design-decisions">
          <dt>EmrAppRole</dt>
          <dd>
            Allows the Spark job to read Parquet from the data bucket, write stats to <code>runs/</code>,
            interact with the S3 Table Bucket via <code>s3tables:*</code> actions, read/write via the
            Glue Iceberg catalog, and call <code>lakeformation:GetDataAccess</code>.
          </dd>
          <dt>StateMachineRole</dt>
          <dd>
            Can invoke the validation Lambda, start/get/cancel EMR job runs, pass the EMR role,
            read stats objects, emit EventBridge events, and write execution logs.
          </dd>
          <dt>EventBridgeStateMachineRole</dt>
          <dd>
            Only permission: <code>states:StartExecution</code> on the state machine ARN.
          </dd>
        </dl>
        <p>
          Every Resource ARN is scoped as tightly as possible&mdash;no <code>Resource: "*"</code> except
          where AWS requires it (X-Ray sampling, CloudWatch log delivery).
        </p>
      </section>

      {/* --- Section 3: Validation Lambda --- */}
      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Part 3</p>
          <h2>Writing a reliable validation layer</h2>
        </div>

        <p>
          The <code>ValidateInputFunction</code> is the first step in the state machine. It serves
          two purposes:
        </p>
        <ol>
          <li>
            <strong>Schema validation</strong> &mdash; Uses AWS Lambda Powertools' <code>validate()</code>
            against a JSON Schema to reject malformed inputs before any compute runs.
          </li>
          <li>
            <strong>Table name resolution</strong> &mdash; Maps source file paths to Iceberg table names
            using regex patterns defined in <code>file_mapping.json</code>.
          </li>
        </ol>

        <h3>Why separate validation from orchestration?</h3>
        <p>
          The state machine's <code>InputTransformer</code> constructs a payload from the EventBridge
          event. If that payload is malformed (missing key, wrong type), the EMR job would start and
          then fail after provisioning a Spark cluster. By validating first in a sub-second Lambda
          invocation, we fail fast and cheaply.
        </p>

        <h3>Pattern-based table resolution</h3>
        <p>
          The EventBridge rule passes only the S3 object key. The Lambda resolves which Iceberg table
          to write to by matching the key against regex patterns:
        </p>
        <pre><code>{`// file_mapping.json
{
  "mappings": [
    {"tableName": "test_data", "filePattern": ".*/test-data\\\\.parquet$"}
  ]
}`}</code></pre>
        <p>
          Patterns are sorted by specificity (longest first) so more specific rules win. If no
          pattern matches, the Lambda raises an error and the execution fails immediately with a
          clear diagnostic message.
        </p>
        <p>
          This design means adding a new table requires only a new entry in the mapping file and
          a corresponding table definition in the SAM template&mdash;no orchestration changes.
        </p>
      </section>

      {/* --- Section 4: The PySpark job --- */}
      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Part 4</p>
          <h2>The EMR Serverless Spark job</h2>
        </div>

        <p>
          The <code>load_data.py</code> PySpark script is intentionally minimal. Its responsibilities:
        </p>
        <ol>
          <li>Read a single Parquet file from S3</li>
          <li>Write its contents to the target Iceberg table via <code>INSERT OVERWRITE</code></li>
          <li>Write a JSON stats file back to S3 for the orchestrator to consume</li>
        </ol>

        <h3>Catalog configuration</h3>
        <p>
          The Spark session is configured entirely via <code>SparkSubmitParameters</code> in the state
          machine definition&mdash;not in the Python code. This keeps the script portable and testable
          outside EMR:
        </p>
        <pre><code>{`--conf spark.sql.catalog.s3tablesbucket=org.apache.iceberg.spark.SparkCatalog
--conf spark.sql.catalog.s3tablesbucket.type=rest
--conf spark.sql.catalog.s3tablesbucket.uri=https://glue.<region>.amazonaws.com/iceberg
--conf spark.sql.catalog.s3tablesbucket.warehouse=<account>:s3tablescatalog/<bucket>
--conf spark.sql.catalog.s3tablesbucket.rest.sigv4-enabled=true
--conf spark.sql.catalog.s3tablesbucket.rest.signing-name=glue`}</code></pre>
        <p>
          This uses Glue's REST catalog endpoint&mdash;the integration path for S3 Table Buckets.
          SigV4 signing is required because the endpoint is IAM-authenticated, not token-based.
        </p>

        <h3>Stats as a coordination mechanism</h3>
        <p>
          After writing data, the script writes a small JSON file to
          <code>s3://&lt;bucket&gt;/runs/&lt;execution-id&gt;/stats/&lt;table&gt;.json</code>:
        </p>
        <pre><code>{`{
  "table": "test_data",
  "rowCount": 1000,
  "input": "<bucket>/feed/test-data.parquet",
  "output": "<catalog-id>/default.test_data"
}`}</code></pre>
        <p>
          The state machine reads this file in the <code>Get Stats Object</code> step to propagate
          structured metadata downstream without parsing Spark logs. If the stats file is missing
          after a successful EMR job (shouldn't happen, but defense in depth), the table is marked
          as failed.
        </p>
      </section>

      {/* --- Section 5: Step Functions orchestration --- */}
      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Part 5</p>
          <h2>Step Functions orchestration</h2>
        </div>

        <p>
          The state machine uses JSONata query language (not JSONPath) for data transformations.
          Here's the execution flow:
        </p>

        <h3>State-by-state breakdown</h3>
        <dl className="design-decisions">
          <dt>Validate Input</dt>
          <dd>
            Invokes the Lambda synchronously. The entire event payload is forwarded. On success,
            the Lambda's response (enriched with resolved table names) replaces the state input.
          </dd>
          <dt>Load Tables (Map)</dt>
          <dd>
            Iterates over <code>SourceFileTableNameMapping</code>. Each item gets its own
            sub-execution with the full EMR &rarr; stats &rarr; emit &rarr; succeed/fail pipeline.
            Inline mode means up to 40 concurrent iterations.
          </dd>
          <dt>Load Data (EMR job)</dt>
          <dd>
            Uses the <code>emr-serverless:startJobRun.sync</code> integration&mdash;Step Functions
            polls EMR until the job completes, so no custom polling loop is needed. Retries
            EMR-specific transient errors with exponential backoff (15s base, 2x rate, 10 attempts
            max = ~4.25 hours of retry budget).
          </dd>
          <dt>Get Stats Object</dt>
          <dd>
            Direct SDK integration: calls <code>s3:getObject</code> and parses the JSON body using
            JSONata's <code>$parse()</code>.
          </dd>
          <dt>Emit Job Complete</dt>
          <dd>
            Puts a structured <code>TableLoadComplete</code> event on the default EventBridge bus.
            Downstream consumers (Athena refresh, notifications, audit) can subscribe independently.
            Event emission failure is caught and treated as non-fatal.
          </dd>
          <dt>Check Table Results</dt>
          <dd>
            A <code>Choice</code> state that counts failed items. If any table has
            <code>status: "failed"</code>, the execution fails. This makes partial success visible
            in the Step Functions console.
          </dd>
        </dl>

        <h3>Error handling philosophy</h3>
        <p>
          Each step in the Map iteration has its own <code>Catch</code> block that captures the error
          and routes to a <code>Fail Item</code> pass state. This means one table's failure doesn't
          abort other tables' processing. The aggregation happens at the end in
          <code>Check Table Results</code>.
        </p>
      </section>

      {/* --- Section 6: Operating the pipeline --- */}
      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Part 6</p>
          <h2>Operating the pipeline: deployment, Lake Formation, and costs</h2>
        </div>

        <h3>Deployment workflow</h3>
        <p>
          Build and deploy are standard SAM:
        </p>
        <pre><code>{`sam build && sam deploy`}</code></pre>
        <p>
          A <code>post-deploy.sh</code> script handles two things CloudFormation can't do natively:
        </p>
        <ol>
          <li>
            <strong>Upload the PySpark script</strong> to <code>s3://&lt;bucket&gt;/emr/load_data.py</code>.
            EMR Serverless reads its entrypoint from S3&mdash;it's not bundled in the deployment
            artifact.
          </li>
          <li>
            <strong>Apply Lake Formation grants</strong> at the catalog, database, and table level.
            The <code>AWS::LakeFormation::PrincipalPermissions</code> resource doesn't support the
            compound catalog IDs that S3 Table Buckets use, so these are applied via CLI. The grants
            are idempotent.
          </li>
        </ol>

        <h3>Lake Formation integration</h3>
        <p>
          If your account uses Lake Formation with restrictive defaults (i.e. <code>IAMAllowedPrincipals</code>
          removed from default database creators), the EMR role needs explicit grants:
        </p>
        <ul>
          <li><strong>Catalog</strong>: <code>CREATE_DATABASE</code>, <code>DESCRIBE</code></li>
          <li><strong>Database</strong>: <code>DESCRIBE</code>, <code>ALTER</code>, <code>CREATE_TABLE</code></li>
          <li><strong>Table (wildcard)</strong>: <code>SELECT</code>, <code>INSERT</code>, <code>DESCRIBE</code>, <code>ALTER</code>, <code>DROP</code></li>
        </ul>

        <h3>Cost model</h3>
        <p>
          The pipeline is designed to cost effectively nothing at rest:
        </p>
        <ul>
          <li><strong>EMR Serverless</strong>: Pay per vCPU-hour and GB-hour only while a job runs</li>
          <li><strong>Step Functions</strong>: $0.025 per 1,000 state transitions</li>
          <li><strong>Lambda</strong>: Sub-second invocation, ARM64, within free tier for light use</li>
          <li><strong>EventBridge</strong>: $1/million events</li>
          <li><strong>S3 Table Bucket</strong>: Standard S3 storage pricing + Iceberg metadata overhead</li>
        </ul>
        <p>
          The dominant cost driver is EMR Serverless compute time. The 2-minute auto-stop timeout
          ensures you're not paying for idle clusters between batch windows.
        </p>

        <h3>Extending the pipeline</h3>
        <p>
          Adding a new ingestion target requires three changes:
        </p>
        <ol>
          <li>Add a regex pattern to <code>file_mapping.json</code></li>
          <li>Add an <code>AWS::S3Tables::Table</code> resource to the SAM template</li>
          <li>Redeploy</li>
        </ol>
        <p>
          No changes to the state machine, Lambda code, or PySpark script. The architecture is
          table-count-agnostic by design.
        </p>
      </section>

      {/* --- Section 7: What I'd do differently --- */}
      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Part 7</p>
          <h2>Tradeoffs and next steps</h2>
        </div>

        <h3>Current tradeoffs</h3>
        <ul>
          <li>
            <strong>INSERT OVERWRITE, not MERGE</strong> &mdash; The current job does a full overwrite.
            For append-only feeds this is fine; for update-heavy data you'd want an upsert/merge
            strategy with a deduplication key.
          </li>
          <li>
            <strong>Single-file-per-event granularity</strong> &mdash; Each file triggers a full
            execution. For high-frequency small files, a micro-batching strategy (SQS buffer +
            scheduled trigger) would reduce per-file overhead.
          </li>
          <li>
            <strong>No dead-letter queue</strong> &mdash; Failed events currently surface only in
            Step Functions execution history. A DLQ on the EventBridge target would make
            unprocessable events more discoverable.
          </li>
        </ul>

        <h3>Possible next iterations</h3>
        <ul>
          <li>Schema evolution handling&mdash;detect new columns in Parquet and evolve the Iceberg schema</li>
          <li>Data quality checks (Great Expectations or Deequ) as a pre-write gate</li>
          <li>Cost attribution tagging on EMR job runs</li>
          <li>Multi-account deployment via AWS Organizations + StackSets</li>
        </ul>
      </section>

      <p>
        <Link className="text-link" to="/blog">&larr; All build notes</Link>
      </p>
    </article>
  );
}
