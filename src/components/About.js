import React, { useState } from 'react';
import './About.css';
import useScrollReveal from '../hooks/useScrollReveal';

const skills = [
  { name: 'React', level: 90, icon: '⚛️' },
  { name: 'Node.js', level: 85, icon: '🟢' },
  { name: 'JavaScript', level: 92, icon: '🟡' },
  { name: 'TypeScript', level: 80, icon: '🔵' },
  { name: 'PostgreSQL', level: 78, icon: '🐘' },
  { name: 'MongoDB', level: 82, icon: '🍃' },
  { name: 'Docker', level: 70, icon: '🐳' },
  { name: 'REST API', level: 88, icon: '🔗' },
];

function SkillCard({ name, level, icon, delay }) {
  const [flipped, setFlipped] = useState(false);
  const [ref, visible] = useScrollReveal({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`skill-card${flipped ? ' skill-card--flipped' : ''}${visible ? ' skill-card--visible' : ''}`}
      style={{ transitionDelay: delay }}
      onClick={() => setFlipped(f => !f)}
    >
      <div className="skill-card__inner">
        <div className="skill-card__front">
          <span className="skill-card__icon">{icon}</span>
          <span className="skill-card__name">{name}</span>
          <span className="skill-card__hint">click</span>
        </div>
        <div className="skill-card__back">
          <span className="skill-card__name">{name}</span>
          <div className="skill-card__bar-wrap">
            <div
              className={`skill-card__bar${flipped ? ' skill-card__bar--animate' : ''}`}
              style={{ '--level': `${level}%` }}
            />
          </div>
          <span className="skill-card__level">{level}%</span>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const [headRef, headVisible] = useScrollReveal();
  const [textRef, textVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="about" className="about">
      <div className="about__inner">
        <div ref={headRef} className={`about__head reveal-up${headVisible ? ' revealed' : ''}`}>
          <div className="section-label">About Me</div>
          <h2 className="section-title">Who I <span>Am</span></h2>
        </div>

        <div className="about__grid">
          <div ref={textRef} className={`about__text reveal-left${textVisible ? ' revealed' : ''}`}>
            <p>
              Hi, I'm <strong>Husanboy</strong> — a Fullstack Developer based in Uzbekistan,
              building fast, reliable, and beautifully crafted web applications for
              businesses and startups worldwide.
            </p>
            <p>
              I work across the full stack — from pixel-perfect React interfaces to
              robust Node.js backends and scalable cloud infrastructure. I care deeply
              about code quality, performance, and real business impact.
            </p>
            <p>
              Whether you need an MVP, a redesign, or a long-term tech partner —
              I've got you covered.
            </p>

            <div className="about__tags">
              {['🎯 Result-Driven', '⚡ Fast Delivery', '🤝 Collaborative', '🌍 Remote-first'].map((t, i) => (
                <span key={t} style={{ animationDelay: `${0.1 + i * 0.08}s` }}>{t}</span>
              ))}
            </div>
          </div>

          <div className="about__skills">
            <p className="about__skills-hint">{'// click a card to see proficiency'}</p>
            <div className="about__skills-grid">
              {skills.map((s, i) => (
                <SkillCard key={s.name} {...s} delay={`${i * 0.07}s`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
