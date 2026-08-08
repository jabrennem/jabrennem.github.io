export default function StorageDiagram() {
  return (
    <figure className="architecture-diagram" aria-label="Source and target storage diagram">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 860 250"
        role="img"
        aria-labelledby="storage-diagram-title"
        style={{ width: '100%', height: 'auto', maxWidth: '860px' }}
      >
        <title id="storage-diagram-title">
          A source S3 bucket holds Parquet files under the feed prefix. The pipeline transforms the files
          into Apache Iceberg tables in a target S3 Table Bucket.
        </title>
        <defs>
          <marker id="storage-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#86d2c2" />
          </marker>
        </defs>

        <text x="180" y="35" textAnchor="middle" fill="#86d2c2" fontSize="12" fontWeight="700" letterSpacing="1.4" fontFamily="Inter, system-ui, sans-serif">
          SOURCE
        </text>
        <rect x="30" y="54" width="300" height="150" rx="8" fill="#1c2531" stroke="#2c3949" strokeWidth="1.5" />
        <text x="180" y="94" textAnchor="middle" fill="#eff3f8" fontSize="20" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">S3 Bucket</text>
        <rect x="66" y="116" width="228" height="47" rx="4" fill="#141b24" stroke="#3a4a5d" strokeWidth="1" />
        <text x="180" y="136" textAnchor="middle" fill="#aab7c7" fontSize="12" fontFamily="Inter, system-ui, sans-serif">feed/</text>
        <text x="180" y="153" textAnchor="middle" fill="#eff3f8" fontSize="13" fontFamily="Inter, system-ui, sans-serif">source-file.parquet</text>
        <text x="180" y="185" textAnchor="middle" fill="#aab7c7" fontSize="12" fontFamily="Inter, system-ui, sans-serif">Raw incoming data</text>

        <path d="M350,129 L510,129" stroke="#86d2c2" strokeWidth="2" fill="none" markerEnd="url(#storage-arrow)" />
        <text x="430" y="104" textAnchor="middle" fill="#eff3f8" fontSize="14" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Transform</text>

        <text x="680" y="35" textAnchor="middle" fill="#86d2c2" fontSize="12" fontWeight="700" letterSpacing="1.4" fontFamily="Inter, system-ui, sans-serif">
          TARGET
        </text>
        <rect x="530" y="54" width="300" height="150" rx="8" fill="#1c2531" stroke="#86d2c2" strokeWidth="1.5" />
        <text x="680" y="94" textAnchor="middle" fill="#eff3f8" fontSize="20" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">S3 Table Bucket</text>
        <rect x="566" y="116" width="228" height="47" rx="4" fill="#141b24" stroke="#3a4a5d" strokeWidth="1" />
        <text x="680" y="136" textAnchor="middle" fill="#aab7c7" fontSize="12" fontFamily="Inter, system-ui, sans-serif">default</text>
        <text x="680" y="153" textAnchor="middle" fill="#eff3f8" fontSize="13" fontFamily="Inter, system-ui, sans-serif">Iceberg table</text>
        <text x="680" y="185" textAnchor="middle" fill="#aab7c7" fontSize="12" fontFamily="Inter, system-ui, sans-serif">Managed, queryable data</text>
      </svg>
      <figcaption>Raw Parquet files move from the source bucket’s <code>feed/</code> prefix into managed Iceberg tables.</figcaption>
    </figure>
  );
}
