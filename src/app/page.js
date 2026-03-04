'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import MovieCard from '@/components/MovieCard';
import LoadingState from '@/components/LoadingState';
import ErrorMessage from '@/components/ErrorMessage';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  async function handleSearch(imdbId) {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/movie?id=${encodeURIComponent(imdbId)}`);
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
    <main className="min-h-screen relative overflow-x-hidden">

      
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.13) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10">

     
        <header className="text-center pt-[72px] px-6 pb-[48px]">

          <div className="inline-flex items-center gap-2 bg-[rgba(232,184,75,0.1)] border border-[rgba(232,184,75,0.25)] rounded-full py-[5px] px-4 mb-7 text-[11px] text-[var(--accent)] tracking-[0.12em] uppercase font-semibold">
            ✦ AI-Driven Movie Intelligence
          </div>

          <h1
            className="font-display font-bold leading-[1.1] tracking-[-0.02em] mb-5 bg-gradient-to-br from-[#e8eaf0] to-[#8892a4] bg-clip-text text-transparent"
            style={{ fontSize: 'clamp(2.6rem, 7vw, 4.8rem)' }}
          >
            CineInsight
          </h1>

          <p
            className="text-[var(--text-muted)] max-w-[460px] mx-auto leading-[1.7] font-light"
            style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)' }}
          >
            Enter an IMDb ID to instantly unlock real-time movie data, AI-powered insights, and detailed cast analysis.
          </p>
        </header>

        <div className="px-6 max-w-[660px] mx-auto mb-14">
          <SearchBar onSearch={handleSearch} loading={loading} />

          <p className="text-center mt-3.5 text-[var(--text-muted)] text-[13px]">
            Try:{' '}
            <button
              onClick={() => handleSearch('tt0133093')}
              className="text-[var(--accent)] underline decoration-dotted bg-none border-none cursor-pointer text-[13px] font-body"
            >
              tt0133093
            </button>{' '}
            (The Matrix) or{' '}
            <button
              onClick={() => handleSearch('tt0068646')}
              className="text-[var(--accent)] underline decoration-dotted bg-none border-none cursor-pointer text-[13px] font-body"
            >
              tt0068646
            </button>{' '}
            (The Godfather)
          </p>
        </div>

        <div className="px-6 max-w-[980px] mx-auto pb-20">
          {loading && <LoadingState />}
          {error && !loading && <ErrorMessage message={error} />}
          {result && !loading && <MovieCard data={result} />}
        </div>

        {!result && !loading && (
          <footer className="text-center py-9 px-6 text-[var(--text-muted)] text-[13px] border-t border-[var(--border)]">
            AI Movie Insight Builder
          </footer>
        )}
      </div>
    </main>
  );
}