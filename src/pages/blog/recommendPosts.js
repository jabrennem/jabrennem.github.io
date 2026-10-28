function keywordSet(keywords = '') {
  return new Set(keywords.split('·').map((keyword) => keyword.trim().toLowerCase()).filter(Boolean));
}

export default function recommendPosts(currentPost, posts) {
  const currentKeywords = keywordSet(currentPost.keywords);

  return posts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => ({
      post,
      overlap: [...keywordSet(post.keywords)].filter((keyword) => currentKeywords.has(keyword)).length,
      date: Date.parse(post.date) || 0,
    }))
    .sort((a, b) => b.overlap - a.overlap || b.date - a.date)
    .slice(0, 3)
    .map(({ post }) => post);
}
