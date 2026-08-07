import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import About from './pages/About';
import SoftwareDevelopment from './pages/SoftwareDevelopment';
import AudioProduction from './pages/AudioProduction';
import Blog from './pages/Blog';
import BlogPost from './pages/blog/BlogPost';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<About />} />
        <Route path="software-development" element={<SoftwareDevelopment />} />
        <Route path="audio-production" element={<AudioProduction />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
      </Route>
    </Routes>
  );
}
