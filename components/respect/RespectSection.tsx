'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

export default function RespectSection() {
  const [entered, setEntered] = useState(false);
  const [paraVis, setParaVis] = useState([false, false, false, false]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll('[data-para]');
    if (!items) return;
    const observers: IntersectionObserver[] = [];
    items.forEach((el, i) => {
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setParaVis(prev => { const n = [...prev]; n[i] = true; return n; });
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');

        .rsp * { box-sizing: border-box; margin: 0; padding: 0; }
        .rsp { font-family: 'Jost', sans-serif; background: #e8dcc8; }

        /* ── Line reveal ── */
        .rsp-ln  { overflow: hidden; display: block; }
        .rsp-lni {
          display: block;
          transform: translateY(108%);
          transition: transform 1.1s cubic-bezier(0.16,1,0.3,1);
        }
        .rsp-lni.in { transform: translateY(0); }

        /* ── Fade up ── */
        .rsp-fu {
          opacity: 0; transform: translateY(22px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .rsp-fu.in { opacity: 1; transform: translateY(0); }

        /* ── HERO ── */
        .rsp-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          overflow: hidden;
        }
        .rsp-hero-img { position: absolute; inset: 0; z-index: 0; }
        .rsp-hero-img img {
          object-fit: cover; width: 100%; height: 100%;
          transition: transform 14s cubic-bezier(0.25,0.46,0.45,0.94) !important;
        }
        .rsp-hero:hover .rsp-hero-img img { transform: scale(1.04) !important; }

        /* overlays */
        .rsp-ov1 {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(to top,
            rgba(8,4,1,0.96) 0%,
            rgba(8,4,1,0.6)  35%,
            rgba(8,4,1,0.25) 65%,
            rgba(8,4,1,0.1)  100%);
        }
        .rsp-ov2 {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(to right,
            rgba(8,4,1,0.55) 0%, transparent 70%);
        }
        .rsp-ov3 { position: absolute; inset: 0; z-index: 1; background: rgba(28,12,2,0.18); }

        .rsp-hero-content {
          position: relative; z-index: 10;
          padding: 0 clamp(28px,6vw,100px) clamp(60px,7vh,100px);
        }

        /* ── Big number ── */
        .rsp-bignumber {
          position: absolute;
          right: clamp(28px,6vw,100px);
          bottom: clamp(60px,7vh,100px);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(10rem,18vw,18rem);
          font-weight: 300;
          line-height: 1;
          color: rgba(168,114,42,0.07);
          z-index: 5;
          pointer-events: none;
          letter-spacing: -0.04em;
          user-select: none;
        }

        /* ── MANIFESTO SECTION ── */
        .rsp-manifesto {
          background: #f2ead8;
          padding: clamp(80px,10vw,140px) clamp(28px,6vw,100px);
          position: relative;
          overflow: hidden;
        }

        /* big ghost text behind */
        .rsp-ghost-text {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(8rem,16vw,20rem);
          font-weight: 300;
          font-style: italic;
          color: rgba(168,114,42,0.07);
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          z-index: 0;
          letter-spacing: -0.03em;
        }

        .rsp-manifesto-inner {
          position: relative; z-index: 1;
          max-width: 900px; margin: 0 auto; text-align: center;
        }

        /* ── TEXT BLOCKS SECTION ── */
        .rsp-text-section {
          background: #e8dcc8;
          padding: clamp(80px,10vw,120px) clamp(28px,6vw,100px);
        }

        .rsp-para-item {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: clamp(24px,4vw,56px);
          padding: clamp(32px,4vw,52px) 0;
          border-top: 1px solid rgba(168,114,42,0.15);
          align-items: start;
          max-width: 1100px;
          margin: 0 auto;
        }
        .rsp-para-item:last-child { border-bottom: 1px solid rgba(168,114,42,0.15); }

        .rsp-para-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.8rem; font-weight: 300;
          color: rgba(168,114,42,0.22);
          line-height: 1; padding-top: 4px;
          transition: color 0.3s;
        }
        .rsp-para-item:hover .rsp-para-num { color: rgba(168,114,42,0.45); }

        .rsp-para-body {}
        .rsp-para-label {
          font-family: 'Jost', sans-serif;
          font-size: 0.55rem; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #a8722a; margin-bottom: 12px; display: block;
        }
        .rsp-para-text {
          font-family: 'Jost', sans-serif;
          font-size: clamp(0.88rem,1.3vw,1rem);
          font-weight: 400; line-height: 1.9;
          color: #2a1e10;
        }
        .rsp-para-text strong {
          font-weight: 600; color: #0e0904;
        }

        /* ── CLOSING QUOTE ── */
        .rsp-closing {
          background: #d8cdb8;
          padding: clamp(80px,10vw,120px) clamp(28px,6vw,100px);
          text-align: center;
        }

        /* responsive */
        @media (max-width: 640px) {
          .rsp-para-item { grid-template-columns: 40px 1fr; gap: 16px; }
          .rsp-para-num  { font-size: 1.8rem; }
        }
      `}</style>

      <div className="rsp">

        {/* ══════════════════════════════════════
            ZONE 1 — HERO: full-screen image
        ══════════════════════════════════════ */}
        <section className="rsp-hero" style={{ paddingTop: '100px' }}>

          <div className="rsp-hero-img">
            <Image
              src="/images/respect-3.png"
              alt="Indian Artisan Craft"
              fill priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="rsp-ov1"/><div className="rsp-ov2"/><div className="rsp-ov3"/>

          {/* big watermark number */}
          <div className="rsp-bignumber">01</div>

          {/* content */}
          <div className="rsp-hero-content">

            {/* eyebrow */}
            <div
              className={`rsp-fu${entered ? ' in' : ''}`}
              style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px', transitionDelay:'0.05s' }}
            >
              <div style={{ width:'28px', height:'1px', background:'#a8722a', flexShrink:0 }}/>
              <span style={{ fontFamily:"'Jost',sans-serif", fontSize:'0.57rem', fontWeight:600, letterSpacing:'0.22em', textTransform:'uppercase', color:'#a8722a' }}>
                Our Commitment
              </span>
            </div>

            {/* headline */}
            <div style={{ marginBottom:'28px' }}>
              <span className="rsp-ln">
                <span className={`rsp-lni${entered ? ' in' : ''}`} style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(3rem,7vw,6.5rem)', fontWeight:300, lineHeight:1.0, color:'#fdfaf5', letterSpacing:'-0.02em', transitionDelay:'0.15s' }}>
                  Made With
                </span>
              </span>
              <span className="rsp-ln">
                <span className={`rsp-lni${entered ? ' in' : ''}`} style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(3rem,7vw,6.5rem)', fontWeight:300, fontStyle:'italic', lineHeight:1.0, color:'#d4a444', letterSpacing:'-0.02em', transitionDelay:'0.28s' }}>
                  Respect.
                </span>
              </span>
            </div>

            {/* sub line */}
            <div
              className={`rsp-fu${entered ? ' in' : ''}`}
              style={{ transitionDelay:'0.5s', display:'flex', alignItems:'center', gap:'16px', maxWidth:'480px' }}
            >
              <div style={{ width:'36px', height:'1px', background:'linear-gradient(90deg,#a8722a,#d4a444)', flexShrink:0 }}/>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:'clamp(0.78rem,1.2vw,0.9rem)', fontWeight:300, lineHeight:1.8, color:'rgba(253,250,245,0.52)', letterSpacing:'0.02em' }}>
                Real artisans. Honest sourcing. Long-term relationships.
              </p>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════
            ZONE 2 — MANIFESTO: dark, centered
        ══════════════════════════════════════ */}
        <section className="rsp-manifesto">
          <div className="rsp-ghost-text">Respect</div>
          <div className="rsp-manifesto-inner">

            <div
              className={`rsp-fu${entered ? ' in' : ''}`}
              style={{ transitionDelay:'0.1s', display:'flex', alignItems:'center', justifyContent:'center', gap:'16px', marginBottom:'36px' }}
            >
              <div style={{ width:'40px', height:'1px', background:'rgba(168,114,42,0.3)' }}/>
              <span style={{ fontFamily:"'Jost',sans-serif", fontSize:'0.55rem', fontWeight:600, letterSpacing:'0.22em', textTransform:'uppercase', color:'#a8722a' }}>
                When we say ethically crafted
              </span>
              <div style={{ width:'40px', height:'1px', background:'rgba(168,114,42,0.3)' }}/>
            </div>

            <div style={{ marginBottom:'36px' }}>
              {[
                { text: 'We mean real artisans —', delay: '0.2s', light: false },
                { text: 'not mass production.',     delay: '0.34s', light: true  },
              ].map(({ text, delay, light }) => (
                <span key={text} className="rsp-ln">
                  <span
                    className={`rsp-lni${entered ? ' in' : ''}`}
                    style={{
                      fontFamily:"'Cormorant Garamond',serif",
                      fontSize:'clamp(1.8rem,4vw,3.6rem)',
                      fontWeight:300, lineHeight:1.15,
                      color: light ? 'rgba(28,18,8,0.35)' : '#0e0904',
                      letterSpacing:'-0.01em',
                      transitionDelay: delay,
                      display:'block',
                    }}
                  >{text}</span>
                </span>
              ))}
            </div>

            <div
              className={`rsp-fu${entered ? ' in' : ''}`}
              style={{ transitionDelay:'0.55s', width:'1px', height:'60px', background:'linear-gradient(to bottom,rgba(168,114,42,0.5),transparent)', margin:'0 auto' }}
            />

          </div>
        </section>

        {/* ══════════════════════════════════════
            ZONE 3 — PARAGRAPHS: warm bg, numbered
        ══════════════════════════════════════ */}
        <section className="rsp-text-section">
          <div ref={containerRef}>

          {[
            {
              label: 'The People',
              text: <>Every product we offer is created by <strong>skilled artisans and small workshops across India</strong>. These are people who work with dedication, patience, and pride — carrying forward traditions passed down through generations.</>,
            },
            {
              label: 'Our Approach',
              text: <>We don't believe in pushing for the lowest cost at the expense of quality or fairness. Instead, we focus on <strong>long-term relationships built on trust, consistency, and mutual growth</strong>.</>,
            },
            {
              label: 'Our Promise',
              text: <>We are constantly learning and improving, but one thing remains unchanged — <strong>our commitment to respecting the people behind every product</strong> we deliver.</>,
            },
            {
              label: 'What It Means',
              text: <>This is what working with purpose means to us. This is what <strong>Made With Respect</strong> stands for — fair partnerships, honest sourcing, and meaningful craftsmanship.</>,
            },
          ].map(({ label, text }, i) => (
            <div
              key={label}
              data-para="true"
              className={`rsp-para-item rsp-fu${paraVis[i] ? ' in' : ''}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="rsp-para-num">0{i + 1}</div>
              <div className="rsp-para-body">
                <span className="rsp-para-label">{label}</span>
                <p className="rsp-para-text">{text}</p>
              </div>
            </div>
          ))}
          </div>

        </section>

        {/* ══════════════════════════════════════
            ZONE 4 — CLOSING QUOTE
        ══════════════════════════════════════ */}
        <section className="rsp-closing">
          <div style={{ maxWidth:'700px', margin:'0 auto' }}>

            <div
              className={`rsp-fu${entered ? ' in' : ''}`}
              style={{ transitionDelay:'0.1s', display:'flex', alignItems:'center', justifyContent:'center', gap:'16px', marginBottom:'40px' }}
            >
              <div style={{ flex:1, height:'1px', background:'rgba(168,114,42,0.18)' }}/>
              <div style={{ width:'4px', height:'4px', borderRadius:'50%', background:'rgba(168,114,42,0.5)', flexShrink:0 }}/>
              <div style={{ flex:1, height:'1px', background:'rgba(168,114,42,0.18)' }}/>
            </div>

            <div style={{ marginBottom:'32px' }}>
              {[
                { t:'"Fair partnerships.', d:'0.2s', em:false },
                { t:'Honest sourcing.', d:'0.32s', em:false },
                { t:'Meaningful craftsmanship."', d:'0.44s', em:true },
              ].map(({ t, d, em }) => (
                <span key={t} className="rsp-ln">
                  <span
                    className={`rsp-lni${entered ? ' in' : ''}`}
                    style={{
                      fontFamily:"'Cormorant Garamond',serif",
                      fontSize:'clamp(1.5rem,3.5vw,2.8rem)',
                      fontWeight:300,
                      fontStyle: em ? 'italic' : 'normal',
                      lineHeight:1.25,
                      color: em ? '#7a4d0e' : '#1c1208',
                      letterSpacing:'-0.01em',
                      transitionDelay: d,
                      display:'block',
                    }}
                  >{t}</span>
                </span>
              ))}
            </div>

            <div
              className={`rsp-fu${entered ? ' in' : ''}`}
              style={{ transitionDelay:'0.6s' }}
            >
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:'0.72rem', fontWeight:300, letterSpacing:'0.14em', color:'rgba(28,18,8,0.35)', textTransform:'uppercase' }}>
                — Livora Crafts
              </p>
            </div>

          </div>
        </section>

      </div>
    </>
  );
}