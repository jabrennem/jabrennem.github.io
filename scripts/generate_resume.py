"""Generate the downloadable résumé from the site's About-page material."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    KeepTogether,
    ListFlowable,
    ListItem,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "assets" / "Joshua-Brenneman-Resume.pdf"
ACCENT = colors.HexColor("#0E6F68")
TEXT = colors.HexColor("#18212D")
MUTED = colors.HexColor("#4C5A69")
RULE = colors.HexColor("#BBC6D2")


def bullet_list(items, style):
    return ListFlowable(
        [ListItem(Paragraph(item, style), leftIndent=0) for item in items],
        bulletType="bullet",
        leftIndent=13,
        bulletFontName="Helvetica",
        bulletFontSize=6,
        bulletOffsetY=2,
        spaceBefore=3,
        spaceAfter=0,
    )


def section_title(text, styles):
    return Table(
        [[Paragraph(text.upper(), styles["section"])]],
        colWidths=[7.2 * inch],
        style=TableStyle([
            ("LINEBELOW", (0, 0), (-1, -1), 0.65, RULE),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
            ("TOPPADDING", (0, 0), (-1, -1), 0),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ]),
    )


def role(title, date, company, bullets, styles):
    heading = Table(
        [[Paragraph(title, styles["role"]), Paragraph(date, styles["date"])]],
        colWidths=[5.45 * inch, 1.75 * inch],
        style=TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("ALIGN", (1, 0), (1, 0), "RIGHT"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ("TOPPADDING", (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
        ]),
    )
    return KeepTogether([
        heading,
        Paragraph(company, styles["company"]),
        bullet_list(bullets, styles["body"]),
        Spacer(1, 8),
    ])


def build():
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name="name", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=24, leading=26, textColor=TEXT, spaceAfter=3))
    styles.add(ParagraphStyle(name="contact", parent=styles["Normal"], fontName="Helvetica", fontSize=8.5, leading=11, textColor=MUTED, spaceAfter=9))
    styles.add(ParagraphStyle(name="summary", parent=styles["Normal"], fontName="Helvetica", fontSize=9.5, leading=13, textColor=TEXT, spaceAfter=13))
    styles.add(ParagraphStyle(name="section", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=8, leading=10, textColor=ACCENT, tracking=1.1))
    styles.add(ParagraphStyle(name="role", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=10, leading=12, textColor=TEXT))
    styles.add(ParagraphStyle(name="date", parent=styles["Normal"], fontName="Helvetica", fontSize=8.5, leading=11, textColor=MUTED, alignment=TA_LEFT))
    styles.add(ParagraphStyle(name="company", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=8.5, leading=11, textColor=MUTED, spaceAfter=1))
    styles.add(ParagraphStyle(name="body", parent=styles["Normal"], fontName="Helvetica", fontSize=8.8, leading=11.6, textColor=TEXT))
    styles.add(ParagraphStyle(name="skill", parent=styles["Normal"], fontName="Helvetica", fontSize=8.5, leading=11, textColor=TEXT))
    styles.add(ParagraphStyle(name="credential", parent=styles["Normal"], fontName="Helvetica", fontSize=8.8, leading=11.5, textColor=TEXT))

    story = [
        Paragraph("Joshua Brenneman", styles["name"]),
        Paragraph("Myrtle Beach, SC  |  jbrenn.dev@gmail.com  |  github.com/jabrennem  |  linkedin.com/in/joshuabrennemana", styles["contact"]),
        Paragraph("Senior Software Engineer focused on AWS-native platforms for biomedical research, clinical genomics, scientific computing, data systems, and machine learning. Experienced in reusable infrastructure, distributed workflows, developer enablement, and reliable cloud operations.", styles["summary"]),
        section_title("Experience", styles),
        Spacer(1, 8),
        role("Senior Software Engineer", "Apr 2023 - Present", "Nationwide Children's Hospital | Office of Data Sciences, Cloud Solutions Team", [
            "Design reusable AWS platform capabilities across more than 10 AWS accounts and an engineering ecosystem of more than 600 repositories.",
            "Lead architecture and implementation of a research lakehouse spanning storage, ETL, governance, lineage, and visualization with Amazon S3, Athena, and Apache Iceberg.",
            "Support production workflows for more than five research and clinical laboratories working with petabyte-scale datasets.",
            "Build orchestration and compute patterns with Step Functions, Lambda, EMR, Glue, Batch, ECS, Docker, and ECR.",
            "Partner with data scientists on SageMaker workloads and AWS infrastructure for generative-AI applications using Amazon Bedrock.",
        ], styles),
        role("Bioinformatics Software Developer", "Oct 2019 - Apr 2023", "Nationwide Children's Hospital | Institute for Genomic Medicine, Cloud Solutions Team", [
            "Designed cloud-native genomics workflows using Step Functions, Lambda, AWS Batch, and containerized next-generation sequencing pipelines.",
            "Built cloud services for genomic variant analysis and research-data applications with Python and CloudFormation.",
            "Worked with bioinformatics scientists to translate research workflows into reliable production systems.",
        ], styles),
        role("Bioinformatics Software Developer", "Oct 2017 - Oct 2019", "Nationwide Children's Hospital | Institute for Genomic Medicine, Clinical Informatics Team", [
            "Developed applications and backend services supporting clinical-genomics operations and laboratory workflows.",
            "Translated stakeholder requirements into production software and supported applications through iterative improvement.",
        ], styles),
        role("Big Data Application Developer", "Jun 2016 - Oct 2017", "CGI | Consulting engagement with PNC Bank", [
            "Developed Hadoop and Apache Spark data-processing workflows and improved distributed batch-system performance and reliability.",
        ], styles),
        section_title("Technical capabilities", styles),
        Spacer(1, 7),
        bullet_list([
            "<b>Platform engineering:</b> AWS platform architecture, serverless systems, distributed workflows, event-driven architecture, developer enablement.",
            "<b>Cloud and data:</b> Amazon S3, Athena, Apache Iceberg, AWS Glue, EMR, ETL, lakehouse architecture.",
            "<b>Compute and containers:</b> AWS Lambda, Batch, ECS, Docker, Amazon ECR, production orchestration patterns.",
            "<b>Infrastructure and delivery:</b> AWS CDK, CloudFormation, AWS SAM, GitHub Actions, CodePipeline, CodeBuild, CI/CD.",
            "<b>Software and AI:</b> Python, TypeScript, JavaScript, modern C++, Amazon SageMaker, Amazon Bedrock, MCP.",
        ], styles["skill"]),
        Spacer(1, 9),
        section_title("Education and certification", styles),
        Spacer(1, 7),
        Table([
            [Paragraph("<b>EDUCATION</b><br/>B.A. Linguistics<br/>Minor in Computer Science", styles["credential"]), Paragraph("<b>CERTIFICATION</b><br/>AWS Certified Developer - Associate", styles["credential"])],
        ], colWidths=[3.6 * inch, 3.6 * inch], style=TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ("TOPPADDING", (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ])),
    ]
    document = SimpleDocTemplate(str(OUTPUT), pagesize=letter, rightMargin=0.65 * inch, leftMargin=0.65 * inch, topMargin=0.55 * inch, bottomMargin=0.55 * inch, title="Joshua Brenneman Resume", author="Joshua Brenneman")
    document.build(story)


if __name__ == "__main__":
    build()
