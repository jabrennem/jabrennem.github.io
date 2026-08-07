import { NavLink } from 'react-router-dom';

const tabs = [
  { to: '/', label: 'About' },
  { to: '/software-development', label: 'Software Development' },
  { to: '/audio-production', label: 'Audio Production' },
  { to: '/blog', label: 'Blog' },
];

export default function Header() {
  return (
    <header className="site-header">
      <NavLink className="brand" to="/" aria-label="Joshua Brenneman, home">
        JB<span aria-hidden="true">.</span>
      </NavLink>
      <nav className="tabs" aria-label="Main sections">
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
