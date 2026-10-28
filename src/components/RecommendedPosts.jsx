import PostCard from './PostCard';
import posts from '../pages/blog/posts';
import recommendPosts from '../pages/blog/recommendPosts';

export default function RecommendedPosts({ currentPost }) {
  const recommendations = recommendPosts(currentPost, posts);

  if (!recommendations.length) return null;

  return (
    <section className="recommended-posts" aria-labelledby="recommended-posts-heading">
      <h2 id="recommended-posts-heading">Recommended posts</h2>
      <div className="featured-project-grid">
        {recommendations.map((post) => (
          <PostCard post={post} compact key={post.slug} />
        ))}
      </div>
    </section>
  );
}
