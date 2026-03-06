'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AboutHero() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        .ah { font-family: 'Jost', sans-serif; }

        /* line reveal */
        .ah-ln  { overflow: hidden; display: block; }
        .ah-lni {
          display: block;
          transform: translateY(108%);
          transition: transform 1.05s cubic-bezier(0.16,1,0.3,1);
        }
        .ah-lni.in { transform: translateY(0); }

        /* fade up */
        .ah-fu {
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .ah-fu.in { opacity: 1; transform: translateY(0); }

        /* primary btn */
        .ah-btn {
          font-family: 'Jost', sans-serif;
          font-size: 0.63rem; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #fdfaf5;
          border: 1px solid rgba(253,250,245,0.28);
          padding: 14px 36px;
          text-decoration: none;
          display: inline-flex; align-items: center; gap: 12px;
          position: relative; overflow: hidden;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(4px);
          transition: border-color 0.35s, gap 0.3s;
        }
        .ah-btn::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, #9a6618, #d4a444);
          transform: translateX(-101%);
          transition: transform 0.45s cubic-bezier(0.76,0,0.24,1);
        }
        .ah-btn:hover::before { transform: translateX(0); }
        .ah-btn:hover { border-color: rgba(212,164,68,0.5); gap: 18px; }
        .ah-btn > * { position: relative; z-index: 1; }

        /* ghost btn */
        .ah-ghost {
          font-family: 'Jost', sans-serif;
          font-size: 0.63rem; font-weight: 400;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: rgba(253,250,245,0.45);
          text-decoration: none;
          display: inline-flex; align-items: center; gap: 10px;
          transition: color 0.25s, gap 0.3s;
        }
        .ah-ghost:hover { color: rgba(253,250,245,0.85); gap: 16px; }
        .ah-arr {
          width: 20px; height: 1px; background: currentColor;
          position: relative; flex-shrink: 0; transition: width 0.3s;
        }
        .ah-arr::after {
          content: ''; position: absolute; right: 0; top: 50%;
          transform: translateY(-50%) rotate(45deg);
          width: 4px; height: 4px;
          border-right: 1px solid currentColor;
          border-top: 1px solid currentColor;
        }
        .ah-ghost:hover .ah-arr { width: 30px; }

        /* scroll */
        @keyframes ah-scrl {
          0%   { transform: scaleY(0); transform-origin: top; opacity:0; }
          25%  { opacity: 1; }
          50%  { transform: scaleY(1); transform-origin: top; }
          51%  { transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity:0; }
        }
        .ah-scrl { animation: ah-scrl 2.4s ease-in-out infinite; }

        /* slow video zoom */
        @keyframes ah-zoom {
          from { transform: scale(1); }
          to   { transform: scale(1.07); }
        }
        .ah-vid { animation: ah-zoom 14s ease-in-out infinite alternate; }
      `}</style>

      <section
        className="ah"
        style={{ position:'relative', width:'100%', height:'100vh', minHeight:'580px', overflow:'hidden' }}
      >
        {/* VIDEO */}
        <video
          autoPlay muted loop playsInline
          className="ah-vid"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0 }}
        >
          <source src="/Video/about-section.mp4" type="video/mp4" />
        </video>

        {/* OVERLAYS */}
        <div style={{ position:'absolute', inset:0, zIndex:1, background:'linear-gradient(to top, rgba(8,4,1,0.88) 0%, rgba(8,4,1,0.48) 40%, rgba(8,4,1,0.15) 70%, transparent 100%)' }}/>
        <div style={{ position:'absolute', inset:0, zIndex:1, background:'linear-gradient(to right, rgba(8,4,1,0.6) 0%, transparent 65%)' }}/>
        <div style={{ position:'absolute', inset:0, zIndex:1, background:'rgba(28,12,2,0.2)' }}/>

        {/* CONTENT — bottom left, clears navbar */}
        <div style={{
          position:'absolute', inset:0, zIndex:10,
          display:'flex', flexDirection:'column', justifyContent:'flex-end',
          padding:`0 clamp(24px,6vw,96px) clamp(52px,7vh,88px)`,
        }}>
          <div style={{ maxWidth:'560px' }}>

            {/* eyebrow */}
            <div
              className={`ah-fu${entered?' in':''}`}
              style={{ transitionDelay:'0.05s', marginBottom:'20px', display:'flex', alignItems:'center', gap:'12px' }}
            >
              <div style={{ width:'26px', height:'1px', background:'#a8722a', flexShrink:0 }}/>
              <span style={{
                fontFamily:"'Jost',sans-serif",
                fontSize:'0.57rem', fontWeight:600,
                letterSpacing:'0.22em', textTransform:'uppercase',
                color:'#a8722a',
              }}>Our Story</span>
            </div>

            {/* headline */}
            <div style={{ marginBottom:'26px' }}>
              <span className="ah-ln">
                <span className={`ah-lni${entered?' in':''}`} style={{
                  fontFamily:"'Cormorant Garamond',serif",
                  fontSize:'clamp(2.6rem,5.5vw,4.8rem)',
                  fontWeight:300, lineHeight:1.07,
                  color:'#fdfaf5', letterSpacing:'-0.01em',
                  transitionDelay:'0.18s',
                }}>Crafted in India</span>
              </span>
              <span className="ah-ln">
                <span className={`ah-lni${entered?' in':''}`} style={{
                  fontFamily:"'Cormorant Garamond',serif",
                  fontSize:'clamp(2.6rem,5.5vw,4.8rem)',
                  fontWeight:300, fontStyle:'italic',
                  lineHeight:1.07,
                  color:'#d4a444', letterSpacing:'-0.01em',
                  transitionDelay:'0.3s',
                }}>Designed for the World</span>
              </span>
            </div>

            {/* rule + desc */}
            <div className={`ah-fu${entered?' in':''}`} style={{ transitionDelay:'0.5s', marginBottom:'36px' }}>
              <div style={{ width:'38px', height:'1px', background:'linear-gradient(90deg,#a8722a,#d4a444)', marginBottom:'16px' }}/>
              <p style={{
                fontFamily:"'Jost',sans-serif",
                fontSize:'clamp(0.77rem,1.2vw,0.88rem)',
                fontWeight:300, lineHeight:1.9,
                color:'rgba(253,250,245,0.52)',
                letterSpacing:'0.02em', maxWidth:'400px',
              }}>
                We bridge the gap between India's timeless artisan heritage
                and the global demand for authentic, beautifully crafted décor.
              </p>
            </div>

            {/* CTAs */}
            <div
              className={`ah-fu${entered?' in':''}`}
              style={{ transitionDelay:'0.65s', display:'flex', alignItems:'center', gap:'28px', flexWrap:'wrap' }}
            >
              <Link href="/products/coasters" className="ah-btn">
                <span>Explore Collection</span>
                <svg width="13" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link href="/contact" className="ah-ghost">
                Work With Us <span className="ah-arr"/>
              </Link>
            </div>

          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <div style={{
          position:'absolute', bottom:'28px', left:'50%',
          transform:'translateX(-50%)', zIndex:20,
          display:'flex', flexDirection:'column', alignItems:'center', gap:'7px',
        }}>
          <div className="ah-scrl" style={{ width:'1px', height:'38px', background:'linear-gradient(to bottom, rgba(168,114,42,0.65), transparent)' }}/>
          <span style={{
            fontFamily:"'Jost',sans-serif",
            fontSize:'0.44rem', letterSpacing:'0.24em',
            textTransform:'uppercase', color:'rgba(253,250,245,0.2)',
          }}>Scroll</span>
        </div>

      </section>
    </>
  );
}