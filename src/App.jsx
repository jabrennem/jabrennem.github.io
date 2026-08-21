import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import About from './pages/About';
// import Music from './pages/Music';
import Blog from './pages/blog/Blog';
import BlogPost from './pages/blog/BlogPost';

function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<About />} />
          {/* <Route path="music" element={<Music />} /> */}
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
        </Route>
      </Routes>
    </>
  );
}
