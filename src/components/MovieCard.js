'use client';

import Image from 'next/image';

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
    <div className="animate-[cardIn_0.5s_cubic-bezier(0.16,1,0.3,1)]">

   
      <div className="bg-[var(--bg2)] border border-[var(--border)] rounded-[20px] overflow-hidden mb-5">

        <div className="h-[3px] bg-gradient-to-r from-[var(--accent2)] via-[var(--accent)] to-transparent" />

        <div className="p-8 flex gap-8 flex-wrap items-start">

         
          <div className="flex-shrink-0 rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] bg-[var(--surface)] w-[160px] h-[240px] relative">
            {hasPoster ? (
              <Image
                src={movie.Poster}
                alt={`${movie.Title} poster`}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[var(--text-muted)] text-[40px]">
                🎬
              </div>
            )}
          </div>

 
          <div className="flex-1 min-w-[200px]">

           
            <div className="flex flex-wrap gap-2 mb-3">
              {genres.map(g => (
                <span
                  key={g}
                  className="bg-[var(--surface)] border border-[var(--border)] rounded-md px-[10px] py-[3px] text-[11px] text-[var(--text-muted)] uppercase tracking-[0.08em] font-medium"
                >
                  {g}
                </span>
              ))}
            </div>

            
            <h2
              className="font-display font-bold leading-[1.2] mb-2.5"
              style={{ fontSize: 'clamp(1.4rem,4vw,2rem)' }}
            >
              {movie.Title}
            </h2>

            
            <div className="flex flex-wrap gap-3.5 mb-[18px] items-center text-[14px] text-[var(--text-muted)]">
              <span>{movie.Year}</span>
              <span className="text-[var(--border)]">·</span>
              <span>{movie.Runtime}</span>
              <span className="text-[var(--border)]">·</span>
              <span>{movie.Rated}</span>

              <div className="flex items-center gap-1.5">
                <span className="text-[#fbbf24]">★</span>
                <span className="font-bold text-[15px] text-[var(--text)]">
                  {movie.imdbRating}
                </span>
                <span className="text-[12px] text-[var(--text-muted)]">/10</span>
              </div>
            </div>

            
            <p className="text-[var(--text-muted)] text-[14px] leading-[1.75] mb-5 max-w-[520px]">
              {movie.Plot}
            </p>

            
            <div className="flex flex-wrap gap-6">
              <InfoItem label="Director" value={movie.Director} />
              <InfoItem label="IMDb Votes" value={movie.imdbVotes} />
              {movie.Released && movie.Released !== 'N/A' && (
                <InfoItem label="Released" value={movie.Released} />
              )}
            </div>
          </div>
        </div>

        
        {movie.Ratings?.length > 0 && (
          <div className="border-t border-[var(--border)] px-8 py-5 flex flex-wrap gap-7">
            {movie.Ratings.map(r => (
              <div key={r.Source}>
                <p className="text-[11px] text-[var(--text-muted)] uppercase tracking-[0.08em] mb-1">
                  {r.Source}
                </p>
                <p className="font-bold text-[18px] text-[var(--accent)]">
                  {r.Value}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      
      {cast.length > 0 && (
        <div className="bg-[var(--bg2)] border border-[var(--border)] rounded-[20px] px-8 py-7 mb-5">
          <SectionTitle>Cast</SectionTitle>

          <div className="flex flex-wrap gap-2.5">
            {cast.map((actor, i) => (
              <div
                key={actor}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-full px-4 py-2 text-[14px] text-[var(--text)] flex items-center gap-2 animate-[fadeInUp_0.4s_ease_both]"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{
                    background: `hsl(${(i * 53) % 360},35%,22%)`,
                    color: `hsl(${(i * 53) % 360},65%,70%)`,
                  }}
                >
                  {actor.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
                {actor}
              </div>
            ))}
          </div>
        </div>
      )}

    
      <div
        className="bg-[var(--bg2)] rounded-[20px] overflow-hidden"
        style={{ border: `1px solid ${sc.color}33` }}
      >
        <div
          className="h-[3px]"
          style={{ background: `linear-gradient(90deg, ${sc.color}, transparent)` }}
        />

        <div className="p-8">

          
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[10px] bg-[rgba(59,130,246,0.15)] flex items-center justify-center">
                ✦
              </div>
              <div>
                <p className="font-semibold text-[16px] text-[var(--text)]">
                  AI Sentiment Analysis
                </p>
                <p className="text-[12px] text-[var(--text-muted)]">
                  Powered by Gemini API
                </p>
              </div>
            </div>

            <div
              className="rounded-full px-5 py-2 flex items-center gap-2 font-bold text-[15px]"
              style={{
                background: sc.bg,
                border: `1px solid ${sc.color}44`,
                color: sc.color,
              }}
            >
              {sc.icon} {sc.label}
            </div>
          </div>

          
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-[12px] text-[var(--text-muted)] uppercase tracking-[0.08em]">
                Sentiment Score
              </span>
              <span className="font-bold" style={{ color: sc.color }}>
                {sentiment.score}/100
              </span>
            </div>

            <div className="h-[6px] rounded-full bg-[var(--surface)] overflow-hidden">
              <div
                className="h-full rounded-full animate-[growBar_1.2s_cubic-bezier(0.16,1,0.3,1)_both]"
                style={{
                  width: `${sentiment.score}%`,
                  background: `linear-gradient(90deg, ${sc.color}88, ${sc.color})`,
                }}
              />
            </div>
          </div>

        
          <p
            className="text-[15px] leading-[1.8] mb-6 p-5 bg-[var(--bg3)] rounded-xl italic"
            style={{ borderLeft: `3px solid ${sc.color}` }}
          >
            “{sentiment.summary}”
          </p>

       
          {sentiment.highlights?.length > 0 && (
            <>
              <SectionTitle>Key Highlights</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {sentiment.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="rounded-md px-3 py-2 text-[13px] flex items-center gap-1.5 animate-[fadeInUp_0.4s_ease_both]"
                    style={{
                      background: `${sc.color}0f`,
                      border: `1px solid ${sc.color}22`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  >
                    <span style={{ color: sc.color }}>✦</span>
                    {h}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-[11px] text-[var(--text-muted)] uppercase tracking-[0.1em] mb-1">
        {label}
      </p>
      <p className="text-[14px] font-medium text-[var(--text)]">
        {value}
      </p>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <p className="text-[12px] font-semibold text-[var(--text-muted)] uppercase tracking-[0.1em] mb-3.5">
      {children}
    </p>
  );
}