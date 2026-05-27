import React, { useState } from 'react';
import './Contact.css';
import useScrollReveal from '../hooks/useScrollReveal';

async function sendToTelegram({ name, email, message }) {
  const BOT_URL = process.env.REACT_APP_BOT_URL || 'http://localhost:3001';
  const res = await fetch(`${BOT_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message }),
  });
  if (!res.ok) throw new Error('Server error');
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [headRef, headVisible] = useScrollReveal();
  const [formRef, formVisible] = useScrollReveal({ threshold: 0.1 });
  const [infoRef, infoVisible] = useScrollReveal({ threshold: 0.1 });

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      await sendToTelegram(form);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    } catch {
      setError('Failed to send. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__inner">
        <div ref={headRef} className={`contact__head reveal-up${headVisible ? ' revealed' : ''}`}>
          <div className="section-label">Contact</div>
          <h2 className="section-title">Let's <span>Work Together</span></h2>
          <p className="contact__subtitle">
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
        </div>

        <div className="contact__grid">
          <div ref={infoRef} className={`contact__info reveal-left${infoVisible ? ' revealed' : ''}`}>
            {[
              { icon: '📧', label: 'Email', val: 'abdulazizov2013hh@gmail.com' },
              { icon: '📍', label: 'Location', val: 'Uzbekistan — remote worldwide' },
              { icon: '⏰', label: 'Response Time', val: 'Within 24 hours' },
            ].map((c, i) => (
              <div
                key={c.label}
                className="contact__card"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="contact__card-icon">{c.icon}</div>
                <div>
                  <strong>{c.label}</strong>
                  <p>{c.val}</p>
                </div>
              </div>
            ))}

            <div className="contact__socials">
              {[
                { href: 'https://github.com', label: 'GitHub', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg> },
                { href: 'https://linkedin.com', label: 'LinkedIn', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                { href: 'https://t.me', label: 'Telegram', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="contact__social">
                  {s.icon}{s.label}
                </a>
              ))}
            </div>
          </div>

          <form
            ref={formRef}
            className={`contact__form reveal-right${formVisible ? ' revealed' : ''}`}
            onSubmit={handleSubmit}
          >
            {sent ? (
              <div className="contact__success">
                <span>✅</span>
                <strong>Message sent!</strong>
                <p>Thanks for reaching out — I'll reply within 24 hours.</p>
                <button type="button" onClick={() => setSent(false)}>Send another</button>
              </div>
            ) : (
              <>
                {[
                  { id: 'name', label: '// name', type: 'text', placeholder: 'Your name' },
                  { id: 'email', label: '// email', type: 'email', placeholder: 'your@email.com' },
                ].map(f => (
                  <div key={f.id} className="contact__field">
                    <label htmlFor={f.id}>{f.label}</label>
                    <input id={f.id} name={f.id} type={f.type} placeholder={f.placeholder} value={form[f.id]} onChange={handleChange} required />
                  </div>
                ))}
                <div className="contact__field">
                  <label htmlFor="message">{'// message'}</label>
                  <textarea id="message" name="message" rows={5} placeholder="Tell me about your project..." value={form.message} onChange={handleChange} required />
                </div>
                {error && <p className="contact__error">{error}</p>}
                <button type="submit" className="contact__submit" disabled={sending}>
                  {sending ? (
                    <>
                      <span className="contact__spinner" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22,2 15,22 11,13 2,9"/>
                      </svg>
                    </>
                  )}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
