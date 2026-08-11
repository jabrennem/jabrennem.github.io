const experience = [
  {
    title: 'Senior Software Engineer',
    date: 'Apr 2023 - Present',
    dateTime: '2023-04',
    company: 'Nationwide Children\'s Hospital · Office of Data Sciences, Cloud Solutions Team',
    bullets: [
      'Lead architect and developer of a multi-account, research data lake house application in AWS that manages data catalog resources using Glue, storage in S3, ETL using Step Functions and EMR Serverless, governance and access control using Lake Formation and IAM, and lineage with Eventbridge.',
      'Build APIs via API Gateway, Eventbridge, and MCPs for data producers and consumers to integrate with the lake house',
      'Partner with data scientists to build large scale natural language processing applications using Iceberg and in-house data lake application.',
      'Integrate generative AI into in-house software using AWS Bedrock and MCPs',
      'Help lead organization of team steering documents, skills, and best practices for development with AI coding agents such as Claude and Kiro',
      'Migrate Data Lake House to a NIST compliant environment',
      'Worked with solutions architect to build a multi-account ecosystem using AWS Organizations with 10+ accounts encompassing 10+ petabytes',
      'Migrated and architected deployment of existing production microservices to new multi-account system.',
      'Worked with scientists in IGM genomics teams to use AWS SAM and other AWS architecture fundamentals',
      'Helped migrate production code repositories to GitHub',
      'Transition to Office of Data Sciences - Production support for genomics teams in Institute of Genomic Medicine',
    ],
  },
  {
    title: 'Bioinformatics Software Developer - Research',
    date: 'Oct 2019 - Apr 2023',
    dateTime: '2019-10',
    company: 'Nationwide Children\'s Hospital · Institute for Genomic Medicine, Cloud Solutions Team',
    bullets: [
      'Designed event-driven genomics workflows using Step Functions, Lambda, AWS Batch to process laboratory next generation sequencing pipelines.',
      'Contributed to the infrastructure of an in-house protocol Rapid Genome Sequencing for NICU patients.',
      'Worked on an in-house genomic variant data lake using S3 for storage, Glue for data catalog, Athena for analysis, and EMR Serverless for compute.',
      'Collaborated with bioinformatics scientists and academic researchers to translate research workflows into reliable, cost-effective production systems.',
      'Developed a service to synchronize genomics variants, genes, and transcripts with the latest annotations.',
      'Built serverless websites used by directors and scientists using React, S3/CloudFront with API Gateway, Lambda, and DynamoDB to analyze genomic data and execute workflows.',
      'Used AWS SAM and CDK to deploy all applications',
    ],
  },
  {
    title: 'Bioinformatics Software Developer - Clinical',
    date: 'Oct 2017 - Oct 2019',
    dateTime: '2017-10',
    company: 'Nationwide Children\'s Hospital · Institute for Genomic Medicine, Clinical Informatics Team',
    bullets: [
      'Collaborated with clinical directors to write software for production clinical genomics operations and Next Generation Sequencing pipelines.',
    ],
  },
  {
    title: 'Big Data Application Developer',
    date: 'Jun 2016 - Oct 2017',
    dateTime: '2016-06',
    company: 'CGI · Consulting engagement with PNC Bank',
    bullets: [
      'A Data Engineering role maintaining ETL pipelines in an on-premise Hadoop and Apache Spark ecosystem.',
    ],
  },
];

export default experience;
