'use client';

import { useState } from 'react';

export default function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  const isValid = /^tt\d{7,8}$/.test(value.trim());
  const showError = touched && value.trim() !== '' && !isValid;

  function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!value.trim() || !isValid) return;
    onSearch(value.trim());
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`
          flex items-center gap-2.5
          bg-neutral-900
          rounded-2xl
          px-5 py-2
          transition-all duration-200
          ${showError
            ? 'border border-red-500 shadow-[0_0_0_3px_rgba(239,68,68,0.12)]'
            : 'border border-neutral-700'}
        `}
      >

       
        <svg
          className="w-4 h-4 text-neutral-400 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z"
          />
        </svg>

      
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="Enter IMDb ID (e.g. tt0133093)"
          disabled={loading}
          autoComplete="off"
          spellCheck={false}
          aria-label="IMDb Movie ID"
          className="
            flex-1
            bg-transparent
            outline-none
            text-sm
            tracking-wide
            text-white
            placeholder:text-neutral-500
          "
        />

        
        {value && (
          <button
            type="button"
            onClick={() => { setValue(''); setTouched(false); }}
            aria-label="Clear"
            className="text-neutral-400 hover:text-white transition p-1 shrink-0"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}


        <button
          type="submit"
          disabled={loading || !value.trim()}
          className={`
            flex items-center gap-2 shrink-0
            rounded-xl
            px-6 py-2.5
            text-sm font-semibold
            transition-all duration-200
            ${loading
              ? 'bg-neutral-800 text-neutral-400 cursor-not-allowed'
              : 'bg-yellow-400 text-black hover:bg-yellow-300'}
            ${!value.trim() && 'cursor-not-allowed opacity-70'}
          `}
        >
          {loading ? (
            <>
              <span className="w-3 h-3 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
              Analyzing
            </>
          ) : (
            'Analyze'
          )}
        </button>
      </div>

    
      {showError && (
        <p className="text-red-500 text-xs mt-2 pl-5">
          Invalid format. Should be: <strong>tt</strong> + 7 or 8 digits — e.g. tt0133093
        </p>
      )}
    </form>
  );
}