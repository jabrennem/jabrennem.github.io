export default function ArchitectureDiagram({ thumbnail = false }) {
  if (thumbnail) {
    return (
      <figure className="architecture-diagram architecture-diagram--thumbnail" aria-label="Pipeline architecture diagram (thumbnail)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 820 120"
          role="img"
          aria-labelledby="arch-diagram-thumb-title"
          style={{ width: '100%', height: 'auto' }}
        >
          <title id="arch-diagram-thumb-title">
            Architecture overview: S3 → SQS → Message Poller → Step Functions → EMR Serverless → S3 Table Bucket
          </title>
          <defs>
            <marker id="arrow-thumb" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#86d2c2" />
            </marker>
          </defs>

          {/* Edges */}
          <g stroke="#86d2c2" strokeWidth="1.2" fill="none" markerEnd="url(#arrow-thumb)">
            <path d="M84,60 L114,60" />
            <path d="M198,60 L228,60" />
            <path d="M336,60 L366,60" />
            <path d="M492,60 L522,60" />
            <path d="M624,60 L654,60" />
          </g>

          {/* Nodes */}
          <g>
            <rect x="6" y="38" width="78" height="44" rx="4" fill="#1c2531" stroke="#2c3949" strokeWidth="1" />
            <text x="45" y="64" textAnchor="middle" fill="#eff3f8" fontSize="11" fontFamily="Inter, system-ui, sans-serif">S3</text>

            <rect x="118" y="38" width="80" height="44" rx="4" fill="#1c2531" stroke="#2c3949" strokeWidth="1" />
            <text x="158" y="64" textAnchor="middle" fill="#eff3f8" fontSize="11" fontFamily="Inter, system-ui, sans-serif">SQS</text>

            <rect x="232" y="38" width="104" height="44" rx="4" fill="#1c2531" stroke="#2c3949" strokeWidth="1" />
            <text x="284" y="57" textAnchor="middle" fill="#eff3f8" fontSize="11" fontFamily="Inter, system-ui, sans-serif">Poller</text>
            <text x="284" y="72" textAnchor="middle" fill="#aab7c7" fontSize="9" fontFamily="Inter, system-ui, sans-serif">Lambda</text>

            <rect x="370" y="38" width="122" height="44" rx="4" fill="#1c2531" stroke="#86d2c2" strokeWidth="1.2" />
            <text x="431" y="64" textAnchor="middle" fill="#eff3f8" fontSize="11" fontFamily="Inter, system-ui, sans-serif">Step Functions</text>

            <rect x="526" y="38" width="98" height="44" rx="4" fill="#1c2531" stroke="#2c3949" strokeWidth="1" />
            <text x="575" y="57" textAnchor="middle" fill="#eff3f8" fontSize="11" fontFamily="Inter, system-ui, sans-serif">EMR</text>
            <text x="575" y="72" textAnchor="middle" fill="#aab7c7" fontSize="9" fontFamily="Inter, system-ui, sans-serif">Serverless</text>

            <rect x="658" y="38" width="86" height="44" rx="4" fill="#1c2531" stroke="#86d2c2" strokeWidth="1.2" />
            <text x="701" y="57" textAnchor="middle" fill="#eff3f8" fontSize="11" fontFamily="Inter, system-ui, sans-serif">S3</text>
            <text x="701" y="72" textAnchor="middle" fill="#aab7c7" fontSize="9" fontFamily="Inter, system-ui, sans-serif">Iceberg</text>
          </g>
        </svg>
      </figure>
    );
  }

  return (
    <figure className="architecture-diagram" aria-label="Pipeline architecture diagram">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1120 430"
        role="img"
        aria-labelledby="arch-diagram-title"
        style={{ width: '100%', height: 'auto', maxWidth: '1120px' }}
      >
        <title id="arch-diagram-title">
          Architecture: S3 feed uploads go through an EventBridge rule into an SQS queue. On a schedule,
          EventBridge Scheduler invokes a Message Poller Lambda that drains the queue and starts one Step
          Functions execution. Step Functions validates and bin-packs the files, then a Map state runs one EMR
          Serverless Spark job per group, writing to the test_data and customers Iceberg tables in an S3 Table
          Bucket, writing per-group stats to S3, and publishing a GroupLoadComplete event to EventBridge.
        </title>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#86d2c2" />
          </marker>
        </defs>

        {/* Edges */}
        <g stroke="#86d2c2" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)">
          {/* S3 -> EventBridge */}
          <path d="M126,70 L164,70" />
          {/* EventBridge -> SQS */}
          <path d="M296,70 L334,70" />
          {/* SQS -> Poller (drain, dashed) */}
          <path d="M410,104 L410,160 L296,190" strokeDasharray="5 4" />
          {/* Scheduler -> Poller */}
          <path d="M126,200 L164,200" />
          {/* Poller -> Step Functions */}
          <path d="M296,205 C360,215 400,220 452,222" />
          {/* SFN -> EMR */}
          <path d="M624,210 L688,210" />
          {/* EMR -> Iceberg */}
          <path d="M860,182 C890,168 912,158 934,158" />
          {/* EMR -> Stats */}
          <path d="M860,240 C890,256 912,266 933,266" />
          {/* SFN -> GroupLoadComplete */}
          <path d="M540,266 C560,320 600,352 646,362" />
        </g>

        {/* Nodes */}
        <g>
          {/* S3 (feed/) */}
          <rect x="8" y="43" width="118" height="54" rx="4" fill="#1c2531" stroke="#2c3949" strokeWidth="1" />
          <text x="67" y="75" textAnchor="middle" fill="#eff3f8" fontSize="14" fontFamily="Inter, system-ui, sans-serif">S3 (feed/)</text>

          {/* EventBridge */}
          <rect x="164" y="43" width="132" height="54" rx="4" fill="#1c2531" stroke="#2c3949" strokeWidth="1" />
          <text x="230" y="75" textAnchor="middle" fill="#eff3f8" fontSize="14" fontFamily="Inter, system-ui, sans-serif">EventBridge</text>

          {/* SQS Queue */}
          <rect x="334" y="43" width="132" height="54" rx="4" fill="#1c2531" stroke="#86d2c2" strokeWidth="1.5" />
          <text x="400" y="75" textAnchor="middle" fill="#eff3f8" fontSize="14" fontFamily="Inter, system-ui, sans-serif">SQS Queue</text>

          {/* EventBridge Scheduler */}
          <rect x="8" y="173" width="118" height="60" rx="4" fill="#1c2531" stroke="#2c3949" strokeWidth="1" />
          <text x="67" y="199" textAnchor="middle" fill="#eff3f8" fontSize="13" fontFamily="Inter, system-ui, sans-serif">Scheduler</text>
          <text x="67" y="216" textAnchor="middle" fill="#aab7c7" fontSize="11" fontFamily="Inter, system-ui, sans-serif">every 2 min</text>

          {/* Message Poller Lambda */}
          <rect x="164" y="173" width="132" height="60" rx="4" fill="#1c2531" stroke="#2c3949" strokeWidth="1" />
          <text x="230" y="199" textAnchor="middle" fill="#eff3f8" fontSize="13" fontFamily="Inter, system-ui, sans-serif">Message Poller</text>
          <text x="230" y="216" textAnchor="middle" fill="#aab7c7" fontSize="11" fontFamily="Inter, system-ui, sans-serif">Lambda (drain)</text>

          {/* Step Functions */}
          <rect x="454" y="183" width="170" height="86" rx="4" fill="#1c2531" stroke="#86d2c2" strokeWidth="1.5" />
          <text x="539" y="215" textAnchor="middle" fill="#eff3f8" fontSize="14" fontFamily="Inter, system-ui, sans-serif">Step Functions</text>
          <text x="539" y="236" textAnchor="middle" fill="#aab7c7" fontSize="11" fontFamily="Inter, system-ui, sans-serif">Validate + bin-pack</text>
          <text x="539" y="252" textAnchor="middle" fill="#aab7c7" fontSize="11" fontFamily="Inter, system-ui, sans-serif">Map: 1 job / group</text>

          {/* EMR Serverless (stacked to convey fan-out) */}
          <rect x="700" y="170" width="160" height="78" rx="4" fill="#1c2531" stroke="#2c3949" strokeWidth="1" />
          <rect x="694" y="177" width="160" height="78" rx="4" fill="#1c2531" stroke="#2c3949" strokeWidth="1" />
          <rect x="688" y="184" width="160" height="78" rx="4" fill="#1c2531" stroke="#2c3949" strokeWidth="1" />
          <text x="768" y="216" textAnchor="middle" fill="#eff3f8" fontSize="14" fontFamily="Inter, system-ui, sans-serif">EMR Serverless</text>
          <text x="768" y="238" textAnchor="middle" fill="#aab7c7" fontSize="11" fontFamily="Inter, system-ui, sans-serif">Spark · per group</text>

          {/* S3 Table Bucket (Iceberg, 2 tables) */}
          <rect x="938" y="120" width="176" height="78" rx="4" fill="#1c2531" stroke="#86d2c2" strokeWidth="1.5" />
          <text x="1026" y="148" textAnchor="middle" fill="#eff3f8" fontSize="13" fontFamily="Inter, system-ui, sans-serif">S3 Table Bucket</text>
          <text x="1026" y="170" textAnchor="middle" fill="#aab7c7" fontSize="11" fontFamily="Inter, system-ui, sans-serif">Iceberg: test_data,</text>
          <text x="1026" y="185" textAnchor="middle" fill="#aab7c7" fontSize="11" fontFamily="Inter, system-ui, sans-serif">customers</text>

          {/* S3 (runs/stats/) */}
          <rect x="938" y="240" width="176" height="54" rx="4" fill="#1c2531" stroke="#2c3949" strokeWidth="1" />
          <text x="1026" y="272" textAnchor="middle" fill="#eff3f8" fontSize="14" fontFamily="Inter, system-ui, sans-serif">S3 (runs/stats/)</text>

          {/* EventBridge GroupLoadComplete */}
          <rect x="648" y="344" width="201" height="70" rx="4" fill="#1c2531" stroke="#2c3949" strokeWidth="1" />
          <text x="748.5" y="374" textAnchor="middle" fill="#eff3f8" fontSize="14" fontFamily="Inter, system-ui, sans-serif">EventBridge</text>
          <text x="748.5" y="395" textAnchor="middle" fill="#aab7c7" fontSize="12" fontFamily="Inter, system-ui, sans-serif">GroupLoadComplete</text>
        </g>
      </svg>
    </figure>
  );
}
