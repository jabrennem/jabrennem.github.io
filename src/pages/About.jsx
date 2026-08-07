import experience from '../data/experience';
import capabilities from '../data/capabilities';

export default function About() {
  return (
    <section id="about">
      <div className="hero">
        <img className="headshot" src="/assets/media/josh-headshot-new-square.jpg" alt="Joshua Brenneman" />
        <div className="hero-content">
          <p className="eyebrow">Senior Software Engineer · AWS Cloud &amp; Platform Engineering</p>
          <h1>Joshua Brenneman</h1>
          <p className="hero-copy">Builder at the intersection of cloud, AI, and audio.</p>
          <p className="supporting-copy">
            I've spent a decade building data platforms for genomics, scientific computing, and machine learning. Now I'm bringing that depth to AI and creative technology.
            Outside of work, I write, produce, mix, and master music. It's another way I get to create something from scratch.
          </p>
          <div className="actions">
            <a className="button primary resume-download" href="/assets/Joshua-Brenneman-Resume.pdf" target="_blank" rel="noopener noreferrer">
              Resume <span aria-hidden="true">↗</span>
            </a>
            <a className="icon-link" href="https://github.com/jabrennem" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.338c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/></svg>
            </a>
            <a className="icon-link" href="https://www.linkedin.com/in/joshuabrennemana" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065ZM6.868 20.452H3.804V9h3.064v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z"/></svg>
            </a>
            <a className="icon-link" href="mailto:jbrenn.dev@gmail.com" aria-label="Email">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
          </div>
        </div>
      </div>

      <section className="section narrative" aria-labelledby="about-heading">
        <p className="eyebrow" id="about-heading">About</p>
        <p>
          I came to software through linguistics. Studying the formal, analytical side of language led me to computational
          linguistics and natural language processing—and from there into programming. That path gave me a foundation I still
          draw on: breaking complex systems into structured parts, finding patterns, and making the implicit explicit.
        </p>
        <p>
          Today I design AWS-native platforms that make difficult work easier for biomedical research, clinical genomics, data
          processing, and machine learning. That means reusable infrastructure, distributed workflows, developer enablement,
          and reliable cloud operations. My teaching background also shaped how I work—I like taking complex problems and
          translating them into clear concepts that others can build on.
        </p>
        <p>
          Music is another form of building for me. I write, produce, mix, and master records, then carry the perspective I
          gain in the studio back into software—especially music technology and creative tools. Whether I'm shaping a song, a
          workflow, or a product, I like understanding the problem deeply, making deliberate choices, and refining the result
          until it earns its place in someone's hands.
        </p>
      </section>

      <section className="section" id="experience" aria-labelledby="experience-heading">
        <div className="section-heading">
          <p className="eyebrow" id="experience-heading">Experience</p>
          <p>Building reliable systems for scientific and clinical work.</p>
        </div>
        <div className="timeline">
          {experience.map((role, i) => (
            <article className="role" key={i}>
              <div className="role-topline">
                <h2>{role.title}</h2>
                <time dateTime={role.dateTime}>{role.date}</time>
              </div>
              <p className="role-company">{role.company}</p>
              <ul>
                {role.bullets.map((bullet, j) => (
                  <li key={j}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="capabilities-heading">
        <div className="section-heading">
          <p className="eyebrow" id="capabilities-heading">Capabilities</p>
        </div>
        <div className="capability-grid">
          {capabilities.map((cap, i) => (
            <article key={i}>
              <h2>{cap.title}</h2>
              <p>{cap.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section credentials" aria-label="Education, certification, and languages">
        <div>
          <p className="eyebrow">Education</p>
          <h2>B.A. Linguistics</h2>
          <p>Minor in Computer Science</p>
          <p className="eyebrow" style={{marginTop: '1.5rem'}}>Languages</p>
          <h2>German</h2>
          <h2>Italian</h2>
        </div>
        <div>
          <p className="eyebrow">Certification</p>
          <h2>AWS Certified Developer - Associate</h2>
        </div>
      </section>
    </section>
  );
}
