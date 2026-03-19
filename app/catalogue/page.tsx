'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function CataloguePage() {
  const [vals, setVals] = useState({ name: '', email: '', phone: '', message: '' });
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [entered, setEntered] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!parallaxRef.current) return;
      parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.18}px) scale(1.08)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setVals(p => ({ ...p, [e.target.name]: e.target.value }));

 const submit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await fetch('/api/catalogue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vals),  // 'vals' — tere component ka variable naam
    });
    if (res.ok) setSubmitted(true);
  } catch {
    alert('Something went wrong. Please try again.');
  }
};

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --bg:#f5ede0; --parch:#ede0cc; --card:#fdfaf5;
          --ink:#0d0803; --gold:#a8722a; --gold2:#d4a444;
          --muted:rgba(13,8,3,.42); --bdr:rgba(168,114,42,.14);
        }
        .pg *{box-sizing:border-box;margin:0;padding:0;}
        .pg{font-family:'DM Sans',sans-serif;background:var(--bg);overflow-x:hidden;}

        .grain{position:fixed;inset:0;pointer-events:none;z-index:1;opacity:.026;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size:160px;}

        .rise{opacity:0;transform:translateY(30px);transition:opacity .95s ease,transform .95s ease;}
        .rise.in{opacity:1;transform:translateY(0);}
        .ln{overflow:hidden;display:block;}
        .lni{display:block;transform:translateY(115%);transition:transform 1.15s cubic-bezier(.16,1,.3,1);}
        .lni.in{transform:translateY(0);}

        /* HERO */
        .hero{position:relative;height:100vh;min-height:600px;display:grid;grid-template-columns:1fr 1fr;overflow:hidden;}

        .h-img{position:relative;overflow:hidden;}
        .h-img-inner{position:absolute;inset:0;will-change:transform;}
        .h-img-ov{
          position:absolute;inset:0;z-index:2;pointer-events:none;
          background:linear-gradient(to right,rgba(245,237,224,.6) 0%,transparent 52%),
                      linear-gradient(to top,rgba(13,8,3,.2) 0%,transparent 55%);
        }

        .h-text{
          position:relative;z-index:10;background:var(--bg);
          display:flex;flex-direction:column;justify-content:flex-end;
          padding:0 clamp(36px,5.5vw,88px) clamp(52px,6vh,80px);
          padding-top:110px;
        }
        .h-text::before{
          content:'';position:absolute;inset:0;pointer-events:none;z-index:0;
          background:repeating-linear-gradient(0deg,transparent,transparent 71px,rgba(168,114,42,.04) 71px,rgba(168,114,42,.04) 72px);
        }
        .h-text>*{position:relative;z-index:1;}

        .eyebrow{display:flex;align-items:center;gap:12px;margin-bottom:22px;}
        .eyebrow-bar{width:30px;height:1px;background:var(--gold);flex-shrink:0;}
        .eyebrow-txt{font-size:.53rem;font-weight:600;letter-spacing:.26em;text-transform:uppercase;color:var(--gold);}

        .h1{font-family:'Cormorant Garamond',serif;font-size:clamp(3rem,7.2vw,7.5rem);
          font-weight:300;line-height:.96;letter-spacing:-.03em;color:var(--ink);
          margin-bottom:clamp(22px,2.8vh,36px);}

        .hero-body{font-size:clamp(.76rem,1vw,.86rem);font-weight:300;line-height:1.95;
          color:var(--muted);max-width:360px;margin-bottom:32px;}

        .tags{display:flex;flex-wrap:wrap;gap:7px;}
        .tag{font-size:.5rem;font-weight:500;letter-spacing:.14em;text-transform:uppercase;
          border:1px solid var(--bdr);color:rgba(13,8,3,.42);
          padding:5px 11px;background:rgba(168,114,42,.04);
          transition:background .25s,border-color .25s,color .25s;}
        .tag:hover{background:rgba(168,114,42,.1);border-color:rgba(168,114,42,.3);color:var(--ink);}

        .scroll-hint{position:absolute;bottom:36px;right:clamp(36px,5.5vw,88px);
          z-index:11;display:flex;align-items:center;gap:10px;writing-mode:vertical-rl;}
        @keyframes pulse{0%,100%{opacity:.25}50%{opacity:.7}}
        .scroll-hint span{font-size:.42rem;font-weight:500;letter-spacing:.22em;text-transform:uppercase;
          color:rgba(13,8,3,.28);animation:pulse 2.6s ease-in-out infinite;}
        .scroll-line{width:1px;height:44px;background:linear-gradient(to bottom,transparent,rgba(168,114,42,.4));}

        .stat-badge{
          position:absolute;bottom:clamp(32px,4vh,56px);right:clamp(24px,3vw,44px);
          z-index:12;background:rgba(253,250,245,.92);backdrop-filter:blur(12px);
          border:1px solid var(--bdr);padding:20px 28px;
          display:flex;flex-direction:column;gap:16px;min-width:150px;
        }
        .stat-row{display:flex;flex-direction:column;gap:2px;}
        .stat-num{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:300;line-height:1;color:var(--ink);}
        .stat-lbl{font-size:.48rem;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);}
        .stat-div{height:1px;background:var(--bdr);}

        /* FORM SECTION */
        .fs{background:var(--parch);padding:clamp(72px,9vw,120px) clamp(28px,6vw,96px);position:relative;}
        .fs-wm{position:absolute;right:clamp(20px,4vw,60px);top:50%;transform:translateY(-50%);
          font-family:'Cormorant Garamond',serif;font-size:clamp(100px,18vw,260px);font-weight:300;line-height:1;
          color:rgba(168,114,42,.055);pointer-events:none;user-select:none;letter-spacing:-.04em;}

        .fs-inner{max-width:1240px;margin:0 auto;position:relative;z-index:2;
          display:grid;grid-template-columns:1fr 1.1fr;gap:clamp(40px,6vw,96px);align-items:start;}

        .info-panel{position:sticky;top:40px;}
        .section-tag{font-size:.5rem;font-weight:600;letter-spacing:.26em;text-transform:uppercase;color:var(--gold);display:block;margin-bottom:20px;}
        .info-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,3.8vw,3.5rem);
          font-weight:400;line-height:1.08;color:var(--ink);margin-bottom:18px;letter-spacing:-.02em;}
        .info-title em{font-style:italic;color:#7a4d0e;}
        .info-sub{font-size:.77rem;font-weight:300;line-height:1.9;color:var(--muted);margin-bottom:36px;max-width:310px;}

        .perk{display:flex;align-items:flex-start;gap:14px;padding:15px 0;border-top:1px solid var(--bdr);}
        .perk:last-child{border-bottom:1px solid var(--bdr);}
        .perk-dot{width:5px;height:5px;border-radius:50%;background:var(--gold);flex-shrink:0;margin-top:7px;}
        .perk-t{font-size:.74rem;font-weight:500;color:var(--ink);margin-bottom:2px;}
        .perk-d{font-size:.67rem;font-weight:300;color:var(--muted);line-height:1.65;}

        .email-link{display:inline-flex;align-items:center;gap:10px;margin-top:28px;
          font-size:.76rem;font-weight:400;color:#7a4d0e;text-decoration:none;transition:gap .25s;}
        .email-link:hover{gap:14px;}

        /* FORM CARD */
        .fcard{background:var(--card);border:1px solid var(--bdr);
          padding:clamp(36px,4vw,56px) clamp(28px,3.5vw,48px);position:relative;overflow:hidden;}
        @keyframes shimmer{from{transform:translateX(-110%) skewX(-12deg)}to{transform:translateX(220%) skewX(-12deg)}}
        .fcard::after{content:'';position:absolute;top:0;left:0;width:45%;height:100%;
          background:linear-gradient(90deg,transparent,rgba(212,164,68,.07),transparent);
          animation:shimmer 2s ease .5s 1;pointer-events:none;z-index:0;}
        .fcard>*{position:relative;z-index:1;}
        .fcard-top{position:absolute;top:0;left:0;right:0;height:2.5px;
          background:linear-gradient(90deg,var(--gold),var(--gold2),rgba(168,114,42,.15));}
        .fcard-left{position:absolute;top:0;left:0;width:1px;height:100%;
          background:linear-gradient(to bottom,var(--gold),transparent 60%);}

        .field{position:relative;padding-top:22px;margin-bottom:28px;}
        .fl{position:absolute;left:0;top:29px;font-size:.79rem;font-weight:300;color:rgba(13,8,3,.3);
          pointer-events:none;transform-origin:left top;white-space:nowrap;
          transition:transform .32s cubic-bezier(.25,.46,.45,.94),color .25s;}
        .fl.up{transform:translateY(-21px) scale(.63);color:var(--gold);font-weight:500;letter-spacing:.15em;text-transform:uppercase;}
        .fl.idle{transform:translateY(-21px) scale(.63);color:rgba(13,8,3,.26);font-weight:500;letter-spacing:.15em;text-transform:uppercase;}
        .fi{width:100%;background:transparent;border:none;border-bottom:1px solid rgba(168,114,42,.16);
          padding:6px 0 11px;font-family:'DM Sans',sans-serif;font-size:.85rem;font-weight:400;color:var(--ink);
          outline:none;border-radius:0;-webkit-appearance:none;transition:border-color .25s;}
        .fi:focus{border-bottom-color:transparent;}
        textarea.fi{resize:none;line-height:1.8;}
        .fbar{position:absolute;bottom:0;left:0;height:1.5px;width:0;
          background:linear-gradient(90deg,var(--gold),var(--gold2));
          transition:width .45s cubic-bezier(.25,.46,.45,.94);pointer-events:none;}
        .fbar.on{width:100%;}

        .sbtn{width:100%;margin-top:32px;font-family:'DM Sans',sans-serif;
          font-size:.58rem;font-weight:600;letter-spacing:.24em;text-transform:uppercase;
          color:var(--card);background:var(--ink);border:1px solid var(--ink);
          padding:18px 24px;cursor:pointer;position:relative;overflow:hidden;
          display:flex;align-items:center;justify-content:center;gap:14px;
          transition:transform .22s,box-shadow .3s,border-color .3s;}
        .sbtn::before{content:'';position:absolute;inset:0;
          background:linear-gradient(110deg,#7a4d0e 0%,var(--gold) 55%,var(--gold2) 100%);
          transform:translateX(-102%);transition:transform .52s cubic-bezier(.76,0,.24,1);}
        .sbtn:hover::before{transform:translateX(0);}
        .sbtn:hover{border-color:var(--gold);transform:translateY(-3px);box-shadow:0 14px 40px rgba(168,114,42,.22);}
        .sbtn:active{transform:translateY(-1px);}
        .sbtn>*{position:relative;z-index:1;}
        .sarrow{overflow:hidden;width:0;transition:width .28s;display:inline-flex;align-items:center;}
        .sbtn:hover .sarrow{width:20px;}

        @keyframes pop{0%{transform:scale(.45) rotate(-12deg);opacity:0}65%{transform:scale(1.14) rotate(3deg)}100%{transform:scale(1) rotate(0);opacity:1}}
        .s-ring{width:76px;height:76px;border-radius:50%;border:1px solid rgba(168,114,42,.3);
          display:flex;align-items:center;justify-content:center;font-size:1.9rem;
          margin:0 auto 24px;animation:pop .65s cubic-bezier(.34,1.56,.64,1) both;color:var(--gold);}

        @media(max-width:960px){
          .hero{grid-template-columns:1fr;height:auto;}
          .h-img{height:56vw;min-height:300px;}
          .h-text{padding-top:130px;padding-bottom:52px;justify-content:flex-start;}
          .stat-badge{display:none;}
          .fs-inner{grid-template-columns:1fr;}
          .info-panel{position:static;}
          .scroll-hint{display:none;}
        }
      `}</style>
        <Navbar />


      <div className="pg">
        <div className="grain" />

        {/* ── HERO ── */}
        <section className="hero">
          <div className="h-text">
            <div className={`eyebrow rise${entered ? ' in' : ''}`} style={{ transitionDelay: '.04s' }}>
              <div className="eyebrow-bar" /><span className="eyebrow-txt">Trade Enquiry</span>
            </div>

            <h1 className="h1">
              {([['Request', false], ['Our', true], ['Catalogue.', false]] as [string, boolean][]).map(([line, italic], i) => (
                <span className="ln" key={i}>
                  <span className={`lni${entered ? ' in' : ''}`}
                    style={{ transitionDelay: `${.1 + i * .13}s`, fontStyle: italic ? 'italic' : 'normal', color: italic ? '#7a4d0e' : 'var(--ink)' }}>
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p className={`hero-body rise${entered ? ' in' : ''}`} style={{ transitionDelay: '.5s' }}>
              India's finest handcrafted décor for global buyers &amp; interior designers. Share your details — receive full pricing within 24 hours.
            </p>

            <div className={`tags rise${entered ? ' in' : ''}`} style={{ transitionDelay: '.62s' }}>
              {['200+ SKUs', 'MOQ Flexible', 'Custom Branding', 'Worldwide Shipping'].map(t => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
          </div>

          <div className="h-img">
            <div ref={parallaxRef} className="h-img-inner">
              <Image
                src="/images/catalogue.jpg"
                alt="Livora Crafts — Handcrafted décor"
                fill priority
                style={{ objectFit: 'cover', objectPosition: 'center 60%' }}
                sizes="50vw"
              />
            </div>
            <div className="h-img-ov" />

            <div className={`stat-badge rise${entered ? ' in' : ''}`} style={{ transitionDelay: '.7s' }}>
              {[['200+', 'Products'], ['24h', 'Response'], ['MOQ', 'Flexible']].map(([n, l], i) => (
                <React.Fragment key={n}>
                  {i > 0 && <div className="stat-div" />}
                  <div className="stat-row">
                    <span className="stat-num">{n}</span>
                    <span className="stat-lbl">{l}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className={`scroll-hint rise${entered ? ' in' : ''}`} style={{ transitionDelay: '1s' }}>
            <div className="scroll-line" /><span>Scroll</span>
          </div>
        </section>

        {/* ── FORM ── */}
        <section className="fs">
          <div className="fs-wm" aria-hidden="true">W</div>
          <div className="fs-inner">

            {/* left */}
            <div className="info-panel">
              <span className="section-tag">Wholesale Access</span>
              <h2 className="info-title">Get the full<br /><em>pricing sheet</em></h2>
              <p className="info-sub">Fill your details — we send you the catalogue, tiered pricing &amp; MOQ breakdown personally. No bots, no spam.</p>

              {[
                { t: 'Full Product Catalogue', d: '200+ handcrafted SKUs — décor, tableware, gifting & office accessories.' },
                { t: 'Wholesale Pricing',      d: 'Bulk-tiered pricing with MOQ details per category.' },
                { t: 'Custom Branding',        d: 'White-label & custom packaging for your retail brand.' },
                { t: 'Export Support',         d: 'Shipping & compliance guidance for key markets worldwide.' },
              ].map(({ t, d }) => (
                <div className="perk" key={t}>
                  <div className="perk-dot" />
                  <div><div className="perk-t">{t}</div><div className="perk-d">{d}</div></div>
                </div>
              ))}

              <a href="mailto:harsh@livoracrafts.com" className="email-link">
                <svg width="14" height="11" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="14" rx="2" /><polyline points="2,4 12,11 22,4" />
                </svg>
                harsh@livoracrafts.com
              </a>
            </div>

            {/* right — form card */}
            <div className="fcard">
              <div className="fcard-top" /><div className="fcard-left" />

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '72px 12px' }}>
                  <div className="s-ring">✦</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.1rem', fontWeight: 400, color: 'var(--ink)', marginBottom: '10px' }}>
                    Request Received
                  </h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '.78rem', fontWeight: 300, lineHeight: 1.85, color: 'var(--muted)', maxWidth: '260px', margin: '0 auto 28px' }}>
                    We'll send your catalogue and wholesale pricing within 24 hours.
                  </p>
                  <Link href="/products/coasters" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '.55rem', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    Browse Products
                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
                      <path d="M1 4.5h12M8 1l4.5 3.5L8 8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: '44px' }}>
                    <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.7rem', fontWeight: 400, color: 'var(--ink)', letterSpacing: '-.01em', marginBottom: '6px' }}>
                      Your details
                    </h3>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '.69rem', fontWeight: 300, color: 'rgba(13,8,3,.3)', lineHeight: 1.65 }}>
                      We respond personally within 24 hours — no auto-replies.
                    </p>
                  </div>

                  <form onSubmit={submit}>
                    {[
                      { name: 'name',  label: 'Your Name',        type: 'text'  },
                      { name: 'email', label: 'Business Email',   type: 'email' },
                      { name: 'phone', label: 'Phone / WhatsApp', type: 'tel'   },
                    ].map(({ name, label, type }) => (
                      <div className="field" key={name}>
                        <label className={`fl${focused === name ? ' up' : (vals as any)[name] ? ' idle' : ''}`}>{label}</label>
                        <input type={type} name={name} value={(vals as any)[name]} onChange={handle}
                          onFocus={() => setFocused(name)} onBlur={() => setFocused(null)}
                          required className="fi" />
                        <div className={`fbar${focused === name ? ' on' : ''}`} />
                      </div>
                    ))}

                    <div className="field">
                      <label className={`fl${focused === 'message' ? ' up' : vals.message ? ' idle' : ''}`}>What are you looking for? (optional)</label>
                      <textarea name="message" rows={3} value={vals.message} onChange={handle}
                        onFocus={() => setFocused('message')} onBlur={() => setFocused(null)} className="fi" />
                      <div className={`fbar${focused === 'message' ? ' on' : ''}`} />
                    </div>

                    <button type="submit" className="sbtn">
                      <span>Send Request</span>
                      <span className="sarrow">
                        <svg width="17" height="10" viewBox="0 0 17 10" fill="none">
                          <path d="M1 5h16M10 1l6 4L10 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}