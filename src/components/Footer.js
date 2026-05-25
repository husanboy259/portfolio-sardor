import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <img src="/logo.png" alt="Wentric" className="footer__logo-img" />
        </div>
        <p className="footer__copy">
          &copy; {new Date().getFullYear()} Wentric — Digital Product Studio
        </p>
        <div className="footer__top">
          <a href="#hero" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            ↑ back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
