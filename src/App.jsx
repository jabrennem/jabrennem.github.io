import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import About from './pages/About';
import SoftwareDevelopment from './pages/SoftwareDevelopment';
import AudioProduction from './pages/AudioProduction';
import Blog from './pages/Blog';
import BlogPost from './pages/blog/BlogPost';

function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = decodeURIComponent(hash.slice(1));
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }));
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
          <Route path="software-development" element={<SoftwareDevelopment />} />
          <Route path="audio-production" element={<AudioProduction />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
        </Route>
      </Routes>
    </>
  );
}
