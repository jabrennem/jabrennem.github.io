import { useNavigate } from 'react-router-dom';
import projects from '../data/projects';

export default function SoftwareDevelopment() {
  const navigate = useNavigate();

  return (
    <section id="software-development">
      <div className="page-intro">
        <p className="eyebrow">Software Development</p>
        <h1>Systems for difficult, creative, and scientific work.</h1>
        <p>
          I work across cloud platforms, scientific workflows, developer tools, and product development. My personal
          projects explore the places where careful engineering can make a complex tool feel more useful.
        </p>
      </div>

      <section className="section" aria-labelledby="projects-heading">
        <div className="section-heading">
          <p className="eyebrow" id="projects-heading">Planned case studies</p>
          <p>Small, deployable AWS projects that you can deploy in your own environment.</p>
        </div>
        <div className="project-stack">
          {projects.map((project, i) => (
            <article className="project-card" key={i}>
              <p className="status">{project.status}</p>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <ul className="project-tags">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <p className="project-note">{project.note}</p>
              {project.blogTab && (
                <button
                  className="button secondary project-notes-link"
                  type="button"
                  onClick={() => navigate('/blog')}
                >
                  Follow the build notes
                </button>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="section callout">
        <p className="eyebrow">Open source</p>
        <h2>More work on GitHub.</h2>
        <p>
          For publicly available code and ongoing experiments, visit{' '}
          <a href="https://github.com/jabrennem" target="_blank" rel="noopener noreferrer">
            github.com/jabrennem <span aria-hidden="true">↗</span>
          </a>.
        </p>
      </section>
    </section>
  );
}
