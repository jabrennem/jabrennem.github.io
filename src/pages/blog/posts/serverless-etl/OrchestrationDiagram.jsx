export default function OrchestrationDiagram() {
  return (
    <figure className="architecture-diagram" aria-label="Scheduled drain orchestration diagram">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 960 340"
        role="img"
        aria-labelledby="orchestration-diagram-title"
        style={{ width: '100%', height: 'auto', maxWidth: '960px' }}
      >
        <title id="orchestration-diagram-title">
          A source S3 bucket sends Object Created events for the feed prefix to an EventBridge rule, which
          buffers them in an SQS queue. On a schedule, EventBridge Scheduler invokes a Message Poller Lambda
          that drains the queue and starts one Step Functions execution with the whole batch of files.
        </title>
        <defs>
          <marker id="orchestration-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#86d2c2" />
          </marker>
        </defs>

        {/* Row 1: S3 -> EventBridge rule -> SQS queue */}
        <rect x="20" y="40" width="215" height="110" rx="8" fill="#1c2531" stroke="#2c3949" strokeWidth="1.5" />
        <text x="127" y="80" textAnchor="middle" fill="#eff3f8" fontSize="18" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Source S3 Bucket</text>
        <rect x="52" y="98" width="151" height="34" rx="4" fill="#141b24" stroke="#3a4a5d" strokeWidth="1" />
        <text x="127" y="120" textAnchor="middle" fill="#aab7c7" fontSize="13" fontFamily="Inter, system-ui, sans-serif">feed/</text>

        <path d="M235,95 L300,95" stroke="#86d2c2" strokeWidth="2" fill="none" markerEnd="url(#orchestration-arrow)" />
        <text x="267" y="78" textAnchor="middle" fill="#aab7c7" fontSize="11" fontFamily="Inter, system-ui, sans-serif">Object Created</text>

        <rect x="320" y="40" width="200" height="110" rx="8" fill="#1c2531" stroke="#2c3949" strokeWidth="1.5" />
        <text x="420" y="80" textAnchor="middle" fill="#eff3f8" fontSize="17" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">EventBridge Rule</text>
        <rect x="352" y="98" width="136" height="34" rx="4" fill="#141b24" stroke="#3a4a5d" strokeWidth="1" />
        <text x="420" y="120" textAnchor="middle" fill="#aab7c7" fontSize="13" fontFamily="Inter, system-ui, sans-serif">prefix: feed/</text>

        <path d="M520,95 L585,95" stroke="#86d2c2" strokeWidth="2" fill="none" markerEnd="url(#orchestration-arrow)" />
        <text x="552" y="78" textAnchor="middle" fill="#aab7c7" fontSize="11" fontFamily="Inter, system-ui, sans-serif">enqueue</text>

        <rect x="605" y="40" width="200" height="110" rx="8" fill="#1c2531" stroke="#86d2c2" strokeWidth="1.5" />
        <text x="705" y="80" textAnchor="middle" fill="#eff3f8" fontSize="18" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">SQS Queue</text>
        <text x="705" y="112" textAnchor="middle" fill="#aab7c7" fontSize="12" fontFamily="Inter, system-ui, sans-serif">buffers events</text>
        <text x="705" y="130" textAnchor="middle" fill="#aab7c7" fontSize="12" fontFamily="Inter, system-ui, sans-serif">until polled</text>

        {/* SQS -> Poller (down + drain) */}
        <path d="M705,150 L705,205 L520,205" stroke="#86d2c2" strokeWidth="2" fill="none" markerEnd="url(#orchestration-arrow)" strokeDasharray="5 4" />
        <text x="640" y="197" textAnchor="middle" fill="#aab7c7" fontSize="11" fontFamily="Inter, system-ui, sans-serif">drains</text>

        {/* Row 2: Scheduler -> Poller -> Step Functions */}
        <rect x="20" y="215" width="215" height="105" rx="8" fill="#1c2531" stroke="#2c3949" strokeWidth="1.5" />
        <text x="127" y="255" textAnchor="middle" fill="#eff3f8" fontSize="16" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">EventBridge</text>
        <text x="127" y="276" textAnchor="middle" fill="#eff3f8" fontSize="16" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Scheduler</text>
        <text x="127" y="300" textAnchor="middle" fill="#aab7c7" fontSize="12" fontFamily="Inter, system-ui, sans-serif">every 2 min</text>

        <path d="M235,267 L300,267" stroke="#86d2c2" strokeWidth="2" fill="none" markerEnd="url(#orchestration-arrow)" />
        <text x="267" y="250" textAnchor="middle" fill="#aab7c7" fontSize="11" fontFamily="Inter, system-ui, sans-serif">invoke</text>

        <rect x="320" y="215" width="200" height="105" rx="8" fill="#1c2531" stroke="#86d2c2" strokeWidth="1.5" />
        <text x="420" y="255" textAnchor="middle" fill="#eff3f8" fontSize="16" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Message Poller</text>
        <text x="420" y="274" textAnchor="middle" fill="#aab7c7" fontSize="12" fontFamily="Inter, system-ui, sans-serif">Lambda</text>
        <text x="420" y="300" textAnchor="middle" fill="#aab7c7" fontSize="12" fontFamily="Inter, system-ui, sans-serif">drain + resolve tables</text>

        <path d="M520,267 L585,267" stroke="#86d2c2" strokeWidth="2" fill="none" markerEnd="url(#orchestration-arrow)" />
        <text x="552" y="250" textAnchor="middle" fill="#aab7c7" fontSize="10" fontFamily="Inter, system-ui, sans-serif">Start execution</text>

        <rect x="605" y="215" width="200" height="105" rx="8" fill="#1c2531" stroke="#86d2c2" strokeWidth="1.5" />
        <text x="705" y="255" textAnchor="middle" fill="#eff3f8" fontSize="17" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Step Functions</text>
        <text x="705" y="285" textAnchor="middle" fill="#aab7c7" fontSize="12" fontFamily="Inter, system-ui, sans-serif">one execution</text>
        <text x="705" y="303" textAnchor="middle" fill="#aab7c7" fontSize="12" fontFamily="Inter, system-ui, sans-serif">per batch</text>
      </svg>
    </figure>
  );
}
