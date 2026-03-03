'use client';

export default function ErrorMessage({ message }) {
  return (
    <div style={{
      background: 'rgba(239,68,68,0.08)',
      border: '1px solid rgba(239,68,68,0.25)',
      borderRadius: '16px', padding: '24px 28px',
      display: 'flex', alignItems: 'flex-start', gap: '16px',
      animation: 'fadeIn 0.3s ease',
    }}>
      <div style={{
        width: '40px', height: '40px', borderRadius: '10px',
        background: 'rgba(239,68,68,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      </div>

      <div>
        <p style={{ color: '#ef4444', fontWeight: 600, marginBottom: '4px' }}>Something went wrong</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6 }}>{message}</p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </div>
  );
}
