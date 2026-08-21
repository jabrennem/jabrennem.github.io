import experience from '../data/experience';
import capabilities from '../data/capabilities';

export default function Resume() {
  return (
    <div className="resume-page">
      <div className="resume-actions no-print">
        <a className="button primary" href="/assets/Joshua-Brenneman-Resume.pdf" download>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{marginRight: '0.4rem', verticalAlign: '-0.15em'}}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download PDF
        </a>
      </div>
      <header className="resume-header">
        <h1>Joshua Brenneman</h1>
        <p className="resume-contact">
          <a href="mailto:jbrenn.dev@gmail.com">jbrenn.dev@gmail.com</a>
          <span className="resume-sep">|</span>
          <a href="https://github.com/jabrennem" target="_blank" rel="noopener noreferrer">github.com/jabrennem</a>
          <span className="resume-sep">|</span>
          <a href="https://www.linkedin.com/in/joshuabrennemana" target="_blank" rel="noopener noreferrer">linkedin.com/in/joshuabrennemana</a>
        </p>
        <p className="resume-headline">Senior Software Engineer · AWS Cloud &amp; Platform Engineering</p>
      </header>

      <section className="resume-section">
        <h2>Summary</h2>
        <p>
          Senior Software Engineer with a decade of experience building AWS-native platforms for biomedical research,
          clinical genomics, data transformation, and machine learning. Background in linguistics and computational
          analysis. AWS Certified Developer - Associate.
        </p>
      </section>

      <section className="resume-section">
        <h2>Experience</h2>
        {experience.map((role, i) => (
          <div className="resume-role" key={i}>
            <div className="resume-role-header">
              <h3>{role.title}</h3>
              <span className="resume-date">{role.date}</span>
            </div>
            <p className="resume-company">{role.company}</p>
            <ul>
              {role.bullets.map((bullet, j) => (
                <li key={j}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="resume-section">
        <h2>Capabilities</h2>
        <div className="resume-capabilities">
          {capabilities.map((cap, i) => (
            <div key={i} className="resume-capability">
              <strong>{cap.title}:</strong> {cap.description}
            </div>
          ))}
        </div>
      </section>

      <section className="resume-section resume-footer-section">
        <div className="resume-columns">
          <div>
            <h2>Education</h2>
            <p><strong>B.A. Linguistics</strong>, Minor in Computer Science</p>
          </div>
          <div>
            <h2>Certification</h2>
            <p><strong>AWS Certified Developer - Associate</strong></p>
          </div>
          <div>
            <h2>Languages</h2>
            <p>German, Italian</p>
          </div>
        </div>
      </section>
    </div>
  );
}
