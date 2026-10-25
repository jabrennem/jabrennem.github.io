export const badgeUrl = 'https://www.credly.com/badges/648407ba-27fe-440f-af8d-04987c020fd5/public_url';

export default function CertificationBadge({ thumbnail = false }) {
  const content = (
    <>
      <img src="/assets/media/aws-data-engineer-associate/badge.png" width="662" height="728" alt="AWS Certified Data Engineer – Associate badge" />
      <div>
        <p className="eyebrow">AWS Certification · DEA-C01</p>
        <p className="aws-credential-title">Data Engineer <span>Associate</span></p>
        <p className="aws-credential-caption">{thumbnail ? 'From exam preparation to a working reporting pipeline.' : 'A certification connected to the data architecture work I do every day.'}</p>
        {!thumbnail && <span className="aws-credential-verify">Verify my credential on Credly ↗</span>}
      </div>
    </>
  );

  return thumbnail
    ? <div className="aws-credential aws-credential--thumbnail">{content}</div>
    : <a className="aws-credential" href={badgeUrl} target="_blank" rel="noopener noreferrer">{content}</a>;
}
