'use client';

import { useState } from 'react';

export default function ContactForm({ accentColor = 'var(--color-accent)' }) {
  const [values, setValues] = useState({ name: '', email: '', phone: '', message: '', website: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, source: window.location.href })
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to send your enquiry.');
      }

      setStatus('sent');
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'form_submit',
        form_name: 'website_enquiry',
        page_path: window.location.pathname
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error.message || 'Unable to send your enquiry. Please contact us by WhatsApp or phone.'
      );
    }
  };

  const labelStyle = {
    display: 'block',
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: 'var(--color-text-faint)',
    marginBottom: 8
  };

  if (status === 'sent') {
    return (
      <div style={{ padding: '32px 0' }} role="status" aria-live="polite">
        <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Message sent.</div>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--color-text-muted)' }}>
          Thank you. The Calibro team will get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor="cf-website">Website</label>
        <input
          id="cf-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={handleChange('website')}
        />
      </div>

      <div className="contact-form-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <label style={labelStyle} htmlFor="cf-name">Name</label>
          <input
            id="cf-name"
            className="contact-input"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            value={values.name}
            onChange={handleChange('name')}
            placeholder="Your name"
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="cf-email">Email</label>
          <input
            id="cf-email"
            className="contact-input"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            value={values.email}
            onChange={handleChange('email')}
            placeholder="you@email.com"
          />
        </div>
      </div>

      <div>
        <label style={labelStyle} htmlFor="cf-phone">Phone (optional)</label>
        <input
          id="cf-phone"
          className="contact-input"
          type="tel"
          maxLength={60}
          autoComplete="tel"
          value={values.phone}
          onChange={handleChange('phone')}
          placeholder="+971 5X XXX XXXX"
        />
      </div>

      <div>
        <label style={labelStyle} htmlFor="cf-message">Project brief</label>
        <textarea
          id="cf-message"
          className="contact-input"
          required
          maxLength={5000}
          rows={5}
          value={values.message}
          onChange={handleChange('message')}
          placeholder="Tell us about the project, location, scope and target timeline…"
          style={{ resize: 'vertical', minHeight: 120 }}
        />
      </div>

      {status === 'error' && (
        <p role="alert" style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: '#a12622' }}>
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        style={{
          alignSelf: 'flex-start',
          padding: '14px 34px',
          borderRadius: 999,
          border: 'none',
          background: accentColor,
          color: 'var(--color-on-accent)',
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: '0.02em',
          cursor: status === 'sending' ? 'wait' : 'pointer',
          opacity: status === 'sending' ? 0.65 : 1,
          transition: 'background 250ms ease, opacity 250ms ease'
        }}
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
