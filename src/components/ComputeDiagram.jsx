export default function ComputeDiagram() {
  return (
    <figure className="architecture-diagram" aria-label="Compute workflow diagram">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1020 370"
        role="img"
        aria-labelledby="compute-diagram-title"
        style={{ width: '100%', height: 'auto', maxWidth: '1020px' }}
      >
        <title id="compute-diagram-title">
          Step Functions invokes a Lambda to validate input, then starts EMR Serverless. EMR loads data into an
          Iceberg table, writes a stats object to the source S3 bucket, and sends a TableLoadComplete event.
        </title>
        <defs>
          <marker id="compute-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#86d2c2" />
          </marker>
        </defs>

        <rect x="20" y="20" width="690" height="310" rx="10" fill="#141b24" stroke="#86d2c2" strokeWidth="1.5" />
        <text x="52" y="55" fill="#86d2c2" fontSize="14" fontWeight="700" letterSpacing="1.4" fontFamily="Inter, system-ui, sans-serif">STEP FUNCTIONS WORKFLOW</text>

        <rect x="55" y="125" width="245" height="82" rx="8" fill="#1c2531" stroke="#2c3949" strokeWidth="1.5" />
        <text x="177.5" y="158" textAnchor="middle" fill="#eff3f8" fontSize="19" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Lambda</text>
        <text x="177.5" y="181" textAnchor="middle" fill="#aab7c7" fontSize="13" fontFamily="Inter, system-ui, sans-serif">Validate input</text>

        <path d="M300,166 L380,166" stroke="#86d2c2" strokeWidth="2" fill="none" markerEnd="url(#compute-arrow)" />
        <text x="340" y="146" textAnchor="middle" fill="#aab7c7" fontSize="12" fontFamily="Inter, system-ui, sans-serif">Valid input</text>

        <rect x="400" y="125" width="265" height="82" rx="8" fill="#1c2531" stroke="#86d2c2" strokeWidth="1.5" />
        <text x="532.5" y="158" textAnchor="middle" fill="#eff3f8" fontSize="19" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">EMR Serverless</text>
        <text x="532.5" y="181" textAnchor="middle" fill="#aab7c7" fontSize="13" fontFamily="Inter, system-ui, sans-serif">Load data</text>

        <path d="M665,145 C700,120 715,92 750,78" stroke="#86d2c2" strokeWidth="2" fill="none" markerEnd="url(#compute-arrow)" />
        <text x="708" y="109" textAnchor="middle" fill="#aab7c7" fontSize="12" fontFamily="Inter, system-ui, sans-serif">Write data</text>

        <rect x="775" y="25" width="220" height="92" rx="8" fill="#1c2531" stroke="#86d2c2" strokeWidth="1.5" />
        <text x="885" y="60" textAnchor="middle" fill="#eff3f8" fontSize="17" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">S3 Table Bucket</text>
        <text x="885" y="83" textAnchor="middle" fill="#aab7c7" fontSize="12" fontFamily="Inter, system-ui, sans-serif">Iceberg table</text>

        <path d="M665,187 L750,202" stroke="#86d2c2" strokeWidth="2" fill="none" markerEnd="url(#compute-arrow)" />
        <text x="708" y="183" textAnchor="middle" fill="#aab7c7" fontSize="12" fontFamily="Inter, system-ui, sans-serif">Write stats</text>

        <rect x="775" y="160" width="220" height="92" rx="8" fill="#1c2531" stroke="#2c3949" strokeWidth="1.5" />
        <text x="885" y="195" textAnchor="middle" fill="#eff3f8" fontSize="17" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Source S3 Bucket</text>
        <text x="885" y="218" textAnchor="middle" fill="#aab7c7" fontSize="12" fontFamily="Inter, system-ui, sans-serif">runs/.../stats.json</text>

        <path d="M532,207 C545,250 620,285 750,305" stroke="#86d2c2" strokeWidth="2" fill="none" markerEnd="url(#compute-arrow)" />
        <text x="656" y="273" textAnchor="middle" fill="#aab7c7" fontSize="12" fontFamily="Inter, system-ui, sans-serif">Emit stats event</text>

        <rect x="775" y="280" width="220" height="62" rx="8" fill="#1c2531" stroke="#2c3949" strokeWidth="1.5" />
        <text x="885" y="307" textAnchor="middle" fill="#eff3f8" fontSize="16" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">EventBridge</text>
        <text x="885" y="327" textAnchor="middle" fill="#aab7c7" fontSize="11" fontFamily="Inter, system-ui, sans-serif">TableLoadComplete</text>
      </svg>
      <figcaption>EMR Serverless loads the Iceberg table, records job statistics, and emits a completion event.</figcaption>
    </figure>
  );
}
