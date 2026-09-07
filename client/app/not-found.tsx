export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-sans, sans-serif)',
      background: '#f9fafb',
      color: '#111827'
    }}>
      <h1 style={{ fontSize: '6rem', fontWeight: 700, margin: 0, lineHeight: 1, color: '#2563eb' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0.5rem 0' }}>Page Not Found</h2>
      <p style={{ color: '#6b7280', marginBottom: '2rem', textAlign: 'center', maxWidth: 400 }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <a
        href="/"
        style={{
          padding: '0.75rem 2rem',
          background: '#2563eb',
          color: '#fff',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          transition: 'background 0.2s'
        }}
      >
        Go Home
      </a>
    </div>
  );
}
