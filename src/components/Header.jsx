import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const tabs = [
  { to: '/', label: 'About' },
  // { to: '/music', label: 'Music' },
  { to: '/blog', label: 'Blog' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="site-header">
      <div className="header-row">
        <NavLink className="brand" to="/" aria-label="Joshua Brenneman, home">
          JB<span aria-hidden="true">.</span>
        </NavLink>
        <button
          className="menu-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`hamburger${menuOpen ? ' hamburger--open' : ''}`} />
        </button>
      </div>
      <nav className={`tabs${menuOpen ? ' tabs--open' : ''}`} aria-label="Main sections">
        {tabs.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `tab${isActive ? ' tab--active' : ''}`}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
