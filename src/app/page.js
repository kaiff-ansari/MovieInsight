'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import MovieCard from '@/components/MovieCard';
import LoadingState from '@/components/LoadingState';
import ErrorMessage from '@/components/ErrorMessage';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);
  const [result, setResult] = useState(null);

  async function handleSearch(imdbId) {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res  = await fetch(`/api/movie?id=${encodeURIComponent(imdbId)}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to fetch movie');

      setResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>

      {/* Background glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.13) 0%, transparent 70%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Hero Header ── */}
        <header style={{ textAlign: 'center', padding: '72px 24px 48px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(232,184,75,0.1)', border: '1px solid rgba(232,184,75,0.25)',
            borderRadius: '100px', padding: '5px 16px', marginBottom: '28px',
            fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.12em',
            textTransform: 'uppercase', fontWeight: 600,
          }}>
            ✦ Powered by Gemini AI
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.6rem, 7vw, 4.8rem)',
            fontWeight: 700, lineHeight: 1.1,
            letterSpacing: '-0.02em', marginBottom: '20px',
            background: 'linear-gradient(135deg, #e8eaf0 0%, #8892a4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            CineInsight
          </h1>

          <p style={{
            color: 'var(--text-muted)',
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            maxWidth: '460px', margin: '0 auto',
            lineHeight: 1.7, fontWeight: 300,
          }}>
            Enter an IMDb movie ID to unlock AI-powered audience sentiment,
            cast details, and deep movie insights.
          </p>
        </header>

        {/* ── Search ── */}
        <div style={{ padding: '0 24px', maxWidth: '660px', margin: '0 auto 56px' }}>
          <SearchBar onSearch={handleSearch} loading={loading} />
          <p style={{ textAlign: 'center', marginTop: '14px', color: 'var(--text-muted)', fontSize: '13px' }}>
            Try:{' '}
            <button onClick={() => handleSearch('tt0133093')} style={linkBtn}>
              tt0133093
            </button>{' '}
            (The Matrix) or{' '}
            <button onClick={() => handleSearch('tt0068646')} style={linkBtn}>
              tt0068646
            </button>{' '}
            (The Godfather)
          </p>
        </div>

        {/* ── Results ── */}
        <div style={{ padding: '0 24px', maxWidth: '980px', margin: '0 auto', paddingBottom: '80px' }}>
          {loading          && <LoadingState />}
          {error && !loading && <ErrorMessage message={error} />}
          {result && !loading && <MovieCard data={result} />}
        </div>

        {/* Footer */}
        {!result && !loading && (
          <footer style={{
            textAlign: 'center', padding: '36px 24px',
            color: 'var(--text-muted)', fontSize: '13px',
            borderTop: '1px solid var(--border)',
          }}>
            Built with Next.js · OMDB API · Gemini AI
          </footer>
        )}
      </div>
    </main>
  );
}

const linkBtn = {
  background: 'none', border: 'none',
  color: 'var(--accent)', cursor: 'pointer',
  fontSize: '13px', textDecoration: 'underline dotted',
  fontFamily: 'var(--font-body)',
};
