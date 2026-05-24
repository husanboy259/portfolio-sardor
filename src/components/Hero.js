import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';
import Particles from './Particles';

const ROLES = [
  'Full Stack Developer',
  'React Specialist',
  'Node.js Engineer',
  'UI/UX Enthusiast',
];

function useTypewriter(words, speed = 80, pause = 1800) {
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
    } else if (deleting && charIdx === 0) {
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
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
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

  const years = useCounter(2, 1500, statsVisible);
  const projects = useCounter(20, 1800, statsVisible);
  const clients = useCounter(10, 1600, statsVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="hero">
      <Particles />

      <div className="hero__inner">
        <div className="hero__content">
          <div className="hero__eyebrow animate-fade-down">
            <span className="hero__eyebrow-dot" />
            Available for freelance work
          </div>

          <h1 className="hero__title animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Hi, I'm
            <span className="hero__title-accent"> Sardor</span>
          </h1>

          <p className="hero__role animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <span className="hero__typewriter">
              {role}
              <span className="hero__cursor">|</span>
            </span>
          </p>

          <p className="hero__desc animate-fade-up" style={{ animationDelay: '0.3s' }}>
            I craft high-performance web applications — from pixel-perfect interfaces
            to scalable backend systems. Clean code, great UX, real results.
          </p>

          <div className="hero__actions animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <button className="hero__btn hero__btn--primary" onClick={() => scrollTo('projects')}>
              View Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className="hero__btn hero__btn--secondary" onClick={() => scrollTo('contact')}>
              Contact Me
            </button>
          </div>

          <div className="hero__stats animate-fade-up" ref={statsRef} style={{ animationDelay: '0.5s' }}>
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

        <div className="hero__visual animate-fade-left" style={{ animationDelay: '0.3s' }}>
          <div className="hero__ring hero__ring--1" />
          <div className="hero__ring hero__ring--2" />
          <div className="hero__ring hero__ring--3" />
          <div className="hero__avatar">
            <span>S</span>
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
