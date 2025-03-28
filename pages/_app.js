// pages/_app.js
import Head from 'next/head';
import '../styles/globals.css';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault(); // Prevent the default browser mini-infobar
      setDeferredPrompt(e); // Store the event for later use
      console.log('🛎️ PWA install prompt ready');
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  // Optionally, trigger the prompt automatically or with a custom button
  useEffect(() => {
    if (deferredPrompt) {
      // Auto-show prompt (optional: you might want a custom install button instead)
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('✅ User accepted the A2HS prompt');
        } else {
          console.log('❌ User dismissed the A2HS prompt');
        }

        setDeferredPrompt(null); // Reset
      });
    }
  }, [deferredPrompt]);

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
