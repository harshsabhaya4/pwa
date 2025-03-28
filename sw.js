import { precacheAndRoute } from "workbox-precaching";
import { registerRoute, setCatchHandler } from "workbox-routing";
import { CacheFirst, StaleWhileRevalidate, NetworkFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";
import { clientsClaim } from "workbox-core";

self.skipWaiting();
clientsClaim();
precacheAndRoute([
  { url: '/', revision: null },
  ...self.__WB_MANIFEST,
]);
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'pages-cache',
    plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })],
  })
);

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then((res) => res || caches.match('/'))
    )
  );
});


// 👇 Force offline support for root `/`
registerRoute(
  ({ url }) => url.pathname === '/',
  new NetworkFirst({
    cacheName: 'start-url',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
  })
);

// 👇 App shell: JS, CSS
registerRoute(
  ({ request }) =>
    request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate({
    cacheName: 'assets',
    plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })],
  })
);

// 👇 External images & videos
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


setCatchHandler(async ({ event }) => {
  if (event.request.destination === 'document') {
    return caches.match('/');
  }
  return Response.error();
});
