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
          Step Functions invokes a Lambda that validates input and bin-packs files by size into groups, then a
          Map state runs one EMR Serverless Spark job per group. Each job loads data into the test_data and
          customers Iceberg tables, writes a per-group stats object to the source S3 bucket, and sends a
          GroupLoadComplete event.
        </title>
        <defs>
          <marker id="compute-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#86d2c2" />
          </marker>
        </defs>

        <rect x="20" y="20" width="690" height="310" rx="10" fill="#141b24" stroke="#86d2c2" strokeWidth="1.5" />
        <text x="52" y="55" fill="#86d2c2" fontSize="14" fontWeight="700" letterSpacing="1.4" fontFamily="Inter, system-ui, sans-serif">STEP FUNCTIONS WORKFLOW</text>

        <rect x="55" y="125" width="245" height="82" rx="8" fill="#1c2531" stroke="#2c3949" strokeWidth="1.5" />
        <text x="177.5" y="152" textAnchor="middle" fill="#eff3f8" fontSize="18" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Lambda</text>
        <text x="177.5" y="174" textAnchor="middle" fill="#aab7c7" fontSize="13" fontFamily="Inter, system-ui, sans-serif">Validate input</text>
        <text x="177.5" y="192" textAnchor="middle" fill="#aab7c7" fontSize="13" fontFamily="Inter, system-ui, sans-serif">bin-pack by size</text>

        <path d="M300,166 L380,166" stroke="#86d2c2" strokeWidth="2" fill="none" markerEnd="url(#compute-arrow)" />
        <text x="340" y="146" textAnchor="middle" fill="#aab7c7" fontSize="11" fontFamily="Inter, system-ui, sans-serif">Map: 1 per group</text>

        {/* stacked EMR to convey per-group fan-out */}
        <rect x="412" y="112" width="265" height="82" rx="8" fill="#1c2531" stroke="#2c3949" strokeWidth="1.5" />
        <rect x="406" y="119" width="265" height="82" rx="8" fill="#1c2531" stroke="#2c3949" strokeWidth="1.5" />
        <rect x="400" y="126" width="265" height="82" rx="8" fill="#1c2531" stroke="#86d2c2" strokeWidth="1.5" />
        <text x="532.5" y="159" textAnchor="middle" fill="#eff3f8" fontSize="18" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">EMR Serverless</text>
        <text x="532.5" y="181" textAnchor="middle" fill="#aab7c7" fontSize="13" fontFamily="Inter, system-ui, sans-serif">one Spark job per group</text>

        <path d="M665,150 C700,122 715,92 750,78" stroke="#86d2c2" strokeWidth="2" fill="none" markerEnd="url(#compute-arrow)" />
        <text x="712" y="106" textAnchor="middle" fill="#aab7c7" fontSize="11" fontFamily="Inter, system-ui, sans-serif">Write data</text>

        <rect x="775" y="20" width="220" height="102" rx="8" fill="#1c2531" stroke="#86d2c2" strokeWidth="1.5" />
        <text x="885" y="48" textAnchor="middle" fill="#eff3f8" fontSize="16" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">S3 Table Bucket</text>
        <rect x="792" y="62" width="88" height="44" rx="4" fill="#141b24" stroke="#3a4a5d" strokeWidth="1" />
        <text x="836" y="88" textAnchor="middle" fill="#eff3f8" fontSize="12" fontFamily="Inter, system-ui, sans-serif">test_data</text>
        <rect x="890" y="62" width="88" height="44" rx="4" fill="#141b24" stroke="#3a4a5d" strokeWidth="1" />
        <text x="934" y="88" textAnchor="middle" fill="#eff3f8" fontSize="12" fontFamily="Inter, system-ui, sans-serif">customers</text>

        <path d="M665,190 L750,204" stroke="#86d2c2" strokeWidth="2" fill="none" markerEnd="url(#compute-arrow)" />
        <text x="712" y="186" textAnchor="middle" fill="#aab7c7" fontSize="11" fontFamily="Inter, system-ui, sans-serif">Write stats</text>

        <rect x="775" y="160" width="220" height="92" rx="8" fill="#1c2531" stroke="#2c3949" strokeWidth="1.5" />
        <text x="885" y="195" textAnchor="middle" fill="#eff3f8" fontSize="17" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Source S3 Bucket</text>
        <text x="885" y="218" textAnchor="middle" fill="#aab7c7" fontSize="12" fontFamily="Inter, system-ui, sans-serif">runs/.../grpN.json</text>

        <path d="M532,208 C545,250 620,285 750,305" stroke="#86d2c2" strokeWidth="2" fill="none" markerEnd="url(#compute-arrow)" />
        <text x="656" y="273" textAnchor="middle" fill="#aab7c7" fontSize="11" fontFamily="Inter, system-ui, sans-serif">Emit group event</text>

        <rect x="775" y="280" width="220" height="62" rx="8" fill="#1c2531" stroke="#2c3949" strokeWidth="1.5" />
        <text x="885" y="307" textAnchor="middle" fill="#eff3f8" fontSize="16" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">EventBridge</text>
        <text x="885" y="327" textAnchor="middle" fill="#aab7c7" fontSize="11" fontFamily="Inter, system-ui, sans-serif">GroupLoadComplete</text>
      </svg>
    </figure>
  );
}
