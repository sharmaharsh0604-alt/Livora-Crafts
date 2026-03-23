'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const slides = [
  { src: '/images/hero-2.jpg', tag: 'Wooden Tableware' },
  { src: '/images/hero-3.jpg', tag: 'Home Décor' },
  { src: '/images/hero-1.jpg', tag: 'Artisan Crafts' },
];

const DURATION = 4500;

export default function HeroSection() {
  const [current, setCurrent]   = useState(0);
  const [entered, setEntered]   = useState(false);
  const [progress, setProgress] = useState(0);

  const progStart = useRef<number>(0);
  const rafRef    = useRef<number | null>(null);
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* text reveal */
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 120);
    return () => clearTimeout(t);
  }, []);

  /* progress + auto-advance — rAF driven, no drift */
  useEffect(() => {
    setProgress(0);
    if (rafRef.current)   cancelAnimationFrame(rafRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);

    progStart.current = performance.now();

    const tick = (now: number) => {
      const pct = Math.min(((now - progStart.current) / DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    timerRef.current = setTimeout(
      () => setCurrent((p) => (p + 1) % slides.length),
      DURATION,
    );

    return () => {
      if (rafRef.current)   cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current]);

  const goTo = (i: number) => { if (i !== current) setCurrent(i); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        /* full-bleed hero sits behind fixed navbar */
        .hs-root {
          position: relative;
          width: 100%;
          /* KEY FIX: 100vh so it always fills the viewport regardless of navbar */
          height: 100vh;
          min-height: 600px;
          overflow: hidden;
        }

        /* slides */
        .hs-slide {
          position: absolute; inset: 0;
          opacity: 0;
          transform: scale(1.05);
          transition: opacity 1.3s ease, transform 8s cubic-bezier(0.25,0.46,0.45,0.94);
          will-change: opacity, transform;
          z-index: 1;
        }
        .hs-slide.active { opacity: 1; transform: scale(1); z-index: 2; }

        /* overlays */
        .hs-ov1 {
          position: absolute; inset: 0; z-index: 3;
          background: linear-gradient(
            to top,
            rgba(6,3,1,0.92) 0%,
            rgba(6,3,1,0.55) 30%,
            rgba(6,3,1,0.22) 60%,
            transparent 100%
          );
        }
        .hs-ov2 {
          position: absolute; inset: 0; z-index: 3;
          background: linear-gradient(
            to right,
            rgba(6,3,1,0.72) 0%,
            rgba(6,3,1,0.25) 50%,
            transparent 78%
          );
        }
        .hs-ov3 {
          position: absolute; inset: 0; z-index: 3;
          background: rgba(28,12,2,0.18);
        }

        /* content wrapper — sits on top, takes full height,
           uses padding-top to clear the fixed navbar (marquee+bar = 96px) */
        .hs-content {
          position: absolute; inset: 0; z-index: 10;
          padding-top: 96px;           /* clears fixed navbar */
          display: flex;
          align-items: center;         /* vertically centers the text block */
          padding-left:  clamp(24px, 6vw, 96px);
          padding-right: clamp(24px, 6vw, 96px);
          padding-bottom: 48px;
        }

        /* line reveal */
        .hs-ln  { overflow: hidden; display: block; }
        .hs-lni {
          display: block;
          transform: translateY(110%);
          transition: transform 1s cubic-bezier(0.16,1,0.3,1);
        }
        .hs-lni.in { transform: translateY(0); }

        /* fade-up */
        .hs-fu {
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .hs-fu.in { opacity: 1; transform: translateY(0); }

        /* buttons */
        .hs-btn {
          font-family: 'Jost', sans-serif;
          font-size: 0.62rem; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #fdfaf5;
          border: 1px solid rgba(253,250,245,0.28);
          padding: 14px 36px;
          text-decoration: none;
          position: relative; overflow: hidden; display: inline-block;
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(4px);
          transition: border-color 0.35s;
          white-space: nowrap;
        }
        .hs-btn::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg,#9a6618,#d4a444);
          transform: translateX(-101%);
          transition: transform 0.44s cubic-bezier(0.76,0,0.24,1);
        }
        .hs-btn:hover::before { transform: translateX(0); }
        .hs-btn:hover { border-color: rgba(212,164,68,0.5); }
        .hs-btn span { position: relative; z-index: 1; }

        .hs-ghost {
          font-family: 'Jost', sans-serif;
          font-size: 0.62rem; font-weight: 400;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: rgba(253,250,245,0.46);
          text-decoration: none;
          display: inline-flex; align-items: center; gap: 10px;
          transition: color 0.25s, gap 0.3s;
          white-space: nowrap;
        }
        .hs-ghost:hover { color: rgba(253,250,245,0.88); gap: 16px; }
        .hs-arr {
          width: 22px; height: 1px; background: currentColor;
          position: relative; flex-shrink: 0; transition: width 0.3s;
        }
        .hs-arr::after {
          content: ''; position: absolute; right:0; top:50%;
          transform: translateY(-50%) rotate(45deg);
          width: 4px; height: 4px;
          border-right: 1px solid currentColor;
          border-top:   1px solid currentColor;
        }
        .hs-ghost:hover .hs-arr { width: 34px; }

        /* tag */
        .hs-tag {
          font-family: 'Jost', sans-serif;
          font-size: 0.54rem; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(212,164,68,0.88);
          border: 1px solid rgba(212,164,68,0.24);
          padding: 5px 14px;
          background: rgba(168,114,42,0.08);
          backdrop-filter: blur(6px);
          display: inline-block;
        }

        /* usps */
        .hs-usp {
          font-family: 'Jost', sans-serif;
          font-size: 0.57rem; font-weight: 400;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(253,250,245,0.36);
          display: flex; align-items: center; gap: 7px;
          white-space: nowrap;
        }
        .hs-dot { width:3px; height:3px; border-radius:50%; background:#a8722a; flex-shrink:0; }

        /* scroll line */
        @keyframes hs-scrl {
          0%   { transform: scaleY(0); transform-origin: top;    opacity:0; }
          25%  { opacity: 1; }
          50%  { transform: scaleY(1); transform-origin: top; }
          51%  { transform-origin: bottom; }
          75%  { opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity:0; }
        }
        .hs-scrl { animation: hs-scrl 2.4s ease-in-out infinite; }
      `}</style>

      <div className="hs-root">

        {/* ── slides ── */}
        {slides.map((s, i) => (
          <div key={i} className={`hs-slide${i === current ? " active" : ""}`}>
            <Image src={s.src} alt={s.tag} fill className="object-cover" priority={i === 0} />
          </div>
        ))}

        {/* ── overlays ── */}
        <div className="hs-ov1" /><div className="hs-ov2" /><div className="hs-ov3" />

        {/* ── main content ── */}
        <div className="hs-content">
          <div style={{ maxWidth: "580px", width: "100%" }}>

            {/* tag */}
            <div className={`hs-fu${entered?" in":""}`} style={{ transitionDelay:"0.05s", marginBottom:"20px" }}>
              <span className="hs-tag">{slides[current].tag}</span>
            </div>

            {/* headline */}
            <div style={{ marginBottom:"22px" }}>
              {[
                { t:"Handcrafted Indian", italic:false, d:"0.18s" },
                { t:"Décor & Gifting",   italic:true,  d:"0.3s"  },
                { t:"for Global Buyers", italic:false, d:"0.42s" },
              ].map(({ t, italic, d }) => (
                <span key={t} className="hs-ln">
                  <span
                    className={`hs-lni${entered?" in":""}`}
                    style={{
                      fontFamily:"'Cormorant Garamond',serif",
                      fontSize:"clamp(2.5rem,5.2vw,4.6rem)",
                      fontWeight:300,
                      fontStyle: italic ? "italic" : "normal",
                      lineHeight:1.08,
                      color: italic ? "#d4a444" : "#fdfaf5",
                      letterSpacing:"-0.01em",
                      transitionDelay: d,
                    }}
                  >{t}</span>
                </span>
              ))}
            </div>

            {/* gold rule */}
            <div className={`hs-fu${entered?" in":""}`} style={{ transitionDelay:"0.5s", marginBottom:"16px" }}>
              <div style={{ width:"40px",height:"1px",background:"linear-gradient(90deg,#a8722a,#d4a444)" }}/>
            </div>

            {/* description */}
            <div className={`hs-fu${entered?" in":""}`} style={{ transitionDelay:"0.57s", marginBottom:"32px" }}>
              <p style={{
                fontFamily:"'Jost',sans-serif", fontSize:"clamp(0.77rem,1.2vw,0.88rem)",
                fontWeight:300, lineHeight:1.9, letterSpacing:"0.02em",
                color:"rgba(253,250,245,0.54)", maxWidth:"400px",
              }}>
                Premium wooden coasters, trays, candle holders &amp; décor pieces —
                crafted by skilled Indian artisans, ready for global retail and gifting.
              </p>
            </div>

            {/* ctas */}
            <div
              className={`hs-fu${entered?" in":""}`}
              style={{ transitionDelay:"0.66s", marginBottom:"36px", display:"flex", alignItems:"center", gap:"28px", flexWrap:"wrap" }}
            >
              <Link href="/products/coasters" className="hs-btn"><span>Explore Products</span></Link>
              <Link href="/catalogue"  className="hs-ghost">Get a Quote <span className="hs-arr"/></Link>
            </div>

            {/* usps */}
            <div
              className={`hs-fu${entered?" in":""}`}
              style={{ transitionDelay:"0.78s", display:"flex", alignItems:"center", gap:"20px", flexWrap:"wrap" }}
            >
              {["Handmade Quality","Custom Orders","Worldwide Shipping","Bulk Pricing"].map((q) => (
                <span key={q} className="hs-usp"><span className="hs-dot"/>{q}</span>
              ))}
            </div>

          </div>
        </div>

        {/* ── slide controls — right, vertically centered ── */}
        <div style={{
          position:"absolute", right:"clamp(16px,3vw,40px)", top:"50%",
          transform:"translateY(-50%)",
          zIndex:20, display:"flex", flexDirection:"column", alignItems:"flex-end", gap:"12px",
        }}>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"0.9rem", color:"rgba(253,250,245,0.65)", letterSpacing:"0.06em", marginBottom:"4px" }}>
            0{current+1}
            <span style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.56rem", color:"rgba(253,250,245,0.22)", marginLeft:"4px" }}>/ 0{slides.length}</span>
          </div>
          {slides.map((_,i) => (
            <button key={i} onClick={() => goTo(i)} style={{ background:"none",border:"none",cursor:"pointer",padding:"4px 0",display:"block" }}>
              <div style={{
                width: i===current ? "40px" : "18px",
                height:"1px", background:"rgba(255,255,255,0.12)",
                position:"relative", overflow:"hidden",
                transition:"width 0.3s ease",
              }}>
                <div style={{
                  position:"absolute", top:0, left:0, bottom:0,
                  width: i===current ? `${progress}%` : i<current ? "100%" : "0%",
                  background:"linear-gradient(90deg,#a8722a,#d4a444)",
                  transition: i===current ? "none" : "width 0.4s ease",
                }}/>
              </div>
            </button>
          ))}
        </div>

        {/* ── scroll indicator ── */}
        <div style={{
          position:"absolute", bottom:"28px", left:"50%",
          transform:"translateX(-50%)", zIndex:20,
          display:"flex", flexDirection:"column", alignItems:"center", gap:"7px",
        }}>
          <div className="hs-scrl" style={{ width:"1px",height:"38px",background:"linear-gradient(to bottom,rgba(168,114,42,0.7),transparent)" }}/>
          <span style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.44rem", letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(253,250,245,0.22)" }}>Scroll</span>
        </div>

      </div>
    </>
  );
}