import { useParams, Link } from 'react-router-dom';
import posts from '../../data/posts';

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="page-intro">
        <h1>Post not found</h1>
        <p>
          <Link to="/blog">← Back to all build notes</Link>
        </p>
      </div>
    );
  }

  // If the post has full MDX content, render it
  if (post.Component) {
    return (
      <article className="blog-article">
        <div className="page-intro">
          <p className="eyebrow">{post.status}</p>
          <h1>{post.title}</h1>
        </div>
        <post.Component />
        <p>
          <Link className="text-link" to="/blog">← All build notes</Link>
        </p>
      </article>
    );
  }

  // Fallback: outline-only placeholder for posts without content yet
  return (
    <article>
      <div className="page-intro">
        <p className="eyebrow">Working draft · {post.status}</p>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        {post.repoUrl && (
          <p>
            <a className="text-link" href={post.repoUrl} target="_blank" rel="noopener noreferrer">
              View the repository on GitHub →
            </a>
          </p>
        )}
      </div>
      <section className="section">
        <p className="eyebrow">Planned notes</p>
        <ol className="post-outline">
          {post.outline.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      </section>
      <p>
        <Link className="text-link" to="/blog">← All build notes</Link>
      </p>
    </article>
  );
}
