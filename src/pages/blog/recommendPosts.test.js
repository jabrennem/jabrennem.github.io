import assert from 'node:assert/strict';
import test from 'node:test';
import recommendPosts from './recommendPosts.js';

const current = { slug: 'current', keywords: 'S3 · Step Functions · Lambda' };
const slugs = (posts) => posts.map((post) => post.slug);

test('ranks by distinct keyword overlap, excludes the current slug, and limits to three', () => {
  const posts = [
    { ...current },
    { slug: 'unrelated', keywords: 'Music', date: '2026-10-28' },
    { slug: 'one', keywords: 'S3', date: '2026-10-27' },
    { slug: 'two', keywords: 'Lambda · Step Functions', date: '2026-01-01' },
    { slug: 'three', keywords: 'Lambda · S3 · Step Functions', date: '2025-01-01' },
  ];
  const originalOrder = [...posts];
  assert.deepEqual(slugs(recommendPosts(current, posts)), ['three', 'two', 'one']);
  assert.deepEqual(posts, originalOrder);
});

test('matches complete keyword phrases without case or whitespace sensitivity, counting duplicates once', () => {
  const posts = [
    { slug: 'duplicate', keywords: 'S3 · s3 · S3', date: '2026-10-28' },
    { slug: 'partial', keywords: 'Functions · AWS S3', date: '2026-10-28' },
    { slug: 'phrases', keywords: '  step FUNCTIONS · lambda · ', date: '2025-01-01' },
  ];
  assert.deepEqual(slugs(recommendPosts(current, posts)), ['phrases', 'duplicate', 'partial']);
});

test('breaks overlap ties by publication date, putting missing and invalid dates last', () => {
  const posts = [
    { slug: 'undated', keywords: 'S3' },
    { slug: 'invalid', keywords: 'S3', date: 'invalid' },
    { slug: 'older', keywords: 'S3', date: '2026-08-07' },
    { slug: 'newer', keywords: 'S3', date: '2026-10-25' },
  ];
  assert.deepEqual(slugs(recommendPosts(current, posts)), ['newer', 'older', 'undated']);
});

test('fills remaining slots with recent posts even with missing or non-overlapping keywords', () => {
  const posts = [
    { slug: 'older', keywords: 'Music', date: '2026-01-01' },
    { slug: 'newer', date: '2026-10-25' },
  ];
  assert.deepEqual(slugs(recommendPosts(current, posts)), ['newer', 'older']);
  assert.deepEqual(slugs(recommendPosts({ slug: 'empty' }, posts)), ['newer', 'older']);
});

test('returns only available alternatives, including none for a single-post blog', () => {
  assert.deepEqual(recommendPosts(current, [current]), []);
  assert.deepEqual(recommendPosts(current, []), []);
  const other = { slug: 'other', keywords: 'S3' };
  assert.deepEqual(recommendPosts(current, [current, other]), [other]);
});
