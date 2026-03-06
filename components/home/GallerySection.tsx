'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const images = [
  { src: '/images/Our Gallery.png',  label: 'Collection Overview' },
  { src: '/images/gallery-1.jpg',    label: 'Wooden Tableware' },
  { src: '/images/gallery-2.jpg',    label: 'Serving Platters' },
  { src: '/images/gallery-3.jpg',    label: 'Storage & Décor' },
  { src: '/images/gallery-4.jpg',    label: 'Artisan Detail' },
  { src: '/images/gallery-5.avif',   label: 'Curated Pieces' },
];

export default function GallerySection() {
  const [active, setActive]   = useState(0);
  const [fading, setFading]   = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  /* scroll reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const select = (i: number) => {
    if (i === active) return;
    setFading(true);
    setTimeout(() => { setActive(i); setFading(false); }, 320);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        .gs-root { font-family: 'Jost', sans-serif; }

        .gs-reveal {
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.85s ease, transform 0.85s ease;
        }
        .gs-reveal.in { opacity: 1; transform: translateY(0); }

        /* main image */
        .gs-main {
          position: relative;
          overflow: hidden;
          border-radius: 4px;
        }
        .gs-main-img {
          transition: opacity 0.32s ease, transform 7s cubic-bezier(0.25,0.46,0.45,0.94) !important;
        }
        .gs-main-img.fade { opacity: 0; }
        .gs-main-img.loaded { transform: scale(1.03); }

        /* overlay gradients */
        .gs-main-ov {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: linear-gradient(
            to top,
            rgba(6,3,1,0.52) 0%,
            rgba(6,3,1,0.12) 40%,
            transparent 70%
          );
        }
        .gs-main-ov2 {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: linear-gradient(
            to right,
            rgba(6,3,1,0.28) 0%,
            transparent 50%
          );
        }

        /* label chip */
        .gs-label-chip {
          position: absolute;
          bottom: 28px; left: 32px;
          z-index: 2;
          display: flex; align-items: center; gap: 12px;
        }
        .gs-label-rule {
          width: 28px; height: 1px;
          background: linear-gradient(90deg, #a8722a, #d4a444);
          flex-shrink: 0;
        }

        /* counter badge */
        .gs-counter {
          position: absolute;
          top: 24px; right: 28px;
          z-index: 2;
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.88rem;
          font-weight: 300;
          color: rgba(253,250,245,0.6);
          letter-spacing: 0.08em;
          background: rgba(8,4,1,0.4);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(212,164,68,0.18);
          padding: 7px 14px;
        }

        /* thumbnails */
        .gs-thumb {
          position: relative;
          overflow: hidden;
          border-radius: 3px;
          cursor: pointer;
          border: 1px solid rgba(168,114,42,0.1);
          transition: border-color 0.28s, transform 0.28s, box-shadow 0.28s;
          flex-shrink: 0;
        }
        .gs-thumb::before {
          content: '';
          position: absolute; inset: 0; z-index: 1;
          background: rgba(8,4,1,0.35);
          transition: opacity 0.28s;
        }
        .gs-thumb.active::before { opacity: 0; }
        .gs-thumb:not(.active):hover::before { opacity: 0.1; }

        .gs-thumb img {
          transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94) !important;
        }
        .gs-thumb:hover img,
        .gs-thumb.active img { transform: scale(1.07) !important; }

        /* active state */
        .gs-thumb.active {
          border-color: #a8722a;
          box-shadow: 0 0 0 1px #a8722a, 0 8px 24px rgba(168,114,42,0.22);
        }

        /* thumb label */
        .gs-thumb-label {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          z-index: 2;
          background: linear-gradient(to top, rgba(6,3,1,0.7), transparent);
          padding: 20px 10px 8px;
          font-family: 'Jost', sans-serif;
          font-size: 0.52rem;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(253,250,245,0.7);
          text-align: center;
          opacity: 0;
          transition: opacity 0.25s;
        }
        .gs-thumb:hover .gs-thumb-label,
        .gs-thumb.active .gs-thumb-label { opacity: 1; }

        /* gold active dot */
        .gs-thumb-dot {
          position: absolute;
          top: 8px; right: 8px;
          z-index: 3;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #d4a444;
          opacity: 0;
          transform: scale(0);
          transition: opacity 0.25s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .gs-thumb.active .gs-thumb-dot {
          opacity: 1; transform: scale(1);
        }
      `}</style>

      <section
        ref={ref}
        className="gs-root"
        style={{ background: '#f9f4ec', padding: '108px 0' }}
      >
        <div style={{ maxWidth:'1320px', margin:'0 auto', padding:'0 clamp(24px,5vw,80px)' }}>

          {/* ── HEADER ── */}
          <div
            className={`gs-reveal${visible ? ' in' : ''}`}
            style={{
              display:'flex', alignItems:'flex-end',
              justifyContent:'space-between', flexWrap:'wrap',
              gap:'24px', marginBottom:'56px',
            }}
          >
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'18px' }}>
                <div style={{ width:'28px', height:'1px', background:'#a8722a', flexShrink:0 }} />
                <span style={{
                  fontFamily:"'Jost',sans-serif",
                  fontSize:'0.58rem', fontWeight:600,
                  letterSpacing:'0.22em', textTransform:'uppercase',
                  color:'#a8722a',
                }}>
                  Visual Stories
                </span>
              </div>
              <h2 style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontSize:'clamp(2rem,4vw,3.4rem)',
                fontWeight:300, lineHeight:1.1,
                color:'#1c1208', letterSpacing:'-0.01em',
              }}>
                Our Gallery<br />
                <em style={{ fontStyle:'italic', color:'#9a6218' }}>of Handcrafted Work</em>
              </h2>
            </div>

            {/* decorative marks */}
            <div style={{ display:'flex', alignItems:'center', gap:'10px', opacity:0.28 }}>
              <div style={{ width:'56px', height:'1px', background:'#a8722a' }} />
              <div style={{ width:'4px', height:'4px', borderRadius:'50%', background:'#a8722a' }} />
              <div style={{ width:'18px', height:'1px', background:'#a8722a' }} />
            </div>
          </div>

          {/* ── MAIN IMAGE ── */}
          <div
            className={`gs-reveal${visible ? ' in' : ''}`}
            style={{ marginBottom:'16px', transitionDelay:'0.1s' }}
          >
            <div
              className="gs-main"
              style={{ height:'clamp(300px,45vw,560px)' }}
            >
              <Image
                src={images[active].src}
                alt={images[active].label}
                fill
                className={`gs-main-img object-cover${fading ? ' fade' : ''}`}
                priority
                sizes="(max-width:768px) 100vw, 1320px"
              />
              <div className="gs-main-ov" />
              <div className="gs-main-ov2" />

              {/* label */}
              <div className="gs-label-chip">
                <div className="gs-label-rule" />
                <span style={{
                  fontFamily:"'Cormorant Garamond',serif",
                  fontStyle:'italic', fontSize:'1rem', fontWeight:300,
                  color:'rgba(253,250,245,0.72)', letterSpacing:'0.03em',
                }}>
                  {images[active].label}
                </span>
              </div>

              {/* counter */}
              <div className="gs-counter">
                0{active + 1}
                <span style={{ color:'rgba(253,250,245,0.3)', margin:'0 4px' }}>/</span>
                0{images.length}
              </div>
            </div>
          </div>

          {/* ── THUMBNAILS ── */}
          <div
            className={`gs-reveal${visible ? ' in' : ''}`}
            style={{
              display:'grid',
              gridTemplateColumns:`repeat(${images.length}, 1fr)`,
              gap:'8px',
              transitionDelay:'0.22s',
            }}
          >
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => select(i)}
                className={`gs-thumb${active === i ? ' active' : ''}`}
                style={{
                  background:'none', padding:0,
                  aspectRatio:'1',
                }}
                aria-label={img.label}
              >
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
                <span className="gs-thumb-label">{img.label}</span>
                <span className="gs-thumb-dot" />
              </button>
            ))}
          </div>

          {/* ── BOTTOM CAPTION ── */}
          <div
            className={`gs-reveal${visible ? ' in' : ''}`}
            style={{
              marginTop:'32px',
              display:'flex', alignItems:'center',
              justifyContent:'space-between', flexWrap:'wrap',
              gap:'16px',
              transitionDelay:'0.32s',
            }}
          >
            <p style={{
              fontFamily:"'Jost',sans-serif",
              fontSize:'0.75rem', fontWeight:300,
              lineHeight:1.7, letterSpacing:'0.02em',
              color:'rgba(28,18,8,0.45)',
              maxWidth:'480px',
            }}>
              Explore our exquisite collection of handcrafted Indian products —
              each piece a testament to centuries of artisan skill and tradition.
            </p>

            <a
              href="/products/coasters"
              style={{
                fontFamily:"'Jost',sans-serif",
                fontSize:'0.62rem', fontWeight:500,
                letterSpacing:'0.16em', textTransform:'uppercase',
                color:'#a8722a', textDecoration:'none',
                display:'flex', alignItems:'center', gap:'10px',
                transition:'gap 0.3s, opacity 0.25s',
                flexShrink:0,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.gap='16px'; (e.currentTarget as HTMLElement).style.opacity='0.7'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.gap='10px'; (e.currentTarget as HTMLElement).style.opacity='1'; }}
            >
              View All Products
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

        </div>
      </section>
    </>
  );
}