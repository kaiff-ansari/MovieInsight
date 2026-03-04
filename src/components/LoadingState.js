'use client';

export default function LoadingState() {
  return (
    <div className="grid gap-5 animate-[fadeIn_0.3s_ease]">

     
      <div className="bg-neutral-900 border border-neutral-700 rounded-3xl p-8 flex flex-wrap gap-7 items-start">
        <Shimmer className="w-40 h-60 rounded-xl" />

        <div className="flex-1 min-w-[200px]">
          {[200, 280, 120, 180, 150].map((w, i) => (
            <Shimmer
              key={i}
              className={`${i === 1 ? 'h-7 mb-4' : 'h-4 mb-3'} rounded-md`}
              style={{ width: w }}
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>

     
      <div className="bg-neutral-900 border border-neutral-700 rounded-3xl p-8">
        <Shimmer className="w-52 h-5 rounded-md mb-5" />

        <div className="flex gap-2.5 mb-5">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex-1">
              <Shimmer
                className="w-full h-9 rounded-xl"
                delay={i * 0.1}
              />
            </div>
          ))}
        </div>

        {[100, 85, 70].map((w, i) => (
          <Shimmer
            key={i}
            className="h-3.5 rounded-sm mb-2"
            style={{ width: `${w}%` }}
            delay={i * 0.1}
          />
        ))}
      </div>

      <p className="text-center text-sm text-neutral-400 pt-1 animate-pulse">
        ✦ Fetching movie data & running AI analysis…
      </p>

      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}


function Shimmer({ className = '', style = {}, delay = 0 }) {
  return (
    <div
      className={`
        bg-gradient-to-r
        from-neutral-800
        via-neutral-700
        to-neutral-800
        bg-[length:200%_100%]
        animate-[shimmer_1.5s_infinite]
        ${className}
      `}
      style={{
        animationDelay: `${delay}s`,
        ...style,
      }}
    >
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}