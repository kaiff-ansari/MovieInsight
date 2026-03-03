'use client';

import Image from 'next/image';

// Sentiment display config
const SENTIMENT = {
  positive: { color: '#22c55e', bg: 'rgba(34,197,94,0.1)',  icon: '😊', label: 'Positive' },
  mixed:    { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', icon: '😐', label: 'Mixed'    },
  negative: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',  icon: '😞', label: 'Negative' },
};

export default function MovieCard({ data }) {
  const { movie, sentiment } = data;
  const sc = SENTIMENT[sentiment.sentiment] || SENTIMENT.mixed;

  const cast    = movie.Actors?.split(',').map(a => a.trim()).filter(Boolean) ?? [];
  const genres  = movie.Genre?.split(',').map(g => g.trim()).filter(Boolean)  ?? [];
  const hasPoster = movie.Poster && movie.Poster !== 'N/A';

  return (
    <div style={{ animation: 'cardIn 0.5s cubic-bezier(0.16,1,0.3,1)' }}>

      {/* ── Movie Info ── */}
      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border)',
        borderRadius: '20px', overflow: 'hidden', marginBottom: '20px',
      }}>
        {/* Top accent line */}
        <div style={{ height: '3px', background: 'linear-gradient(90deg, var(--accent2), var(--accent), transparent)' }} />

        <div style={{ padding: '32px', display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'flex-start' }}>

          {/* Poster */}
          <div style={{
            flexShrink: 0, borderRadius: '12px', overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            background: 'var(--surface)', width: '160px', height: '240px', position: 'relative',
          }}>
            {hasPoster ? (
              <Image src={movie.Poster} alt={`${movie.Title} poster`}
                fill style={{ objectFit: 'cover' }} unoptimized />
            ) : (
              <div style={{
                width: '100%', height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-muted)', fontSize: '40px',
              }}>🎬</div>
            )}
          </div>

          {/* Details */}
          <div style={{ flex: 1, minWidth: '200px' }}>

            {/* Genre pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              {genres.map(g => (
                <span key={g} style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: '6px', padding: '3px 10px',
                  fontSize: '11px', color: 'var(--text-muted)',
                  textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500,
                }}>{g}</span>
              ))}
            </div>

            {/* Title */}
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.4rem, 4vw, 2rem)',
              fontWeight: 700, lineHeight: 1.2, marginBottom: '10px',
            }}>{movie.Title}</h2>

            {/* Meta row */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '14px',
              marginBottom: '18px', alignItems: 'center',
            }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{movie.Year}</span>
              <Dot />
              <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{movie.Runtime}</span>
              <Dot />
              <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{movie.Rated}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ color: '#fbbf24' }}>★</span>
                <span style={{ fontWeight: 700, fontSize: '15px' }}>{movie.imdbRating}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>/10</span>
              </div>
            </div>

            {/* Plot */}
            <p style={{
              color: 'var(--text-muted)', fontSize: '14px',
              lineHeight: 1.75, marginBottom: '20px', maxWidth: '520px',
            }}>{movie.Plot}</p>

            {/* Director & votes */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
              <InfoItem label="Director"   value={movie.Director} />
              <InfoItem label="IMDb Votes" value={movie.imdbVotes} />
              {movie.Released && movie.Released !== 'N/A' && (
                <InfoItem label="Released" value={movie.Released} />
              )}
            </div>
          </div>
        </div>

        {/* All ratings strip */}
        {movie.Ratings?.length > 0 && (
          <div style={{
            borderTop: '1px solid var(--border)',
            padding: '20px 32px',
            display: 'flex', flexWrap: 'wrap', gap: '28px',
          }}>
            {movie.Ratings.map(r => (
              <div key={r.Source}>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                  {r.Source}
                </p>
                <p style={{ fontWeight: 700, fontSize: '18px', color: 'var(--accent)' }}>{r.Value}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Cast ── */}
      {cast.length > 0 && (
        <div style={{
          background: 'var(--bg2)', border: '1px solid var(--border)',
          borderRadius: '20px', padding: '28px 32px', marginBottom: '20px',
        }}>
          <h3 style={sectionTitle}>Cast</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {cast.map((actor, i) => (
              <div key={actor} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: '100px', padding: '8px 18px',
                fontSize: '14px', color: 'var(--text)',
                display: 'flex', alignItems: 'center', gap: '8px',
                animation: `fadeInUp 0.4s ease ${i * 0.06}s both`,
              }}>
                {/* Avatar initial */}
                <span style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  background: `hsl(${(i * 53) % 360},35%,22%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '10px', fontWeight: 700,
                  color: `hsl(${(i * 53) % 360},65%,70%)`,
                }}>
                  {actor.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
                {actor}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── AI Sentiment ── */}
      <div style={{
        background: 'var(--bg2)',
        border: `1px solid ${sc.color}33`,
        borderRadius: '20px', overflow: 'hidden',
      }}>
        <div style={{ height: '3px', background: `linear-gradient(90deg, ${sc.color}, transparent)` }} />

        <div style={{ padding: '32px' }}>
          {/* Header row */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '16px', marginBottom: '24px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: 'rgba(59,130,246,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#3b82f6" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                </svg>
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: '16px' }}>AI Sentiment Analysis</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Powered by Gemini AI</p>
              </div>
            </div>

            {/* Sentiment badge */}
            <div style={{
              background: sc.bg, border: `1px solid ${sc.color}44`,
              borderRadius: '100px', padding: '8px 20px',
              display: 'flex', alignItems: 'center', gap: '8px',
              color: sc.color, fontWeight: 700, fontSize: '15px',
            }}>
              {sc.icon} {sc.label}
            </div>
          </div>

          {/* Score bar */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Sentiment Score
              </span>
              <span style={{ fontWeight: 700, color: sc.color }}>{sentiment.score}/100</span>
            </div>
            <div style={{ height: '6px', borderRadius: '100px', background: 'var(--surface)', overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${sentiment.score}%`,
                background: `linear-gradient(90deg, ${sc.color}88, ${sc.color})`,
                borderRadius: '100px',
                animation: 'growBar 1.2s cubic-bezier(0.16,1,0.3,1) both',
              }} />
            </div>
          </div>

          {/* AI summary quote */}
          <p style={{
            color: 'var(--text)', fontSize: '15px', lineHeight: 1.8,
            marginBottom: '24px', padding: '20px',
            background: 'var(--bg3)', borderRadius: '12px',
            borderLeft: `3px solid ${sc.color}`,
            fontStyle: 'italic',
          }}>
            &ldquo;{sentiment.summary}&rdquo;
          </p>

          {/* Key highlights */}
          {sentiment.highlights?.length > 0 && (
            <div>
              <p style={sectionTitle}>Key Highlights</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {sentiment.highlights.map((h, i) => (
                  <div key={i} style={{
                    background: `${sc.color}0f`,
                    border: `1px solid ${sc.color}22`,
                    borderRadius: '8px', padding: '8px 14px',
                    fontSize: '13px', color: 'var(--text)',
                    display: 'flex', alignItems: 'center', gap: '6px',
                    animation: `fadeInUp 0.4s ease ${i * 0.1}s both`,
                  }}>
                    <span style={{ color: sc.color }}>✦</span> {h}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes cardIn {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes growBar {
          from { width: 0; }
        }
      `}</style>
    </div>
  );
}

// Small helpers
function Dot() {
  return <span style={{ color: 'var(--border)' }}>·</span>;
}
function InfoItem({ label, value }) {
  return (
    <div>
      <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>{label}</p>
      <p style={{ fontSize: '14px', fontWeight: 500 }}>{value}</p>
    </div>
  );
}
const sectionTitle = {
  fontSize: '12px', fontWeight: 600,
  color: 'var(--text-muted)', textTransform: 'uppercase',
  letterSpacing: '0.1em', marginBottom: '14px',
};
