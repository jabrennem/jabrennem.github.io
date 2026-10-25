import { useId } from 'react';

function Service({ x, y, title, detail, color, symbol }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="200" height="84" rx="6" fill="#192535" stroke="#45566c" />
      <rect width="5" height="84" rx="2" fill={color} />
      <rect x="15" y="19" width="38" height="44" rx="4" fill={color} />
      <text x="34" y="47" textAnchor="middle" fontSize="20" fill="#fff">{symbol}</text>
      <text x="65" y="35" fontSize="14" fontWeight="650" fill="#f5f7fa">{title}</text>
      <text x="65" y="57" fontSize="11" fill="#c1cbd7">{detail}</text>
    </g>
  );
}

export default function ReportingDiagram() {
  const id = useId();
  return (
    <figure className="aws-reporting-diagram">
      <div className="aws-reporting-diagram-scroll" tabIndex="0" role="region" aria-label="Reporting architecture diagram; scroll horizontally on small screens">
        <svg viewBox="0 0 1100 980" role="img" aria-labelledby={`${id}-title ${id}-description`}>
          <title id={`${id}-title`}>Daily reports and quarterly analytics on AWS</title>
          <desc id={`${id}-description`}>EventBridge Scheduler starts the Step Functions state machine daily. Step Functions orchestrates fetching source data through API Gateway, aggregating with Lambda, and writing reports to DynamoDB and S3 Standard-IA. The website reads current inventory stats through a reporting API Gateway backed by DynamoDB, where daily reports expire after ten days. Users query historical trends through Athena using reports in S3 and database and table metadata in the Glue Data Catalog, including for quarterly growth analysis. An S3 Lifecycle policy transitions historical reports to Glacier Deep Archive after one year; archived reports require restoration before analysis. Dashed lines show orchestration and metadata relationships.</desc>
          <defs>
            <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0 0 10 5 0 10Z" fill="#b7c6d8" />
            </marker>
          </defs>
          <rect x="1" y="1" width="1098" height="978" rx="10" fill="#111c2b" stroke="#45566c" />
          <g fontFamily="Inter, system-ui, sans-serif">
            <text x="30" y="39" fill="#ffb454" fontSize="13" fontWeight="700" letterSpacing="2">AWS · DAILY REPORTING PIPELINE</text>
            <text x="30" y="65" fill="#c1cbd7" fontSize="13">Current inventory on the website · historical trends queried through Athena.</text>
            <Service x={50} y={90} title="EventBridge" detail="Scheduler · daily" color="#b5368a" symbol="◷" />
            <path d="M150 174V203" stroke="#b7c6d8" strokeWidth="1.5" strokeDasharray="5 5" markerEnd={`url(#${id}-arrow)`} />
            <text x="168" y="193" fill="#c1cbd7" fontSize="11">Start state machine</text>
            <g transform="translate(0 110)">
            <rect x="22" y="93" width="704" height="236" rx="8" fill="#34244a" fillOpacity="0.3" stroke="#b88aef" strokeDasharray="6 5" />
            <text x="40" y="121" fill="#d4afff" fontSize="13">AWS Step Functions · orchestrate report preparation</text>
            <g stroke="#b7c6d8" strokeWidth="1.5" fill="none" markerEnd={`url(#${id}-arrow)`}>
              <path d="M250 230H280" />
              <path d="M480 230H520V172H850" />
              <path d="M520 230V410H550" />
              <path d="M950 214V268" />
              <path d="M950 352V406" />
              <path d="M650 452V526" />
              <path d="M750 410H790V722H750" />
              <path d="M550 568H340" />
              <path d="M370 410H550" strokeDasharray="5 5" markerStart={`url(#${id}-arrow)`} />
              <path d="M270 452V490H460V568H550" strokeDasharray="5 5" />
              <path d="M380 137V180" strokeDasharray="5 5" />
            </g>
            <text x="548" y="159" fill="#c1cbd7" fontSize="11">Write recent report</text>
            <text x="534" y="357" fill="#c1cbd7" fontSize="11">Store history</text>
            <text x="967" y="246" fill="#c1cbd7" fontSize="11">Read</text>
            <text x="967" y="384" fill="#c1cbd7" fontSize="11">Report response</text>
            <text x="668" y="494" fill="#c1cbd7" fontSize="11">Query data</text>
            <text x="808" y="650" fill="#c1cbd7" fontSize="11">S3 Lifecycle</text>
            <text x="808" y="668" fill="#c1cbd7" fontSize="11">After 1 year</text>
            <text x="397" y="400" fill="#c1cbd7" fontSize="11">Table metadata</text>
            <text x="320" y="482" fill="#c1cbd7" fontSize="11">Read table metadata</text>
            <Service x={50} y={188} title="API Gateway" detail="Fetch source data" color="#8c4fff" symbol="⇄" />
            <Service x={280} y={188} title="AWS Lambda" detail="Aggregate · a few seconds" color="#d97706" symbol="λ" />
            <Service x={850} y={130} title="DynamoDB" detail="10-day TTL window" color="#356bd6" symbol="▤" />
            <Service x={850} y={268} title="API Gateway" detail="Reporting API" color="#8c4fff" symbol="⇄" />
            <Service x={850} y={406} title="Website" detail="Current inventory stats" color="#526578" symbol="⌘" />
            <Service x={550} y={368} title="Amazon S3" detail="History · Standard-IA" color="#39852b" symbol="▱" />
            <Service x={170} y={368} title="AWS Glue" detail="Database + table" color="#8c4fff" symbol="▦" />
            <Service x={550} y={526} title="Amazon Athena" detail="Historical SQL queries" color="#8c4fff" symbol="⌕" />
            <Service x={140} y={526} title="Trend analysis" detail="e.g. quarterly growth" color="#526578" symbol="↗" />
            <Service x={550} y={680} title="Deep Archive" detail="Restore before analysis" color="#39852b" symbol="▱" />
            <text x="40" y="307" fill="#c1cbd7" fontSize="11">Workflow coordinates the fetch, aggregation, and both writes.</text>
            <path d="M30 824H63" stroke="#b7c6d8" strokeWidth="1.5" />
            <text x="73" y="828" fill="#c1cbd7" fontSize="11">Data flow</text>
            <path d="M200 824H233" stroke="#b7c6d8" strokeWidth="1.5" strokeDasharray="5 5" />
            <text x="243" y="828" fill="#c1cbd7" fontSize="11">Orchestration / metadata</text>
            </g>
          </g>
        </svg>
      </div>
      <figcaption>The website reads current inventory stats through the reporting API Gateway. Users query historical trends through Athena, such as for a quarterly growth report; Glue describes the data stored in S3.</figcaption>
    </figure>
  );
}
