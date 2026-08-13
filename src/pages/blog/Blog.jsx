import { useState, useMemo } from 'react';
import posts from './posts';
import PostCard from '../../components/PostCard';

const POSTS_PER_PAGE = 10;

export default function Blog() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) => p.search.includes(q));
  }, [query]);

  const pageCount = Math.max(1, Math.ceil(matches.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, pageCount);
  const first = (currentPage - 1) * POSTS_PER_PAGE;
  const visible = matches.slice(first, first + POSTS_PER_PAGE);

  return (
    <section id="blog">
      <div className="page-intro">
        <p className="eyebrow">Writing</p>
        <h1>Personal projects and thoughts</h1>
        <p>
          Fullstack cloud systems in AWS, proof of concepts, music technology, etc. Pick a post below to dive in.
        </p>
      </div>

      <section className="section" aria-labelledby="writing-series-heading">
        <div className="section-heading">
          <p className="eyebrow" id="writing-series-heading">Upcoming series</p>
        </div>

        <div className="article-tools">
          <label className="search-label" htmlFor="article-search">Search build notes</label>
          <input
            id="article-search"
            className="article-search"
            type="search"
            placeholder='Try "Iceberg", "mixing", or "AWS Batch"'
            autoComplete="off"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          />
          <p className="article-count" role="status" aria-live="polite">
            {matches.length
              ? `Showing ${first + 1}–${Math.min(first + POSTS_PER_PAGE, matches.length)} of ${matches.length} entries`
              : 'No entries match that search.'}
          </p>
        </div>

        <div className="writing-series">
          {visible.map((post) => (
            <PostCard post={post} key={post.slug} />
          ))}
        </div>

        {pageCount > 1 && (
          <nav className="article-pagination" aria-label="Article pages">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className="button secondary"
                type="button"
                aria-label={`Page ${p}`}
                aria-current={p === currentPage ? 'true' : undefined}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
          </nav>
        )}
      </section>
    </section>
  );
}
