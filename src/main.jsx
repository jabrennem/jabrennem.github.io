import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './style.css';

// Existing shares used hash routes, sometimes with a second hash for a section.
const legacyRoute = window.location.pathname === '/'
  && window.location.hash.match(/^#(\/(?:blog(?:\/[^/?#]+)?\/?)?)(\?[^#]*)?(#.*)?$/);

if (legacyRoute) {
  const [, pathname, search, hash] = legacyRoute;
  window.history.replaceState(window.history.state, '', pathname + (search || window.location.search) + (hash || ''));
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
