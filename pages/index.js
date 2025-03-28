import { useEffect, useState } from "react";

const contentMap = [
  {
    title: "BW15 Section 1",
    img: "https://assets.oregontool.com/adaptivemedia/rendition?id=309e35718b4ab130eecb08feefa3fc95b71c9830",
    children: [
      {
        title: "Warranty Chart",
        img: "https://assets.oregontool.com/adaptivemedia/rendition?id=87961fbfc2d88e81341399af9f77535258d8cf4f",
        content: {
          type: "image",
          src: "https://assets.oregontool.com/adaptivemedia/rendition?id=87961fbfc2d88e81341399af9f77535258d8cf4f",
          text: "The warranty chart illustrates the coverage periods and applicable parts under the BW15 warranty plan."
        },
      },
      {
        title: "Warranty Video",
        img: "https://assets.oregontool.com/adaptivemedia/rendition?id=309e35718b4ab130eecb08feefa3fc95b71c9830",
        content: {
          type: "video",
          src: "https://assets.oregontool.com/adaptivemedia/rendition?id=9fe548dc441e9fb005e6c3cba497aa4daa0a324b",
          text: "This video explains the BW15 warranty coverage in detail, including what's included and how to claim."
        },
      },
    ],
  },
  {
    title: "BW15 Section 2",
    img: "https://assets.oregontool.com/adaptivemedia/rendition?id=2373607ac3325a24c8b300e22d77ec466bfb5d31",
    children: [
      {
        title: "Cut Height Video",
        img: "https://assets.oregontool.com/adaptivemedia/rendition?id=2373607ac3325a24c8b300e22d77ec466bfb5d31",
        content: {
          type: "video",
          src: "https://assets.oregontool.com/adaptivemedia/rendition?id=f143ee17a2c0e65389e2a672c0a7983c75a29a30",
          text: "Learn how to adjust and maintain the proper cut height for optimal BW15 performance."
        },
      },
      {
        title: "SmartLift Video",
        img: "https://assets.oregontool.com/adaptivemedia/rendition?id=309e35718b4ab130eecb08feefa3fc95b71c9830",
        content: {
          type: "video",
          src: "https://assets.oregontool.com/adaptivemedia/rendition?id=dc8e0ea834cd3980dd806781910e91b16f73f94b",
          text: "This video demonstrates the SmartLift feature and how it simplifies transportation and storage."
        },
      },
    ],
  },
  {
    title: "BW15 Section 3",
    img: "https://assets.oregontool.com/adaptivemedia/rendition?id=309e35718b4ab130eecb08feefa3fc95b71c9830",
    children: [
      {
        title: "Level Lock Video",
        img: "https://assets.oregontool.com/adaptivemedia/rendition?id=87961fbfc2d88e81341399af9f77535258d8cf4f",
        content: {
          type: "video",
          src: "https://assets.oregontool.com/adaptivemedia/rendition?id=42064576b4f01fce5ca373495922eefc03267b35",
          text: "Discover how the Level Lock system ensures smooth and stable cutting across uneven terrain."
        },
      },
      {
        title: "Spec Chart",
        img: "https://assets.oregontool.com/adaptivemedia/rendition?id=2373607ac3325a24c8b300e22d77ec466bfb5d31",
        content: {
          type: "image",
          src: "https://assets.oregontool.com/adaptivemedia/rendition?id=2373607ac3325a24c8b300e22d77ec466bfb5d31",
          text: "This specification chart outlines the key features, dimensions, and performance details of the BW15."
        },
      },
    ],
  },
];

const preloadAssets = [
  "https://assets.oregontool.com/adaptivemedia/rendition?id=9fe548dc441e9fb005e6c3cba497aa4daa0a324b", // Warranty Video
  "https://assets.oregontool.com/adaptivemedia/rendition?id=f143ee17a2c0e65389e2a672c0a7983c75a29a30", // Cut Height Video
  "https://assets.oregontool.com/adaptivemedia/rendition?id=dc8e0ea834cd3980dd806781910e91b16f73f94b", // SmartLift Video
  "https://assets.oregontool.com/adaptivemedia/rendition?id=42064576b4f01fce5ca373495922eefc03267b35", // Level Lock Video
  "https://assets.oregontool.com/adaptivemedia/rendition?id=87961fbfc2d88e81341399af9f77535258d8cf4f", // Warranty Chart
  "https://assets.oregontool.com/adaptivemedia/rendition?id=2373607ac3325a24c8b300e22d77ec466bfb5d31", // Spec Chart
  "https://assets.oregontool.com/adaptivemedia/rendition?id=309e35718b4ab130eecb08feefa3fc95b71c9830", // BW15 Photo
  "https://assets.oregontool.com/adaptivemedia/rendition?id=938a60bafb1336bed4e3026e448274f5feb61191", // Slide Image
];


export default function Home() {
  const [activeMain, setActiveMain] = useState(null);
  const [activeContent, setActiveContent] = useState(null);
  useEffect(() => {
    if (navigator.onLine) {
      preloadAssets.forEach((url) => {
        fetch(url, { mode: "no-cors" })
          .then(() => console.log("✅ Preloaded:", url))
          .catch(() => console.warn("⚠️ Failed to preload:", url));
      });
    }
  }, []);
  // useEffect(() => {
  //   // ✅ Disable right-click
  //   const disableRightClick = (e) => e.preventDefault();
  //   window.addEventListener("contextmenu", disableRightClick);
  
  //   // ✅ Block F12, Ctrl+Shift+I/J/C/K/U
  //   const blockDevTools = (e) => {
  //     const key = e.key.toUpperCase();
  //     if (
  //       e.key === "F12" ||
  //       (e.ctrlKey && e.shiftKey && ["I", "J", "C", "K", "U"].includes(key))
  //     ) {
  //       e.preventDefault();
  //       e.stopPropagation();
  //     }
  //   };
  //   window.addEventListener("keydown", blockDevTools);
  
  //   // ✅ Detect DevTools open via window size check
  //   const detectDevTools = () => {
  //     const widthDiff = window.outerWidth - window.innerWidth;
  //     const heightDiff = window.outerHeight - window.innerHeight;
    
  //     if (widthDiff > 160 || heightDiff > 160) {
  //       alert("DevTools detected — closing app");
  //       document.body.innerHTML = "";
  //       document.title = "";
  //       // Try to close (works only in limited contexts)
  //       // window.close();
    
  //       // Fallback: wipe the page
  //       // window.location.href = "about:blank";
  //     }
  //   };
    
  //   const devToolsInterval = setInterval(detectDevTools, 1000);
  
  //   // ✅ Cleanup on unmount
  //   return () => {
  //     window.removeEventListener("contextmenu", disableRightClick);
  //     window.removeEventListener("keydown", blockDevTools);
  //     clearInterval(devToolsInterval);
  //   };
  // }, []);
  
  return (
    <div className="container">
      <h1>Offline BW15 Viewer</h1>

      {!activeMain && (
        <div className="grid">
          {contentMap.map((section, idx) => (
            <div
              key={idx}
              className="card"
              onClick={() => setActiveMain(section)}
            >
              <img src={section.img} alt={section.title} />
              <p>{section.title}</p>
            </div>
          ))}
        </div>
      )}

      {activeMain && !activeContent && (
        <>
          <button className="back-btn" onClick={() => setActiveMain(null)}>
            ← Back to Main
          </button>
          <div className="grid">
            {activeMain.children.map((sub, idx) => (
              <div
                key={idx}
                className="card"
                onClick={() => setActiveContent(sub.content)}
              >
                <img src={sub.img} alt={sub.title} />
                <p>{sub.title}</p>
              </div>
            ))}
          </div>
        </>
      )}
{activeContent && (
  <>
    <button className="back-btn" onClick={() => setActiveContent(null)}>
      ← Back to Sub-Buttons
    </button>
    <div className="media-view">
    {activeContent.text && (
        <p style={{ marginTop: "16px", fontSize: "16px", lineHeight: "1.6", maxWidth:"48%" }}>
          {activeContent.text}
        </p>
      )}
      {activeContent.type === "image" ? (
        <img src={activeContent.src} alt="Display" />
      ) : (
        <video src={activeContent.src} controls style={{ width:"48%" }}/>
      )}
    </div>
  </>
)}

    </div>
  );
}
