'use client';

export default function LoadingState() {
  return (
    <div style={{ display: 'grid', gap: '20px', animation: 'fadeIn 0.3s ease' }}>

      {/* Movie info skeleton */}
      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border)',
        borderRadius: '20px', padding: '32px',
        display: 'flex', gap: '28px', alignItems: 'flex-start', flexWrap: 'wrap',
      }}>
        <Shimmer width={160} height={240} radius={12} />
        <div style={{ flex: 1, minWidth: '200px' }}>
          {[200, 280, 120, 180, 150].map((w, i) => (
            <Shimmer key={i} width={w} height={i === 1 ? 28 : 15}
              radius={6} style={{ marginBottom: i === 1 ? 16 : 12 }} delay={i * 0.08} />
          ))}
        </div>
      </div>

      {/* Sentiment skeleton */}
      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border)',
        borderRadius: '20px', padding: '32px',
      }}>
        <Shimmer width={200} height={20} radius={6} style={{ marginBottom: 20 }} />
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ flex: 1 }}>
              <Shimmer width="100%" height={36} radius={10} delay={i * 0.1} />
            </div>
          ))}
        </div>
        {[100, 85, 70].map((w, i) => (
          <Shimmer key={i} width={`${w}%`} height={14} radius={4}
            style={{ marginBottom: 10 }} delay={i * 0.1} />
        ))}
      </div>

      <p style={{
        textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px', paddingTop: '4px',
        animation: 'pulse 1.5s ease-in-out infinite',
      }}>
        ✦ Fetching movie data &amp; running AI analysis…
      </p>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/** Reusable shimmer block */
function Shimmer({ width, height, radius = 6, style = {}, delay = 0 }) {
  return (
    <div style={{
      width, height, borderRadius: radius,
      background: 'linear-gradient(90deg, var(--surface) 25%, var(--bg3) 50%, var(--surface) 75%)',
      backgroundSize: '200% 100%',
      animation: `shimmer 1.5s infinite`,
      animationDelay: `${delay}s`,
      ...style,
    }} />
  );
}
