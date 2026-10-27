import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import experience from '../data/experience';
import posts from './blog/posts';
import PostCard from '../components/PostCard';
import RoleTools from '../components/RoleTools';

const heroSlides = [
  {
    src: '/assets/media/josh-live-blue.jpg',
    alt: 'Joshua playing guitar onstage under blue stage light',
    caption: 'On stage promo with my Strandberg Boden',
  },
  {
    src: '/assets/media/tensor-crowd-shot.jpg',
    alt: 'A crowd watching Tensor perform live',
    caption: 'My project "Tensor"',
  },
  {
    src: '/assets/media/tensor-bts-guitar.jpg',
    alt: 'Behind-the-scenes photo from a Tensor music video shoot',
    caption: 'Music video still shot from the Tensor song "Mathador"',
  },
  {
    src: '/assets/media/josh_nick_soundboard.jpg',
    alt: 'Joshua Brenneman and Nick laughing at a studio console',
    caption: 'Making records in the studio with friends',
  },
];

export default function About() {
  const featuredPosts = posts.filter((post) => post.featured);
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef(null);

  function showPreviousSlide() {
    setActiveSlide((currentSlide) => (currentSlide - 1 + heroSlides.length) % heroSlides.length);
  }

  function showNextSlide() {
    setActiveSlide((currentSlide) => (currentSlide + 1) % heroSlides.length);
  }

  function handleTouchStart(event) {
    touchStartX.current = event.changedTouches[0].clientX;
  }

  function handleTouchEnd(event) {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < 40) return;
    if (distance < 0) showNextSlide();
    else showPreviousSlide();
  }
  const employerGroups = Array.from(
    experience.reduce((groups, role) => {
      const employer = role.company.split(' · ')[0];
      const roles = groups.get(employer) || [];
      roles.push(role);
      groups.set(employer, roles);
      return groups;
    }, new Map()),
    ([employer, roles]) => ({ employer, roles }),
  );

  return (
    <section id="about">
      <div className="hero">
        <img className="headshot" src="/assets/media/josh-headshot-new-square.jpg" alt="Joshua Brenneman" />
        <div className="hero-content">
          <p className="eyebrow">Data Architect · AWS Cloud &amp; Data Platforms</p>
          <h1>Joshua Brenneman</h1>
          <p className="hero-copy">A decade of building and pushing myself creatively.</p>
          <p className="supporting-copy">
            I've spent most of my career helping researchers solve complex problems in genomics, scientific computing,
            and machine learning. I would like to bring that same rigor and curiosity to AI and creative technologies too. Outside
            of work, I produce music because it gives me another way to express myself and create something from scratch.
          </p>
          <div className="actions">
            <div className="action-buttons">
              <Link className="button primary" to="/blog">
                Read my blog <span aria-hidden="true">→</span>
              </Link>
              <a className="button secondary resume-download" href="/assets/Joshua-Brenneman-Resume.pdf" download>
                Download résumé <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="social-links" aria-label="Social and contact links">
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
      </div>

      <section className="section featured-projects-section" id="projects" aria-labelledby="projects-heading">
        <div className="section-heading">
          <p className="eyebrow" id="projects-heading">Featured personal projects</p>
          <p>Small, open-source projects showcasing work I'm interested in.</p>
        </div>
        <div className="featured-project-grid">
          {featuredPosts.map((post) => (
            <PostCard post={post} compact key={post.slug} />
          ))}
        </div>
      </section>

      <section className="section callout">
        <p className="eyebrow">Open source</p>
        <h2>More experiments on GitHub.</h2>
        <p>
          I keep public repositories, infrastructure patterns, and smaller experiments there as I build and learn.{' '}
          <a className="callout-link" href="https://github.com/jabrennem" target="_blank" rel="noopener noreferrer">
            Browse GitHub <span aria-hidden="true">↗</span>
          </a>.
        </p>
      </section>

      <section className="section narrative" aria-labelledby="about-heading">
        <p className="eyebrow" id="about-heading">About</p>
        <p>
          I came to software through linguistics. Studying the analytical side of language led me to computational
          linguistics, natural language processing, and eventually into computer science. That path gave me a foundation I still
          draw on. I learned to break complex systems into tangible pieces, look for patterns, and derive meaning from what I find.
        </p>
        <p>
          Today I design AWS-native platforms for bioinformatics research, data lake house architecture, and agentic software. I 
          enjoy working with people to make good architectural decisions and improve the systems they use in production. I really 
          enjoy the interdisciplinary work and collaborating with people from different backgrounds and cultures. Working across 
          a lot of different areas has also made me good at breaking down complex ideas for others.
        </p>
        <p>
          Music is another way I get to make things. I write, produce, mix, and master records, and I'm getting into
          building audio tools and exploring other creative technologies. In the <Link to="/blog">blog</Link> tab, I plan
          on sharing small AI Agent, Digital Signal Processing, NLP, and AWS Cloud projects I'm learning along the way.
        </p>
      </section>

      <section className="section" id="experience" aria-labelledby="experience-heading">
        <div className="section-heading">
          <p className="eyebrow" id="experience-heading">Experience</p>
        </div>
        <div className="timeline">
          {employerGroups.map((group, groupIndex) => (
            <details className="employer-group" key={group.employer} open>
              <summary className="employer-summary">
                <span>{group.employer}</span>
              </summary>
              <div className="employer-roles">
                {group.roles.map((role, roleIndex) => (
                  <div className="role-entry" key={`${group.employer}-${role.title}`}>
                    <details className="role" name="experience-jobs" open={groupIndex === 0 && roleIndex === 0}>
                      <summary className="role-summary">
                        <span className="role-title">{role.title}</span>
                        <span className="role-meta">
                          <time dateTime={role.dateTime}>{role.date}</time>
                          {role.location && <span className="role-location">{role.location}</span>}
                          {role.workArrangement && <span className="role-arrangement">{role.workArrangement}</span>}
                        </span>
                      </summary>
                      <div className="role-content">
                        <p className="role-company">{role.company.split(' · ').slice(1).join(' · ') || role.company}</p>
                        <RoleTools tools={role.tools} />
                        <ul>
                          {role.bullets.map((bullet, j) => (
                            <li key={j}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="section credentials" aria-label="Education, certification, and languages">
        <div>
          <p className="eyebrow">Certification</p>
          <div className="certification-grid">
            <a
              className="certification-badge"
              href="https://www.credly.com/badges/648407ba-27fe-440f-af8d-04987c020fd5/public_url"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AWS Certified Data Engineer - Associate on Credly"
            >
              <span className="certification-badge-mark" aria-hidden="true">AWS</span>
              <span className="certification-badge-copy">
                <span className="certification-badge-type">Certified</span>
                <span className="certification-badge-name">Data Engineer – Associate (DEA-C01)</span>
              </span>
              <span className="certification-badge-link">Issued 2026<br />Verify on Credly ↗</span>
            </a>
            <div className="certification-badge certification-badge--expired">
              <span className="certification-badge-mark" aria-hidden="true">AWS</span>
              <span className="certification-badge-copy">
                <span className="certification-badge-type">Previously certified</span>
                <span className="certification-badge-name">Developer – Associate (DVA-C01)</span>
              </span>
              <span className="certification-badge-link">Issued Nov 2019<br />Expired Nov 2022</span>
            </div>
          </div>
        </div>
        <div>
          <p className="eyebrow">Education</p>
          <h2>B.A. Linguistics</h2>
          <p>Minor in Computer Science</p>
        </div>
        <div>
          <p className="eyebrow">Languages</p>
          <h2>English <span className="language-level">· Native</span></h2>
          <h2>German <span className="language-level">· Conversational</span></h2>
          <h2>Italian <span className="language-level">· Conversational</span></h2>
        </div>
      </section>

      <section className="section" id="music" aria-labelledby="about-music-heading">
        <div className="section-heading">
          <p className="eyebrow" id="about-music-heading">Creative work</p>
          <p>And finally, I mentioned that I like writing music. Here's a playlist of personal music and songs I've mixed or mastered for others.&nbsp;🙂</p>
        </div>
        <div className="spotify-embed">
          <iframe
            title="Joshua Brenneman audio production playlist on Spotify"
            src="https://open.spotify.com/embed/playlist/2ZA5D6NJ5HQanMRfAfX8zQ?utm_source=generator&amp;si=1472ec09bbaf4aad"
            width="100%"
            height="460"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
        <a
          className="spotify-link"
          href="https://open.spotify.com/playlist/2ZA5D6NJ5HQanMRfAfX8zQ"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Spotify <span aria-hidden="true">↗</span>
        </a>
        <figure className="creative-gallery">
          <div className="creative-gallery-frame" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <img src={heroSlides[activeSlide].src} alt={heroSlides[activeSlide].alt} loading="lazy" />
            <button
              className="hero-gallery-control hero-gallery-control--previous"
              type="button"
              aria-label="Previous creative work photo"
              onClick={showPreviousSlide}
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              className="hero-gallery-control hero-gallery-control--next"
              type="button"
              aria-label="Next creative work photo"
              onClick={showNextSlide}
            >
              <span aria-hidden="true">→</span>
            </button>
            <figcaption>{heroSlides[activeSlide].caption}</figcaption>
          </div>
          <div className="hero-gallery-dots" aria-label="Choose creative work photo">
            {heroSlides.map((slide, index) => (
              <button
                className={`hero-gallery-dot${index === activeSlide ? ' hero-gallery-dot--active' : ''}`}
                type="button"
                key={slide.src}
                aria-label={`Show photo ${index + 1}: ${slide.caption}`}
                aria-pressed={index === activeSlide}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
        </figure>
      </section>

      <section className="section contact-section" id="contact" aria-labelledby="contact-heading">
        <p className="eyebrow" id="contact-heading">Contact</p>
        <h2>Interested in building something together?</h2>
        <div className="contact-actions">
          <a className="button primary" href="mailto:jbrenn.dev@gmail.com">Email me <span aria-hidden="true">↗</span></a>
          <a className="button secondary" href="https://www.linkedin.com/in/joshuabrennemana" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </section>
  );
}
