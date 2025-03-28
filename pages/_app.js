import Head from 'next/head';
import '../styles/globals.css';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [swReady, setSwReady] = useState(false);

  // Detect online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.type === 'CACHE_FINISHED') {
          setSwReady(true);
        }
      });
    }
  }, []);
  

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MediaPWA" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </Head>

      {/* Optional loader while service worker finishes setting up */}
      {!swReady ? (
        <div style={styles.loader}>🔄 Preparing offline mode...</div>
      ) : (
        <>
          {/* Show offline banner */}
          {isOffline && (
            <div style={styles.banner}>⚠️ You're offline. Some features may not work.</div>
          )}
          <Component {...pageProps} />
        </>
      )}
    </>
  );
}

const styles = {
  banner: {
    background: '#ffcc00',
    color: '#000',
    padding: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
    position: 'sticky',
    top: 0,
    zIndex: 999,
  },
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontSize: '18px',
    fontWeight: 'bold',
  },
};

export default MyApp;
