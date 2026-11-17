import { Link } from 'react-router-dom';

export default function PostCard({ post, compact = false }) {
  return (
    <Link className={`post-card${compact ? ' post-card--compact' : ''}`} to={`/blog/${post.slug}`}>
      {post.status && <p className="status">{post.status}</p>}
      <h2>{post.title}</h2>
      {post.date && <p className="post-published">Published <time dateTime={post.date}>{new Date(`${post.date}T00:00:00`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time></p>}
      {post.Thumbnail && (
        <div className="post-card-thumbnail">
          <post.Thumbnail />
        </div>
      )}
    </Link>
  );
}
