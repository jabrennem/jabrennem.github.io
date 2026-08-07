export default function ArchitectureDiagram() {
  return (
    <figure className="architecture-diagram" aria-label="Pipeline architecture diagram">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1035 350"
        role="img"
        aria-labelledby="arch-diagram-title"
        style={{ width: '100%', height: 'auto', maxWidth: '1035px' }}
      >
        <title id="arch-diagram-title">
          Architecture: S3 feed prefix triggers EventBridge, which starts Step Functions. Step Functions
          invokes Lambda for validation, then EMR Serverless Spark to write to an S3 Table Bucket and
          emit stats, and finally publishes a TableLoadComplete event to EventBridge.
        </title>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#86d2c2" />
          </marker>
        </defs>

        {/* Edges */}
        <g stroke="#86d2c2" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)">
          {/* S3 → EB */}
          <path d="M141,165 L187,165" />
          {/* EB → SFN */}
          <path d="M337,165 L383,165" />
          {/* SFN → Lambda */}
          <path d="M492,138 C530,90 560,55 618,42" />
          {/* Lambda → SFN */}
          <path d="M622,81 C580,100 540,125 518,136" />
          {/* SFN → EMR */}
          <path d="M552,173 L616,175" />
          {/* EMR → Iceberg */}
          <path d="M785,137 C810,125 830,117 850,117" />
          {/* EMR → Stats */}
          <path d="M785,213 C810,225 830,233 849,233" />
          {/* SFN → Event */}
          <path d="M491,192 C520,240 555,285 598,303" />
        </g>

        {/* Nodes */}
        <g>
          {/* S3 (feed/) */}
          <rect x="8" y="138" width="133" height="54" rx="4" fill="#1c2531" stroke="#2c3949" strokeWidth="1" />
          <text x="74.5" y="170" textAnchor="middle" fill="#eff3f8" fontSize="14" fontFamily="Inter, system-ui, sans-serif">S3 (feed/)</text>

          {/* EventBridge */}
          <rect x="191" y="138" width="146" height="54" rx="4" fill="#1c2531" stroke="#2c3949" strokeWidth="1" />
          <text x="264" y="170" textAnchor="middle" fill="#eff3f8" fontSize="14" fontFamily="Inter, system-ui, sans-serif">EventBridge</text>

          {/* Step Functions */}
          <rect x="387" y="138" width="165" height="54" rx="4" fill="#1c2531" stroke="#86d2c2" strokeWidth="1.5" />
          <text x="469.5" y="170" textAnchor="middle" fill="#eff3f8" fontSize="14" fontFamily="Inter, system-ui, sans-serif">Step Functions</text>

          {/* Lambda */}
          <rect x="622" y="8" width="161" height="78" rx="4" fill="#1c2531" stroke="#2c3949" strokeWidth="1" />
          <text x="702.5" y="40" textAnchor="middle" fill="#eff3f8" fontSize="14" fontFamily="Inter, system-ui, sans-serif">Lambda</text>
          <text x="702.5" y="62" textAnchor="middle" fill="#aab7c7" fontSize="12" fontFamily="Inter, system-ui, sans-serif">Validate Input</text>

          {/* EMR Serverless */}
          <rect x="620" y="136" width="166" height="78" rx="4" fill="#1c2531" stroke="#2c3949" strokeWidth="1" />
          <text x="703" y="168" textAnchor="middle" fill="#eff3f8" fontSize="14" fontFamily="Inter, system-ui, sans-serif">EMR Serverless</text>
          <text x="703" y="190" textAnchor="middle" fill="#aab7c7" fontSize="12" fontFamily="Inter, system-ui, sans-serif">Spark</text>

          {/* S3 Table Bucket (Iceberg) */}
          <rect x="854" y="78" width="172" height="78" rx="4" fill="#1c2531" stroke="#86d2c2" strokeWidth="1.5" />
          <text x="940" y="110" textAnchor="middle" fill="#eff3f8" fontSize="14" fontFamily="Inter, system-ui, sans-serif">S3 Table Bucket</text>
          <text x="940" y="132" textAnchor="middle" fill="#aab7c7" fontSize="12" fontFamily="Inter, system-ui, sans-serif">(Iceberg)</text>

          {/* S3 (runs/stats/) */}
          <rect x="853" y="206" width="174" height="54" rx="4" fill="#1c2531" stroke="#2c3949" strokeWidth="1" />
          <text x="940" y="238" textAnchor="middle" fill="#eff3f8" fontSize="14" fontFamily="Inter, system-ui, sans-serif">S3 (runs/stats/)</text>

          {/* EventBridge TableLoadComplete */}
          <rect x="602" y="264" width="201" height="78" rx="4" fill="#1c2531" stroke="#2c3949" strokeWidth="1" />
          <text x="702.5" y="296" textAnchor="middle" fill="#eff3f8" fontSize="14" fontFamily="Inter, system-ui, sans-serif">EventBridge</text>
          <text x="702.5" y="318" textAnchor="middle" fill="#aab7c7" fontSize="12" fontFamily="Inter, system-ui, sans-serif">TableLoadComplete</text>
        </g>
      </svg>
    </figure>
  );
}
