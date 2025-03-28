// next.config.js
const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    additionalManifestEntries: [
      {
        url: "https://assets.oregontool.com/adaptivemedia/rendition?id=9fe548dc441e9fb005e6c3cba497aa4daa0a324b",
        revision: "v1"
      },
      {
        url: "https://assets.oregontool.com/adaptivemedia/rendition?id=f143ee17a2c0e65389e2a672c0a7983c75a29a30",
        revision: "v1"
      },
      {
        url: "https://assets.oregontool.com/adaptivemedia/rendition?id=dc8e0ea834cd3980dd806781910e91b16f73f94b",
        revision: "v1"
      },
      {
        url: "https://assets.oregontool.com/adaptivemedia/rendition?id=42064576b4f01fce5ca373495922eefc03267b35",
        revision: "v1"
      },
      {
        url: "https://assets.oregontool.com/adaptivemedia/rendition?id=87961fbfc2d88e81341399af9f77535258d8cf4f",
        revision: "v1"
      },
      {
        url: "https://assets.oregontool.com/adaptivemedia/rendition?id=2373607ac3325a24c8b300e22d77ec466bfb5d31",
        revision: "v1"
      },
      {
        url: "https://assets.oregontool.com/adaptivemedia/rendition?id=309e35718b4ab130eecb08feefa3fc95b71c9830",
        revision: "v1"
      },
      {
        url: "https://assets.oregontool.com/adaptivemedia/rendition?id=938a60bafb1336bed4e3026e448274f5feb61191",
        revision: "v1"
      }
    ]
  });
  
  module.exports = withPWA({
    reactStrictMode: true,
    output: 'export',
    
  });
  