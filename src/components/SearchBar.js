'use client';

import { useState } from 'react';

/**
 * SearchBar component
 * Validates IMDb ID format before submitting
 */
export default function SearchBar({ onSearch, loading }) {
  const [value,   setValue]   = useState('');
  const [touched, setTouched] = useState(false);

  // Must match tt + 7 or 8 digits
  const isValid    = /^tt\d{7,8}$/.test(value.trim());
  const showError  = touched && value.trim() !== '' && !isValid;

  function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!value.trim() || !isValid) return;
    onSearch(value.trim());
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{
        display: 'flex', gap: '10px',
        background: 'var(--bg2)',
        border: `1px solid ${showError ? 'var(--negative)' : 'var(--border)'}`,
        borderRadius: '16px',
        padding: '8px 8px 8px 20px',
        alignItems: 'center',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: showError ? '0 0 0 3px rgba(239,68,68,0.12)' : 'none',
      }}>

        {/* Search icon */}
        <svg width="17" height="17" fill="none" viewBox="0 0 24 24"
          stroke="var(--text-muted)" strokeWidth="2" style={{ flexShrink: 0 }}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
        </svg>

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="Enter IMDb ID  (e.g. tt0133093)"
          disabled={loading}
          autoComplete="off"
          spellCheck={false}
          aria-label="IMDb Movie ID"
          style={{
            flex: 1, background: 'none', border: 'none', outline: 'none',
            color: 'var(--text)', fontSize: '15px',
            fontFamily: 'var(--font-body)', letterSpacing: '0.02em',
          }}
        />

        {/* Clear button */}
        {value && (
          <button type="button"
            onClick={() => { setValue(''); setTouched(false); }}
            aria-label="Clear"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-muted)', padding: '4px',
              display: 'flex', alignItems: 'center', flexShrink: 0,
            }}>
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Submit button */}
        <button type="submit"
          disabled={loading || !value.trim()}
          style={{
            background: loading ? 'var(--surface)' : 'var(--accent)',
            color: loading ? 'var(--text-muted)' : '#0a0a0a',
            border: 'none', borderRadius: '10px',
            padding: '10px 24px',
            fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '14px',
            cursor: loading || !value.trim() ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s', flexShrink: 0,
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
          {loading ? (
            <>
              <span style={{
                width: '13px', height: '13px',
                border: '2px solid var(--text-muted)',
                borderTopColor: 'transparent',
                borderRadius: '50%', display: 'inline-block',
                animation: 'spin 0.7s linear infinite',
              }} />
              Analyzing
            </>
          ) : 'Analyze'}
        </button>
      </div>

      {/* Validation error */}
      {showError && (
        <p style={{ color: 'var(--negative)', fontSize: '12px', marginTop: '8px', paddingLeft: '20px' }}>
          Invalid format. Should be: <strong>tt</strong> + 7 or 8 digits — e.g. tt0133093
        </p>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </form>
  );
}