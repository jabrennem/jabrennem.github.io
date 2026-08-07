import experience from '../data/experience';
import capabilities from '../data/capabilities';

export default function About() {
  return (
    <section id="about">
      <div className="hero">
        <div className="hero-content">
          <p className="eyebrow">Senior Software Engineer · AWS Cloud &amp; Platform Engineering · Music Producer</p>
          <h1>Joshua Brenneman</h1>
          <p className="hero-copy">I build thoughtful software for complex work.</p>
          <p className="supporting-copy">
            I build AWS-native platforms for biomedical research, clinical genomics, scientific computing, and machine learning.
            Outside of work, I write, produce, mix, and master music—another way I get to make things from the ground up.
          </p>
          <div className="actions">
            <a className="button primary resume-download" href="/assets/Joshua-Brenneman-Resume.pdf" target="_blank" rel="noopener noreferrer">
              View résumé <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="https://github.com/jabrennem" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            <a className="text-link" href="https://www.linkedin.com/in/joshuabrennemana" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
            <a className="text-link" href="mailto:jbrenn.dev@gmail.com">Email</a>
          </div>
        </div>
        <img className="headshot" src="/assets/media/josh-headshot-new-square.jpg" alt="Joshua Brenneman" />
      </div>

      <section className="section narrative" aria-labelledby="about-heading">
        <p className="eyebrow" id="about-heading">About</p>
        <p>
          Building is the thread that runs through how I work and how I spend my time. As a software engineer, I design
          AWS-native platforms that make difficult work easier for biomedical research, clinical genomics, data processing,
          and machine learning. That means reusable infrastructure, distributed workflows, developer enablement, and reliable
          cloud operations.
        </p>
        <p>
          Music is another form of building for me. I write, produce, mix, and master records, then carry the perspective I
          gain in the studio back into software—especially music technology and creative tools. Having a creative outlet
          amplifies my technical work, and I bring that mindset to every project I take on. As AI and increasingly capable
          software automate more of the work around us, I believe creative thinking matters more than ever. Whether I'm
          shaping a song, a workflow, or a product, I like understanding the problem deeply, making deliberate choices, and
          refining the result until it earns its place in someone's hands.
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

      <section className="section credentials" aria-label="Education and certification">
        <div>
          <p className="eyebrow">Education</p>
          <h2>B.A. Linguistics</h2>
          <p>Minor in Computer Science</p>
        </div>
        <div>
          <p className="eyebrow">Certification</p>
          <h2>AWS Certified Developer - Associate</h2>
        </div>
      </section>
    </section>
  );
}
