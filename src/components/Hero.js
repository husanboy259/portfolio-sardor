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
  { label: 'Web Development', color: 'blue' },
  { label: 'UI/UX Design',    color: 'red'  },
  { label: 'Cloud & APIs',    color: 'yellow' },
  { label: 'Mobile Apps',     color: 'green' },
];

function useTypewriter(words, speed = 75, pause = 2000) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(i => i + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(i => i - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = ts => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * target));
      if (progress < 1) requestAnimationFrame(step);
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
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.4 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="hero">
      {/* Google 4-color top bar */}
      <div className="hero__topbar" />

      {/* Microsoft grid background */}
      <div className="hero__grid-bg" />

      {/* Google-style ambient orbs */}
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__orb hero__orb--3" />

      {/* Particle network */}
      <Particles />

      <div className="hero__inner">

        {/* Google-style pill badge */}
        <div className="hero__badge animate-fade-down">
          <div className="hero__badge-dot">W</div>
          Introducing Wentric — your digital partner
        </div>

        {/* Microsoft-style massive headline */}
        <h1 className="hero__title animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Build the future<br />with{' '}
          <span className="hero__brand">Wentric</span>
        </h1>

        {/* Typewriter subtitle */}
        <p className="hero__role animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <span className="hero__typewriter">{role}</span>
          <span className="hero__cursor">|</span>
        </p>

        {/* Description */}
        <p className="hero__desc animate-fade-up" style={{ animationDelay: '0.3s' }}>
          We design and build high-performance digital products — from beautiful
          interfaces to powerful backends. Trusted by startups and businesses worldwide.
        </p>

        {/* CTAs */}
        <div className="hero__actions animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <button className="hero__btn hero__btn--primary" onClick={() => scrollTo('projects')}>
            View Our Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button className="hero__btn hero__btn--secondary" onClick={() => scrollTo('contact')}>
            Get in Touch
          </button>
        </div>

        {/* Google-style service chips */}
        <div className="hero__chips animate-fade-up" style={{ animationDelay: '0.5s' }}>
          {CHIPS.map(c => (
            <span key={c.label} className={`hero__chip hero__chip--${c.color}`}>
              <span className="hero__chip-dot" />
              {c.label}
            </span>
          ))}
        </div>

        {/* Microsoft-style stats card */}
        <div
          className="hero__stats animate-scale-in"
          ref={statsRef}
          style={{ animationDelay: '0.6s' }}
        >
          <div className="hero__stat">
            <span className="hero__stat-num">{years}+</span>
            <span className="hero__stat-label">Years Active</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-num">{projects}+</span>
            <span className="hero__stat-label">Projects Done</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-num">{clients}+</span>
            <span className="hero__stat-label">Happy Clients</span>
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
