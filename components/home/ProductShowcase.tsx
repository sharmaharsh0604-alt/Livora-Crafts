'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const cards = [
  {
    img: '/images/diverse-range.png',
    alt: 'Diverse Product Range',
    num: '01',
    tag: 'Collections',
    title: 'Diverse Product Range',
    text: 'Discover unique categories like wooden décor, brass inlay, candle holders, and more — each crafted to elevate your space.',
  },
  {
    img: '/images/artisian.png',
    alt: 'Artisan Quality Goods',
    num: '02',
    tag: 'Craftsmanship',
    title: 'Artisan Quality Goods',
    text: 'Each product tells a story — showcasing the rich heritage and generational skill of master Indian artisans.',
  },
  {
    img: '/images/curated.png',
    alt: 'Curated Collections',
    num: '03',
    tag: 'Curation',
    title: 'Curated Collections',
    text: 'Hand-selected pieces that resonate with global aesthetics — perfect for interior designers, retailers, and conscious buyers.',
  },
];

export default function ProductShowcase() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        .ps-root { font-family: 'Jost', sans-serif; }

        /* reveal */
        .ps-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.85s ease, transform 0.85s ease;
        }
        .ps-reveal.in { opacity: 1; transform: translateY(0); }

        /* ── Card ── */
        .ps-card {
          display: flex;
          flex-direction: column;
          background: #fdfaf5;
          border: 1px solid rgba(168,114,42,0.12);
          overflow: hidden;
          transition: border-color 0.32s, box-shadow 0.32s, transform 0.32s;
          cursor: default;
        }
        .ps-card:hover {
          border-color: rgba(168,114,42,0.26);
          box-shadow: 0 24px 60px rgba(70,35,5,0.1);
          transform: translateY(-6px);
        }

        /* image area */
        .ps-card-img {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
          flex-shrink: 0;
        }
        .ps-card-img::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(
            to top,
            rgba(6,3,1,0.45) 0%,
            transparent 55%
          );
          z-index: 1;
          pointer-events: none;
          transition: opacity 0.35s;
        }
        .ps-card-img img {
          transition: transform 7s cubic-bezier(0.25,0.46,0.45,0.94) !important;
        }
        .ps-card:hover .ps-card-img img {
          transform: scale(1.06) !important;
        }

        /* tag pill on image */
        .ps-tag {
          position: absolute;
          top: 16px; left: 18px;
          z-index: 2;
          font-family: 'Jost', sans-serif;
          font-size: 0.52rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(212,164,68,0.9);
          border: 1px solid rgba(212,164,68,0.24);
          background: rgba(8,4,1,0.42);
          backdrop-filter: blur(8px);
          padding: 5px 12px;
        }

        /* gold top-line on hover */
        .ps-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 0; height: 2px;
          background: linear-gradient(90deg, #a8722a, #d4a444);
          transition: width 0.45s cubic-bezier(0.25,0.46,0.45,0.94);
          z-index: 3;
        }
        .ps-card:hover::before { width: 100%; }

        /* text area */
        .ps-card-body {
          padding: 28px 30px 32px;
          display: flex;
          flex-direction: column;
          flex: 1;
          position: relative;
        }

        .ps-card-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.8rem;
          font-weight: 300;
          color: rgba(168,114,42,0.1);
          line-height: 1;
          margin-bottom: 14px;
          transition: color 0.32s;
          user-select: none;
        }
        .ps-card:hover .ps-card-num { color: rgba(168,114,42,0.2); }

        /* thin gold rule */
        .ps-card-rule {
          width: 0;
          height: 1px;
          background: linear-gradient(90deg,#a8722a,#d4a444);
          margin-bottom: 16px;
          transition: width 0.45s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .ps-card:hover .ps-card-rule { width: 36px; }

        .ps-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-weight: 400;
          color: #1c1208;
          margin-bottom: 12px;
          line-height: 1.2;
          transition: color 0.25s;
        }
        .ps-card:hover .ps-card-title { color: #7a4e10; }

        .ps-card-text {
          font-family: 'Jost', sans-serif;
          font-size: 0.8rem;
          font-weight: 300;
          line-height: 1.88;
          color: rgba(28,18,8,0.55);
          flex: 1;
        }

        /* bottom link */
        .ps-card-link {
          margin-top: 22px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Jost', sans-serif;
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(168,114,42,0.55);
          text-decoration: none;
          transition: color 0.25s, gap 0.3s;
        }
        .ps-card:hover .ps-card-link { color: #a8722a; gap: 12px; }
        .ps-link-arrow {
          width: 18px; height: 1px;
          background: currentColor;
          position: relative; flex-shrink: 0;
          transition: width 0.3s;
        }
        .ps-link-arrow::after {
          content:''; position:absolute; right:0; top:50%;
          transform:translateY(-50%) rotate(45deg);
          width:4px; height:4px;
          border-right:1px solid currentColor;
          border-top:1px solid currentColor;
        }
        .ps-card:hover .ps-link-arrow { width: 26px; }
      `}</style>

      <section
        ref={ref}
        className="ps-root"
        style={{ background: '#ede8df', padding: '108px 0' }}
      >
        <div style={{ maxWidth:'1320px', margin:'0 auto', padding:'0 clamp(24px,5vw,80px)' }}>

          {/* ── HEADER ── */}
          <div
            className={`ps-reveal${visible ? ' in' : ''}`}
            style={{
              display:'flex', alignItems:'flex-end',
              justifyContent:'space-between', flexWrap:'wrap',
              gap:'24px', marginBottom:'64px',
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
                  What We Offer
                </span>
              </div>

              <h2 style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontSize:'clamp(2rem,4vw,3.4rem)',
                fontWeight:300, lineHeight:1.1,
                color:'#1c1208', letterSpacing:'-0.01em',
              }}>
                Handmade Indian Crafts<br />
                <em style={{ fontStyle:'italic', color:'#9a6218' }}>for the Global Market</em>
              </h2>
            </div>

            {/* view all link */}
            <a
              href="/products"
              style={{
                fontFamily:"'Jost',sans-serif",
                fontSize:'0.62rem', fontWeight:500,
                letterSpacing:'0.16em', textTransform:'uppercase',
                color:'rgba(28,18,8,0.45)',
                textDecoration:'none',
                display:'flex', alignItems:'center', gap:'10px',
                transition:'color 0.25s, gap 0.3s',
                flexShrink: 0,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color='#a8722a'; (e.currentTarget as HTMLElement).style.gap='16px'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color='rgba(28,18,8,0.45)'; (e.currentTarget as HTMLElement).style.gap='10px'; }}
            >
              View All Products
              <span style={{ width:'22px', height:'1px', background:'currentColor', position:'relative', flexShrink:0 }} />
            </a>
          </div>

          {/* ── CARDS GRID ── */}
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fit, minmax(300px,1fr))',
            gap:'20px',
          }}>
            {cards.map(({ img, alt, num, tag, title, text }, i) => (
              <div
                key={num}
                className={`ps-card ps-reveal${visible ? ' in' : ''}`}
                style={{ position:'relative', transitionDelay:`${0.1 + i * 0.13}s` }}
              >
                {/* image */}
                <div className="ps-card-img">
                  <Image
                    src={img}
                    alt={alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                  <span className="ps-tag">{tag}</span>
                </div>

                {/* body */}
                <div className="ps-card-body">
                  <div className="ps-card-num">{num}</div>
                  <div className="ps-card-rule" />
                  <div className="ps-card-title">{title}</div>
                  <p className="ps-card-text">{text}</p>
                  
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}