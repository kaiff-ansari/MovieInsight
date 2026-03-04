'use client';

export default function ErrorMessage({ message }) {
  return (
    <div
      className="
        flex items-start gap-4
        bg-red-500/10
        border border-red-500/30
        rounded-2xl
        px-7 py-6
        animate-[fadeIn_0.3s_ease]
      "
    >
      
      <div
        className="
          w-10 h-10
          rounded-xl
          bg-red-500/20
          flex items-center justify-center
          shrink-0
        "
      >
        <svg
          className="w-5 h-5 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
      </div>

      
      <div>
        <p className="text-red-500 font-semibold mb-1">
          Something went wrong
        </p>
        <p className="text-sm text-neutral-400 leading-relaxed">
          {message}
        </p>
      </div>

      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}