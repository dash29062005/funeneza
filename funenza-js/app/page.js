export default function Home() {
  return (
    <div
      style={{
        minHeight: '200vh',
        background: 'linear-gradient(135deg, #080814 0%, #0d0d2b 50%, #080814 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '100px',
        color: 'white',
        fontFamily: 'sans-serif',
        gap: '16px',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#FFD700' }}>
        🎮 Funenza
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' }}>
        Scroll down to see the navbar scroll effect ↓
      </p>
      <p style={{ color: 'rgba(255,255,255,0.3)', marginTop: '80vh' }}>
        Bottom of page — navbar is now compact & solid ✓
      </p>
    </div>
  );
}
