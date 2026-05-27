import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';
import Particles from './Particles';

const ROLES = [
  'Fullstack Developer',
  'React & Node.js Expert',
  'Full Stack Solutions',
  'UI/UX Enthusiast',
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

function OrbVisual() {
  return (
    <div className="orb-scene">
      <div className="orb-ring orb-ring--3">
        <div className="orb-dot orb-dot--cyan" />
      </div>
      <div className="orb-ring orb-ring--2">
        <div className="orb-dot orb-dot--purple" />
      </div>
      <div className="orb-ring orb-ring--1">
        <div className="orb-dot orb-dot--orange" />
      </div>
      <div className="orb-center">
        <span className="orb-letter">H</span>
      </div>
    </div>
  );
}

export default function Hero() {
  const role = useTypewriter(ROLES);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  const years    = useCounter(1,  1500, statsVisible);
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
            <span className="hero__badge-dot" />
            Open for new projects
          </div>

          <h1 className="hero__title animate-fade-right" style={{ animationDelay: '0.1s' }}>
            I am <span className="hero__brand">Husanboy</span>
          </h1>

          <p className="hero__role animate-fade-right" style={{ animationDelay: '0.2s' }}>
            <span className="hero__typewriter">{role}</span>
            <span className="hero__cursor">|</span>
          </p>

          <p className="hero__desc animate-fade-right" style={{ animationDelay: '0.3s' }}>
            I build high-performance digital products — from pixel-perfect
            interfaces to scalable backend systems. Clean code, great UX, real results.
          </p>

          <div className="hero__actions animate-fade-right" style={{ animationDelay: '0.4s' }}>
            <button className="hero__btn hero__btn--primary" onClick={() => scrollTo('projects')}>
              View My Work
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className="hero__btn hero__btn--secondary" onClick={() => scrollTo('about')}>
              About Me
            </button>
          </div>

          {/* Stats row */}
          <div className="hero__stats animate-fade-right" style={{ animationDelay: '0.5s' }} ref={statsRef}>
            <div className="hero__stat">
              <span className="hero__stat-num">{years}+</span>
              <span className="hero__stat-label">Years Exp.</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-num">{projects}+</span>
              <span className="hero__stat-label">Projects</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-num">{clients}+</span>
              <span className="hero__stat-label">Clients</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: orbital sphere ── */}
        <div className="hero__visual animate-fade-left" style={{ animationDelay: '0.3s' }}>
          <OrbVisual />
        </div>
      </div>

      <div className="hero__scroll-hint">
        <div className="hero__scroll-line" />
        <span>scroll</span>
      </div>
    </section>
  );
}
