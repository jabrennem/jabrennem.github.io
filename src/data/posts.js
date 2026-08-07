const posts = [
  {
    slug: 'serverless-etl',
    status: 'Series 01 · Serverless ETL',
    title: 'From S3 event to Iceberg table',
    description: 'The initial architecture: prefix-scoped S3 events, EventBridge routing, Step Functions orchestration, and EMR Serverless execution.',
    outline: [
      'Why this ingestion boundary and event flow',
      'Writing a reliable EMR Serverless job',
      'Operating the pipeline: retries, data layout, and costs',
    ],
    keywords: 'AWS SAM · S3 · EventBridge · Step Functions · EMR Serverless · Apache Iceberg · Lakehouse',
    search: 'serverless etl s3 eventbridge step functions emr serverless apache iceberg data lake lakehouse athena ingestion',
    repoUrl: 'https://github.com/jabrennem/aws-sam-serverless-etl',
  },
  {
    slug: 'cross-account-ecr',
    status: 'Series 02 · CDK construct',
    title: 'Cross-account ECR pull access without a policy sprawl',
    description: 'A reusable CDK abstraction for organization-aware image sharing, with its security assumptions made explicit.',
    outline: [
      'Defining the construct\'s public interface',
      'Designing and testing the repository policy',
      'What the synthesized CloudFormation makes visible',
    ],
    keywords: 'AWS CDK · Amazon ECR · AWS Organizations · IAM · TypeScript · CloudFormation',
    search: 'cross account ecr cdk cloudformation aws organizations iam repository policy container registry typescript infrastructure as code',
  },
  {
    slug: 'batch-workflow-launcher',
    status: 'Series 03 · Batch workflow launcher',
    title: 'Making a batch workflow inspectable from the start',
    description: 'An orchestration pattern for validating manifests, generating commands, and handing containerized work to AWS Batch.',
    outline: [
      'Choosing the workflow boundary',
      'Validation and command construction',
      'Retries, job state, and traceability',
    ],
    keywords: 'AWS SAM · Step Functions · AWS Batch · Docker · Lambda · Scientific workflows',
    search: 'batch workflow launcher step functions aws batch docker lambda scientific workflow manifest validation job queue orchestration',
  },
  {
    slug: 'juno',
    status: 'Series 04 · Juno',
    title: 'Notes from building a more thoughtful DAW',
    description: 'Juno is a private music-technology project exploring AI-native production workflows, informed by the practical friction of writing, mixing, and finishing music.',
    outline: [
      'The workflow problems worth solving first',
      'Designing an agent-native production tool',
      'What production practice teaches the product',
    ],
    keywords: 'DAW · Music technology · AI-native · Agents · MCP · Mixing · Mastering',
    search: 'juno daw digital audio workstation music technology ai native agent mcp music production mixing mastering juce c++',
  },
  {
    slug: 'tensor-album-mix',
    status: 'Studio note · Tensor',
    title: 'Mixing a new Tensor album',
    description: 'A production journal on taking a new Tensor record from final arrangements through mixing and mastering—decisions, revisions, and the details that make a collection feel cohesive.',
    outline: [
      'Creating a mix language for the record',
      'Balancing translation, dynamics, and character',
      'What I will carry into the next production',
    ],
    keywords: 'Tensor · Album mixing · Mastering · Arrangement · Dynamics · Studio production',
    search: 'tensor album mixing mastering music production arrangement dynamics translation studio recording audio',
  },
];

export default posts;
