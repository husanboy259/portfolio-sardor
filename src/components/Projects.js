import React, { useState } from 'react';
import './Projects.css';
import useScrollReveal from '../hooks/useScrollReveal';

const projects = [
  {
    id: 1,
    title: 'Weather App',
    desc: 'Real-time weather application with forecasts, location search, and clean modern UI.',
    tags: ['React', 'Weather API', 'Vercel'],
    accent: '#00d4ff',
    emoji: '🌤️',
    live: 'https://wheather-app-three-theta.vercel.app/',
    github: null,
    type: 'web',
  },
  {
    id: 2,
    title: 'MakerPay',
    desc: 'Payment platform for Uzbekistan — fast, secure, and easy-to-use fintech solution.',
    tags: ['Fintech', 'Payments', 'Web App'],
    accent: '#10b981',
    emoji: '💳',
    live: 'https://makerpay.uz',
    github: null,
    type: 'web',
  },
  {
    id: 3,
    title: 'Aviago',
    desc: 'Modern web application built and deployed on Vercel with a smooth user experience.',
    tags: ['React', 'Node.js', 'Vercel'],
    accent: '#a855f7',
    emoji: '✈️',
    live: 'https://aviago-web-wctj.vercel.app/',
    github: null,
    type: 'web',
  },
  {
    id: 4,
    title: 'MakerPay Bot',
    desc: 'Telegram bot for MakerPay — manage payments, check balance, and transactions directly in Telegram.',
    tags: ['Telegram Bot', 'Node.js', 'Payments'],
    accent: '#00d4ff',
    emoji: '🤖',
    live: 'https://t.me/maketrpaybot',
    github: null,
    type: 'bot',
  },
  {
    id: 5,
    title: 'Yashil Uyim Bot',
    desc: 'Telegram bot for Yashil Uyim — eco-friendly home solutions and green living assistant.',
    tags: ['Telegram Bot', 'Python', 'Eco'],
    accent: '#10b981',
    emoji: '🌿',
    live: 'https://t.me/yashiluyim1bot',
    github: null,
    type: 'bot',
  },
  {
    id: 6,
    title: 'Spiko Bot',
    desc: 'Feature-rich Telegram bot with interactive commands, automation, and user management.',
    tags: ['Telegram Bot', 'Node.js', 'Automation'],
    accent: '#ff6b35',
    emoji: '⚡',
    live: 'https://t.me/spikobot1bot',
    github: null,
    type: 'bot',
  },
  {
    id: 7,
    title: 'Mini App Bot',
    desc: 'Telegram Mini App bot — a full web app running inside Telegram with native UX.',
    tags: ['Telegram', 'Mini App', 'React'],
    accent: '#f59e0b',
    emoji: '📱',
    live: 'https://t.me/miniappbot1bot',
    github: null,
    type: 'bot',
  },
];

const TelegramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const ExternalIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

function ProjectCard({ p, index }) {
  const [ref, visible] = useScrollReveal({ threshold: 0.1 });
  const [hovered, setHovered] = useState(false);

  return (
    <article
      ref={ref}
      className={`pcard${hovered ? ' pcard--active' : ''}${visible ? ' pcard--visible' : ''}`}
      style={{ '--accent-local': p.accent, transitionDelay: `${(index % 3) * 0.1}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="pcard__top">
        <span className="pcard__emoji">{p.emoji}</span>
        {p.type === 'bot' && (
          <span className="pcard__badge">Telegram Bot</span>
        )}
        <div className="pcard__glow" />
      </div>

      <div className="pcard__body">
        <h3 className="pcard__title">{p.title}</h3>
        <p className="pcard__desc">{p.desc}</p>

        <div className="pcard__tags">
          {p.tags.map(t => <span key={t} className="pcard__tag">{t}</span>)}
        </div>

        <div className="pcard__links">
          {p.type === 'bot' ? (
            <a href={p.live} target="_blank" rel="noopener noreferrer" className="pcard__link pcard__link--live">
              <TelegramIcon />
              Open Bot
            </a>
          ) : (
            <a href={p.live} target="_blank" rel="noopener noreferrer" className="pcard__link pcard__link--live">
              <ExternalIcon />
              Live Demo
            </a>
          )}
        </div>
      </div>

      <div className="pcard__border" />
    </article>
  );
}

export default function Projects() {
  const [headRef, headVisible] = useScrollReveal();
  const webProjects = projects.filter(p => p.type === 'web');
  const botProjects = projects.filter(p => p.type === 'bot');

  return (
    <section id="projects" className="projects">
      <div className="projects__inner">
        <div ref={headRef} className={`projects__head reveal-up${headVisible ? ' revealed' : ''}`}>
          <div className="section-label">My Work</div>
          <h2 className="section-title">Featured <span>Projects</span></h2>
          <p className="projects__sub">Real projects I've built — from web apps to Telegram bots.</p>
        </div>

        <div className="projects__category-label">🌐 Web Apps</div>
        <div className="projects__grid">
          {webProjects.map((p, i) => <ProjectCard key={p.id} p={p} index={i} />)}
        </div>

        <div className="projects__category-label" style={{ marginTop: '48px' }}>🤖 Telegram Bots</div>
        <div className="projects__grid">
          {botProjects.map((p, i) => <ProjectCard key={p.id} p={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
