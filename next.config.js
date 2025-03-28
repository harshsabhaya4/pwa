// next.config.js
const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    swSrc: "sw.js", // 👈 now a source file, no longer inside /public
    fallbacks: {
      document: '/offline.html', // ⬅️ custom fallback for navigation
    },
    buildExcludes: [/middleware-manifest\.json$/, /dynamic-css-manifest\.json$/]
  });
  
  module.exports = withPWA({
    reactStrictMode: true,
    
  });
  