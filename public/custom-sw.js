import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst, StaleWhileRevalidate, NetworkFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";
import { clientsClaim } from "workbox-core";

self.skipWaiting();
clientsClaim();

// 👇 Precaches all HTML, JS, CSS from build
precacheAndRoute(self.__WB_MANIFEST);

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
