import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import NetworkBackground from './NetworkBackground';

export default function Layout() {
  return (
    <>
      <NetworkBackground />
      <a className="skip-link" href="#content">Skip to content</a>
      <main className="site-shell" id="content">
        <Header />
        <Outlet />
        <Footer />
      </main>
    </>
  );
}
