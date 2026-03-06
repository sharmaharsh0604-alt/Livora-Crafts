'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const pillars = [
  {
    num: '01',
    title: 'Unique Handcrafted Treasures',
    text: 'We connect global buyers with exquisite Indian craftsmanship — every piece selected for its authenticity, quality, and the story it carries from artisan hands to your space.',
  },
  {
    num: '02',
    title: 'Rich Artisan Collections',
    text: "Our range showcases India's diverse heritage — from carved wood to hand-painted pottery — offering products that bring culture, creativity, and warmth into every home.",
  },
  {
    num: '03',
    title: 'Ethical & Direct Sourcing',
    text: 'We work directly with skilled craftspeople across India, ensuring fair practices, consistent quality, and products that honour centuries of tradition.',
  },
];

export default function CraftingSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        .cs-root { font-family: 'Jost', sans-serif; }

        .cs-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.85s ease, transform 0.85s ease;
        }
        .cs-reveal.in { opacity: 1; transform: translateY(0); }

        /* ── Card ── */
        .cs-card {
          position: relative;
          padding: 40px 36px 36px;
          background: #fdfaf5;
          border: 1px solid rgba(168,114,42,0.13);
          transition: border-color 0.32s, box-shadow 0.32s, transform 0.32s;
          overflow: hidden;
          cursor: default;
        }
        .cs-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 0; height: 2px;
          background: linear-gradient(90deg, #a8722a, #d4a444);
          transition: width 0.45s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .cs-card:hover {
          border-color: rgba(168,114,42,0.25);
          box-shadow: 0 20px 52px rgba(70,35,5,0.09);
          transform: translateY(-6px);
        }
        .cs-card:hover::after { width: 100%; }

        .cs-ghost-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3.6rem;
          font-weight: 300;
          color: rgba(168,114,42,0.1);
          line-height: 1;
          margin-bottom: 20px;
          transition: color 0.35s;
          user-select: none;
        }
        .cs-card:hover .cs-ghost-num { color: rgba(168,114,42,0.2); }

        .cs-card-title {
          font-family: 'Jost', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: #1c1208;
          margin-bottom: 14px;
        }

        .cs-card-text {
          font-family: 'Jost', sans-serif;
          font-size: 0.82rem;
          font-weight: 300;
          line-height: 1.88;
          color: rgba(28,18,8,0.58);
        }

        /* ── Image ── */
        .cs-img-outer {
          position: relative;
          overflow: hidden;
          border-radius: 4px;
        }
        .cs-img-outer::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(
            to top,
            rgba(6,3,1,0.6) 0%,
            rgba(6,3,1,0.18) 42%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 1;
        }
        .cs-img-inner {
          transition: transform 8s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .cs-img-outer:hover .cs-img-inner {
          transform: scale(1.05) !important;
        }

        .cs-img-caption {
          position: absolute;
          bottom: 28px; left: 36px;
          z-index: 2;
          display: flex; align-items: center; gap: 14px;
        }
        .cs-img-rule {
          width: 30px; height: 1px;
          background: linear-gradient(90deg,#a8722a,#d4a444);
          flex-shrink: 0;
        }
        .cs-img-caption-text {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1rem;
          font-weight: 300;
          color: rgba(253,250,245,0.7);
          letter-spacing: 0.03em;
        }

        .cs-img-badge {
          position: absolute;
          top: 24px; right: 28px;
          z-index: 2;
          border: 1px solid rgba(212,164,68,0.28);
          background: rgba(8,4,1,0.48);
          backdrop-filter: blur(10px);
          padding: 9px 16px;
        }
        .cs-img-badge-text {
          font-family: 'Jost', sans-serif;
          font-size: 0.52rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(212,164,68,0.82);
        }
      `}</style>

      <section
        ref={ref}
        className="cs-root"
        style={{ background: '#f5f0e8', padding: '108px 0 108px' }}
      >
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' }}>

          {/* ── HEADER ── */}
          <div
            className={`cs-reveal${visible ? ' in' : ''}`}
            style={{
              display: 'flex', alignItems: 'flex-end',
              justifyContent: 'space-between', flexWrap: 'wrap',
              gap: '24px', marginBottom: '72px',
            }}
          >
            <div>
              {/* eyebrow */}
              <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'18px' }}>
                <div style={{ width:'28px', height:'1px', background:'#a8722a', flexShrink:0 }} />
                <span style={{
                  fontFamily:"'Jost',sans-serif",
                  fontSize:'0.58rem', fontWeight:600,
                  letterSpacing:'0.22em', textTransform:'uppercase',
                  color:'#a8722a',
                }}>
                  Our Philosophy
                </span>
              </div>

              <h2 style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontSize:'clamp(2rem,4vw,3.4rem)',
                fontWeight:300, lineHeight:1.1,
                color:'#1c1208', letterSpacing:'-0.01em',
              }}>
                Crafting India's Artistry<br />
                <em style={{ fontStyle:'italic', color:'#9a6218' }}>for the World</em>
              </h2>
            </div>

            {/* decorative marks */}
            <div style={{ display:'flex', alignItems:'center', gap:'10px', opacity:0.3 }}>
              <div style={{ width:'56px', height:'1px', background:'#a8722a' }} />
              <div style={{ width:'4px', height:'4px', borderRadius:'50%', background:'#a8722a' }} />
              <div style={{ width:'18px', height:'1px', background:'#a8722a' }} />
            </div>
          </div>

          {/* ── CARDS — proper gap, NOT touching image ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))',
              gap: '20px',          // ← breathing room between cards
              marginBottom: '56px', // ← clear separation from image below
            }}
          >
            {pillars.map(({ num, title, text }, i) => (
              <div
                key={num}
                className={`cs-card cs-reveal${visible ? ' in' : ''}`}
                style={{ transitionDelay: `${0.08 + i * 0.13}s` }}
              >
                <div className="cs-ghost-num">{num}</div>
                <div className="cs-card-title">{title}</div>
                <p className="cs-card-text">{text}</p>
              </div>
            ))}
          </div>

          {/* ── IMAGE — separated with its own block ── */}
          <div
            className={`cs-img-outer cs-reveal${visible ? ' in' : ''}`}
            style={{
              height: 'clamp(280px,38vw,480px)',
              transitionDelay: '0.42s',
            }}
          >
            <Image
              src="/images/craft-section.avif"
              alt="Indian Handicrafts Collection"
              fill
              className="cs-img-inner object-cover"
            />

            <div className="cs-img-caption">
              <div className="cs-img-rule" />
              <span className="cs-img-caption-text">
                Handcrafted with soul — made in India
              </span>
            </div>

            <div className="cs-img-badge">
              <span className="cs-img-badge-text">Premium · Handmade · Exported</span>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}