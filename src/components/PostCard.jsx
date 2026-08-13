import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <Link className="post-card" to={`/blog/${post.slug}`}>
      <p className="status">{post.status}</p>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      {post.Thumbnail && (
        <div className="post-card-thumbnail">
          <post.Thumbnail />
        </div>
      )}
      <p className="post-keywords">
        <span>Keywords</span> {post.keywords}
      </p>
    </Link>
  );
}
