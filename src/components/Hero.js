import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';
import Particles from './Particles';

const ROLES = [
  'Web Development Agency',
  'UI/UX Design Studio',
  'Full Stack Solutions',
  'Digital Product Studio',
];

const CHIPS = [
  { label: 'Web Development', color: 'blue'   },
  { label: 'UI/UX Design',    color: 'red'    },
  { label: 'Cloud & APIs',    color: 'yellow' },
  { label: 'Mobile Apps',     color: 'green'  },
];

function useTypewriter(words, speed = 75, pause = 2000) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let t;
    if (!deleting && charIdx < current.length)
      t = setTimeout(() => setCharIdx(i => i + 1), speed);
    else if (!deleting && charIdx === current.length)
      t = setTimeout(() => setDeleting(true), pause);
    else if (deleting && charIdx > 0)
      t = setTimeout(() => setCharIdx(i => i - 1), speed / 2);
    else { setDeleting(false); setWordIdx(i => (i + 1) % words.length); }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0 = null;
    const step = ts => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

export default function Hero() {
  const role = useTypewriter(ROLES);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  const years    = useCounter(3,  1500, statsVisible);
  const projects = useCounter(50, 1800, statsVisible);
  const clients  = useCounter(30, 1600, statsVisible);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="hero">
      <div className="hero__topbar" />
      <div className="hero__grid-bg" />
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <Particles />

      <div className="hero__inner">

        {/* ── LEFT: text ── */}
        <div className="hero__content">
          <div className="hero__badge animate-fade-down">
            <img src="/logo.png" alt="Wentric" className="hero__badge-logo" />
            Open for new projects
          </div>

          <h1 className="hero__title animate-fade-right" style={{ animationDelay: '0.1s' }}>
            Build the future<br />
            with <span className="hero__brand">Wentric</span>
          </h1>

          <p className="hero__role animate-fade-right" style={{ animationDelay: '0.2s' }}>
            <span className="hero__typewriter">{role}</span>
            <span className="hero__cursor">|</span>
          </p>

          <p className="hero__desc animate-fade-right" style={{ animationDelay: '0.3s' }}>
            We design and build high-performance digital products — from beautiful
            interfaces to powerful backends. Trusted by startups and businesses worldwide.
          </p>

          <div className="hero__actions animate-fade-right" style={{ animationDelay: '0.4s' }}>
            <button className="hero__btn hero__btn--primary" onClick={() => scrollTo('projects')}>
              View Our Work
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className="hero__btn hero__btn--secondary" onClick={() => scrollTo('contact')}>
              Get in Touch
            </button>
          </div>

          <div className="hero__chips animate-fade-right" style={{ animationDelay: '0.5s' }}>
            {CHIPS.map(c => (
              <span key={c.label} className={`hero__chip hero__chip--${c.color}`}>
                <span className="hero__chip-dot" />{c.label}
              </span>
            ))}
          </div>
        </div>

        {/* ── RIGHT: floating cards ── */}
        <div className="hero__visual animate-fade-left" style={{ animationDelay: '0.3s' }}>

          {/* Main card — projects overview */}
          <div className="hero__card hero__card--main">
            <img src="/logo.png" alt="Wentric" className="hero__card-logo" />
            <div className="hero__card-title">Wentric Studio</div>
            <div className="hero__card-sub">Project performance</div>
            <div className="hero__card-bar-wrap">
              {[
                { label: 'Design',   pct: '88%',  cls: 'blue'   },
                { label: 'Backend',  pct: '92%',  cls: 'green'  },
                { label: 'Delivery', pct: '95%',  cls: 'yellow' },
              ].map(b => (
                <div key={b.label} className="hero__card-bar-row">
                  <span className="hero__card-bar-label">{b.label}</span>
                  <div className="hero__card-bar-track">
                    <div
                      className={`hero__card-bar-fill hero__card-bar-fill--${b.cls}`}
                      style={{ width: b.pct }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top-right mini stats card */}
          <div className="hero__card hero__card--stats" ref={statsRef}>
            <div className="hero__mini-stat">
              <div>
                <div className="hero__mini-num" style={{ color: '#4285f4' }}>{projects}+</div>
                <div className="hero__mini-label">
                  <span className="hero__mini-dot" style={{ background: '#4285f4' }} />
                  Projects
                </div>
              </div>
              <div>
                <div className="hero__mini-num" style={{ color: '#34a853' }}>{clients}+</div>
                <div className="hero__mini-label">
                  <span className="hero__mini-dot" style={{ background: '#34a853' }} />
                  Clients
                </div>
              </div>
              <div>
                <div className="hero__mini-num" style={{ color: '#fbbc04' }}>{years}+</div>
                <div className="hero__mini-label">
                  <span className="hero__mini-dot" style={{ background: '#fbbc04' }} />
                  Years
                </div>
              </div>
            </div>
          </div>

          {/* Bottom-left tech stack card */}
          <div className="hero__card hero__card--tech">
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Tech Stack
            </div>
            <div className="hero__tech-list">
              {[
                { icon: '⚛️', label: 'React',      bg: 'rgba(66,133,244,0.12)'  },
                { icon: '🟢', label: 'Node.js',    bg: 'rgba(52,168,83,0.12)'   },
                { icon: '🐘', label: 'PostgreSQL', bg: 'rgba(251,188,4,0.12)'   },
                { icon: '🐳', label: 'Docker',     bg: 'rgba(234,67,53,0.12)'   },
              ].map(t => (
                <div key={t.label} className="hero__tech-item">
                  <div className="hero__tech-icon" style={{ background: t.bg }}>{t.icon}</div>
                  {t.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll-hint">
        <div className="hero__scroll-line" />
        <span>scroll</span>
      </div>
    </section>
  );
}
