import Head from "next/head";
import "../styles/globals.css";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [isOffline, setIsOffline] = useState(
    typeof window !== 'undefined' ? !navigator.onLine : false
  );
  
  const [swReady, setSwReady] = useState(false);

  // Detect online/offline status
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  
      const handleOnline = () => setIsOffline(false);
      const handleOffline = () => setIsOffline(true);
  
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
  
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
        setSwReady(true);
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
      {!swReady && (
        <div style={styles.overlay}>
          <p>🛠️ Preparing offline mode in background...</p>
        </div>
      )}
      <Component {...pageProps} />
    </>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    bottom: 20,
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#333',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    zIndex: 999,
  },  
  banner: {
    background: "#ffcc00",
    color: "#000",
    padding: "10px",
    textAlign: "center",
    fontWeight: "bold",
    position: "sticky",
    top: 0,
    zIndex: 999,
  },
  loader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontSize: "18px",
    fontWeight: "bold",
  },
};

export default MyApp;
