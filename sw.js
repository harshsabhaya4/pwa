import { createHandlerBoundToURL, precacheAndRoute, matchPrecache } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst, StaleWhileRevalidate, NetworkFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";
import { clientsClaim } from "workbox-core";

self.skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST.concat([
  { url: '/', revision: null }
]));

// Notify app when caching is done
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const clients = await self.clients.matchAll();
      for (const client of clients) {
        client.postMessage({ type: 'CACHE_FINISHED' });
      }
    })()
  );
});

// Handle navigation + fallback to offline page
registerRoute(
  ({ request }) => request.mode === 'navigate',
  async () => {
    try {
      return await fetch('/');
    } catch (error) {
      return await matchPrecache('/offline.html');
    }
  }
);

// Cache root `/` for iOS home screen
registerRoute(
  ({ url }) => url.pathname === '/',
  new NetworkFirst({
    cacheName: 'start-url',
    plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })],
  })
);

// Cache JS & CSS
registerRoute(
  ({ request }) =>
    request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate({
    cacheName: 'assets',
    plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })],
  })
);

// Cache external media
registerRoute(
  ({ url }) =>
    url.origin === "https://assets.oregontool.com" &&
    url.pathname.startsWith("/adaptivemedia/rendition"),
  new CacheFirst({
    cacheName: "media-cache",
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 }),
    ],
  })
);
