export default function OrchestrationDiagram() {
  return (
    <figure className="architecture-diagram" aria-label="S3 event orchestration diagram">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 920 250"
        role="img"
        aria-labelledby="orchestration-diagram-title"
        style={{ width: '100%', height: 'auto', maxWidth: '920px' }}
      >
        <title id="orchestration-diagram-title">
          A source S3 bucket sends Object Created events to an EventBridge rule. The rule filters for the feed prefix
          and starts a Step Functions workflow that performs transformation and load logic.
        </title>
        <defs>
          <marker id="orchestration-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#86d2c2" />
          </marker>
        </defs>

        <rect x="25" y="66" width="240" height="125" rx="8" fill="#1c2531" stroke="#2c3949" strokeWidth="1.5" />
        <text x="145" y="105" textAnchor="middle" fill="#eff3f8" fontSize="19" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Source S3 Bucket</text>
        <rect x="60" y="126" width="170" height="36" rx="4" fill="#141b24" stroke="#3a4a5d" strokeWidth="1" />
        <text x="145" y="149" textAnchor="middle" fill="#aab7c7" fontSize="13" fontFamily="Inter, system-ui, sans-serif">feed/</text>

        <path d="M285,129 L340,129" stroke="#86d2c2" strokeWidth="2" fill="none" markerEnd="url(#orchestration-arrow)" />
        <text x="313" y="105" textAnchor="middle" fill="#aab7c7" fontSize="12" fontFamily="Inter, system-ui, sans-serif">Object Created</text>

        <rect x="360" y="66" width="205" height="125" rx="8" fill="#1c2531" stroke="#86d2c2" strokeWidth="1.5" />
        <text x="462.5" y="105" textAnchor="middle" fill="#eff3f8" fontSize="18" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">EventBridge Rule</text>
        <rect x="393" y="126" width="139" height="36" rx="4" fill="#141b24" stroke="#3a4a5d" strokeWidth="1" />
        <text x="462.5" y="149" textAnchor="middle" fill="#aab7c7" fontSize="13" fontFamily="Inter, system-ui, sans-serif">prefix: feed/</text>

        <path d="M585,129 L640,129" stroke="#86d2c2" strokeWidth="2" fill="none" markerEnd="url(#orchestration-arrow)" />
        <text x="613" y="105" textAnchor="middle" fill="#aab7c7" fontSize="12" fontFamily="Inter, system-ui, sans-serif">Start execution</text>

        <rect x="660" y="66" width="235" height="125" rx="8" fill="#1c2531" stroke="#86d2c2" strokeWidth="1.5" />
        <text x="777.5" y="105" textAnchor="middle" fill="#eff3f8" fontSize="19" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Step Functions</text>
        <text x="777.5" y="139" textAnchor="middle" fill="#aab7c7" fontSize="13" fontFamily="Inter, system-ui, sans-serif">Transformation &amp; load</text>
        <text x="777.5" y="159" textAnchor="middle" fill="#aab7c7" fontSize="13" fontFamily="Inter, system-ui, sans-serif">workflow</text>
      </svg>
      <figcaption>Only new objects under <code>feed/</code> start the Step Functions ingestion workflow.</figcaption>
    </figure>
  );
}
