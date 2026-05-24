import React, { useState } from 'react';
import './Projects.css';
import useScrollReveal from '../hooks/useScrollReveal';

const projects = [
  { id: 1, title: 'E-Commerce Platform', desc: 'Full-featured online store with product management, cart, and Stripe payments.', tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'], accent: '#00d4ff', emoji: '🛒', github: '#', live: '#' },
  { id: 2, title: 'Task Management App', desc: 'Real-time collaboration tool with drag-and-drop boards and team workspaces.', tags: ['React', 'Socket.io', 'MongoDB'], accent: '#ff6b35', emoji: '📋', github: '#', live: '#' },
  { id: 3, title: 'REST API Service', desc: 'Scalable API with JWT auth, role-based access control, and rate limiting.', tags: ['Node.js', 'Express', 'JWT', 'PostgreSQL'], accent: '#a855f7', emoji: '⚙️', github: '#', live: '#' },
  { id: 4, title: 'Portfolio CMS', desc: 'Headless CMS for dynamic portfolio content with rich text editor.', tags: ['React', 'TypeScript', 'REST API'], accent: '#10b981', emoji: '📁', github: '#', live: '#' },
  { id: 5, title: 'Weather Dashboard', desc: 'Real-time weather app with forecasts, maps, and historical charts.', tags: ['React', 'Chart.js', 'OpenWeather API'], accent: '#f59e0b', emoji: '🌤️', github: '#', live: '#' },
  { id: 6, title: 'Chat Application', desc: 'Real-time messaging with rooms, file sharing, and emoji reactions.', tags: ['React', 'Socket.io', 'Node.js'], accent: '#ec4899', emoji: '💬', github: '#', live: '#' },
];

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
        <div className="pcard__glow" />
      </div>

      <div className="pcard__body">
        <h3 className="pcard__title">{p.title}</h3>
        <p className="pcard__desc">{p.desc}</p>

        <div className="pcard__tags">
          {p.tags.map(t => <span key={t} className="pcard__tag">{t}</span>)}
        </div>

        <div className="pcard__links">
          <a href={p.github} className="pcard__link">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <a href={p.live} className="pcard__link pcard__link--live">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Live Demo
          </a>
        </div>
      </div>

      <div className="pcard__border" />
    </article>
  );
}

export default function Projects() {
  const [headRef, headVisible] = useScrollReveal();

  return (
    <section id="projects" className="projects">
      <div className="projects__inner">
        <div ref={headRef} className={`projects__head reveal-up${headVisible ? ' revealed' : ''}`}>
          <div className="section-label">My Work</div>
          <h2 className="section-title">Featured <span>Projects</span></h2>
          <p className="projects__sub">A selection of things I've built — from idea to deployment.</p>
        </div>

        <div className="projects__grid">
          {projects.map((p, i) => <ProjectCard key={p.id} p={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
