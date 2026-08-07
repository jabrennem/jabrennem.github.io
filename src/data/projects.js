const projects = [
  {
    status: 'In development',
    title: 'Serverless ETL',
    description: 'An event-driven data-ingestion pipeline that turns files arriving under an S3 feed/ prefix into queryable Apache Iceberg data.',
    tags: ['AWS SAM', 'Amazon S3', 'EventBridge', 'Step Functions', 'EMR Serverless', 'Apache Iceberg'],
    note: 'The case study will cover the event flow, EMR Serverless job orchestration, table layout, operational safeguards, and how to deploy or remove the stack.',
    blogTab: true,
  },
  // {
  //   status: 'Planned',
  //   title: 'Cross-account ECR repository construct',
  //   description: 'A reusable CDK construct for an Amazon ECR repository that grants approved accounts in an AWS Organization pull access through a carefully scoped repository policy.',
  //   tags: ['AWS CDK', 'Amazon ECR', 'AWS Organizations', 'IAM', 'TypeScript', 'Infrastructure as Code'],
  //   note: 'The case study will focus on a reusable interface, least-privilege access, policy validation, and tests for the synthesized CloudFormation template.',
  //   blogTab: true,
  // },
  // {
  //   status: 'Planned',
  //   title: 'Batch workflow launcher',
  //   description: 'A containerized scientific-workflow pattern in which a Step Functions state machine validates an input manifest, prepares downstream commands, and launches compute on AWS Batch.',
  //   tags: ['AWS SAM', 'Step Functions', 'AWS Batch', 'Docker', 'AWS Lambda', 'Event-driven workflows'],
  //   note: 'The case study will show input validation, command construction, job-queue configuration, retry behavior, and traceable job execution using synthetic data.',
  //   blogTab: true,
  // },
];

export default projects;
