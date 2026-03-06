'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const FIELDS = [
  { name: 'name',    label: 'Full Name',      type: 'text',  placeholder: 'John Smith',       half: true  },
  { name: 'email',   label: 'Email Address',  type: 'email', placeholder: 'john@company.com', half: true  },
  { name: 'phone',   label: 'Phone Number',   type: 'tel',   placeholder: '+1 234 567 8900',  half: false },
  { name: 'message', label: 'Requirements',   type: 'area',  placeholder: 'Product interest, quantity, customization needs, target market…', half: false },
];

export default function CatalogueSection() {
  const [formData,  setFormData]  = useState({ name:'', email:'', phone:'', message:'' });
  const [focused,   setFocused]   = useState<string|null>(null);
  const [filled,    setFilled]    = useState<Record<string,boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [visible,   setVisible]   = useState(false);
  const [btnHover,  setBtnHover]  = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.06 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    setFilled(p => ({ ...p, [name]: value.length > 0 }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await fetch('/api/catalogue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) setSubmitted(true);
    else alert('Something went wrong. Please try again.');
  } catch {
    alert('Something went wrong. Please try again.');
  }
};

  const isActive = (name: string) => focused === name || filled[name];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        .c4 * { box-sizing: border-box; }
        .c4   { font-family: 'Jost', sans-serif; }

        /* ── Scroll reveal ── */
        .c4-rev { opacity:0; transform:translateY(30px); transition:opacity .85s ease,transform .85s ease; }
        .c4-rev.in { opacity:1; transform:translateY(0); }

        /* ── Card ── */
        .c4-card {
          background: #fdfaf5;
          border: 1px solid rgba(168,114,42,0.15);
          padding: 52px 48px;
          position: relative; overflow: hidden;
        }
        /* shimmer sweep on load */
        @keyframes c4-shimmer {
          0%   { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(220%)  skewX(-12deg); }
        }
        .c4-card::after {
          content: '';
          position: absolute; top:0; left:0;
          width: 40%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(212,164,68,0.06), transparent);
          animation: c4-shimmer 2.2s ease 0.5s 1 forwards;
          pointer-events: none; z-index: 0;
        }
        /* gold top line */
        .c4-card::before {
          content: '';
          position: absolute; top:0; left:0;
          width:100%; height:2px;
          background: linear-gradient(90deg, #a8722a, #d4a444, #a8722a);
          z-index:2;
        }

        /* ── Floating label field ── */
        .c4-fwrap {
          position: relative;
          padding-top: 20px; /* space for floated label */
        }

        .c4-flabel {
          position: absolute;
          left: 0;
          top: 28px; /* resting inside input */
          font-family: 'Jost', sans-serif;
          font-size: 0.82rem;
          font-weight: 300;
          color: rgba(28,18,8,0.38);
          pointer-events: none;
          transform-origin: left top;
          transition:
            transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94),
            color 0.3s ease,
            font-size 0.3s ease;
          z-index: 1;
        }
        /* floated up state */
        .c4-flabel.up {
          transform: translateY(-20px) scale(0.72);
          font-size: 0.82rem; /* scale handles it */
          color: #a8722a;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .c4-flabel.up-idle {
          transform: translateY(-20px) scale(0.72);
          font-size: 0.82rem;
          color: rgba(28,18,8,0.38);
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        /* input / textarea */
        .c4-inp {
          width: 100%;
          background: transparent;
          border-top: none; border-left: none; border-right: none;
          border-bottom: 1px solid rgba(168,114,42,0.22);
          padding: 10px 0 11px;
          font-family: 'Jost', sans-serif;
          font-size: 0.88rem; font-weight: 300;
          color: #1c1208;
          outline: none; border-radius: 0;
          -webkit-appearance: none;
          transition: border-color 0.3s;
          position: relative; z-index: 1;
          background: transparent;
        }
        .c4-inp:focus { border-bottom-color: rgba(168,114,42,0.5); }
        textarea.c4-inp { resize: none; line-height: 1.8; }

        /* animated underline */
        .c4-uline {
          position: absolute; bottom: 0; left: 0;
          height: 1.5px; width: 0;
          background: linear-gradient(90deg, #a8722a, #d4a444);
          transition: width 0.45s cubic-bezier(0.25,0.46,0.45,0.94);
          z-index: 2;
        }
        .c4-uline.on { width: 100%; }

        /* field entry pulse */
        @keyframes c4-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(168,114,42,0.15); }
          60%  { box-shadow: 0 0 0 6px rgba(168,114,42,0); }
          100% { box-shadow: 0 0 0 0 rgba(168,114,42,0); }
        }
        .c4-fwrap.focused-pulse { animation: c4-pulse 0.5s ease; }

        /* ── Submit button ── */
        .c4-btn {
          width: 100%;
          font-family: 'Jost', sans-serif;
          font-size: 0.65rem; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #fdfaf5;
          background: #1c1208;
          border: 1px solid #1c1208;
          padding: 17px 32px;
          cursor: pointer;
          position: relative; overflow: hidden;
          transition: border-color 0.35s, transform 0.2s, box-shadow 0.3s;
        }
        /* gold fill sweep */
        .c4-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #9a6618 0%, #d4a444 100%);
          transform: translateX(-101%);
          transition: transform 0.46s cubic-bezier(0.76,0,0.24,1);
        }
        .c4-btn:hover::before { transform: translateX(0); }
        .c4-btn:hover {
          border-color: #a8722a;
          box-shadow: 0 8px 28px rgba(168,114,42,0.28);
          transform: translateY(-2px);
        }
        .c4-btn:active { transform: translateY(0) scale(0.998); }
        .c4-btn span { position: relative; z-index: 1; display:flex; align-items:center; justify-content:center; gap:10px; }

        /* arrow in button */
        .c4-btn-arrow {
          display: inline-block;
          width: 0;
          overflow: hidden;
          transition: width 0.35s ease;
        }
        .c4-btn:hover .c4-btn-arrow { width: 18px; }

        /* ── Success ── */
        @keyframes c4-pop {
          0%   { transform: scale(0.6); opacity:0; }
          70%  { transform: scale(1.1); }
          100% { transform: scale(1);   opacity:1; }
        }
        .c4-success {
          display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          text-align:center; padding:72px 24px;
        }
        .c4-success-ring {
          width:72px; height:72px;
          border:1px solid rgba(168,114,42,0.35);
          border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          margin-bottom:28px;
          font-size:1.8rem; color:#a8722a;
          animation: c4-pop 0.55s cubic-bezier(0.34,1.56,0.64,1) both;
        }

        /* ── Image ── */
        .c4-imgwrap { position:relative; overflow:hidden; border-radius:3px; flex-shrink:0; }
        .c4-imgwrap img { transition: transform 8s cubic-bezier(0.25,0.46,0.45,0.94) !important; }
        .c4-imgwrap:hover img { transform: scale(1.05) !important; }
        .c4-ov1 {
          position:absolute; inset:0; pointer-events:none; z-index:1;
          background: linear-gradient(to top, rgba(6,3,1,0.65) 0%, rgba(6,3,1,0.12) 50%, transparent 78%);
        }
        .c4-ov2 {
          position:absolute; inset:0; pointer-events:none; z-index:1;
          background: linear-gradient(to right, rgba(6,3,1,0.25) 0%, transparent 55%);
        }

        /* ── Trust ── */
        .c4-trust {
          display:flex; align-items:flex-start; gap:16px;
          padding:18px 0;
          border-bottom:1px solid rgba(168,114,42,0.1);
          transition: background 0.25s, padding-left 0.25s;
        }
        .c4-trust:first-child { padding-top:0; }
        .c4-trust:last-child  { border-bottom:none; padding-bottom:0; }
        .c4-trust:hover       { padding-left:6px; }
        .c4-trust-icon {
          width:40px; height:40px; flex-shrink:0;
          border:1px solid rgba(168,114,42,0.2);
          background:rgba(168,114,42,0.06);
          display:flex; align-items:center; justify-content:center;
          font-size:1.05rem;
          transition: background 0.25s, border-color 0.25s;
        }
        .c4-trust:hover .c4-trust-icon {
          background:rgba(168,114,42,0.12);
          border-color:rgba(168,114,42,0.35);
        }

        @media (max-width:960px) {
          .c4-grid     { grid-template-columns:1fr !important; }
          .c4-namerow  { grid-template-columns:1fr !important; }
          .c4-card     { padding:36px 24px !important; }
        }
      `}</style>

      <section
        ref={ref}
        className="c4"
        style={{ background:'#f2ead8', padding:'108px 0' }}
      >
        <div style={{ maxWidth:'1320px', margin:'0 auto', padding:'0 clamp(24px,5vw,80px)' }}>

          {/* ── HEADER ── */}
          <div className={`c4-rev${visible?' in':''}`} style={{ marginBottom:'72px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px' }}>
              <div style={{ width:'28px', height:'1px', background:'#a8722a', flexShrink:0 }}/>
              <span style={{ fontFamily:"'Jost',sans-serif", fontSize:'0.58rem', fontWeight:600, letterSpacing:'0.22em', textTransform:'uppercase', color:'#a8722a' }}>
                Work With Us
              </span>
            </div>
            <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:'24px' }}>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2rem,4vw,3.4rem)', fontWeight:300, lineHeight:1.1, color:'#1c1208', letterSpacing:'-0.01em' }}>
                Get Our Latest Catalogue<br/>
                <em style={{ fontStyle:'italic', color:'#9a6218' }}>&amp; Wholesale Pricing</em>
              </h2>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:'0.82rem', fontWeight:300, lineHeight:1.85, color:'rgba(28,18,8,0.48)', maxWidth:'300px' }}>
                Share your details and we'll send our full product catalogue with wholesale pricing within 24 hours.
              </p>
            </div>
          </div>

          {/* ── MAIN GRID ── */}
          <div
            className="c4-grid"
            style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(24px,4vw,60px)', alignItems:'start' }}
          >

            {/* ── FORM CARD ── */}
            <div className={`c4-card c4-rev${visible?' in':''}`} style={{ transitionDelay:'0.1s' }}>
              {submitted ? (
                <div className="c4-success">
                  <div className="c4-success-ring">✦</div>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2rem', fontWeight:300, color:'#1c1208', marginBottom:'14px' }}>
                    Request Received
                  </h3>
                  <p style={{ fontFamily:"'Jost',sans-serif", fontSize:'0.8rem', fontWeight:300, lineHeight:1.8, color:'rgba(28,18,8,0.45)', maxWidth:'260px' }}>
                    We'll send your catalogue and pricing details within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ position:'relative', zIndex:1 }}>

                  {/* form heading */}
                  <div style={{ marginBottom:'40px' }}>
                    <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.55rem', fontWeight:400, color:'#1c1208', letterSpacing:'-0.01em', marginBottom:'8px' }}>
                      Send Your Request
                    </h3>
                    <p style={{ fontFamily:"'Jost',sans-serif", fontSize:'0.73rem', fontWeight:300, color:'rgba(28,18,8,0.4)', lineHeight:1.6 }}>
                      Fill in your details below — we'll respond within 24 hours.
                    </p>
                  </div>

                  {/* name + email — 2 col */}
                  <div className="c4-namerow" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'28px', marginBottom:'32px' }}>
                    {(['name','email'] as const).map(key => (
                      <div key={key}>
                        <div
                          className={`c4-fwrap${focused===key?' focused-pulse':''}`}
                          style={{ position:'relative', paddingTop:'20px' }}
                        >
                          <label
                            htmlFor={key}
                            className={`c4-flabel${isActive(key)?' up':''}`}
                          >
                            {key==='name'?'Full Name':'Email Address'}
                          </label>
                          <input
                            id={key} type={key==='email'?'email':'text'} name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            onFocus={() => setFocused(key)}
                            onBlur={() => setFocused(null)}
                            required
                            className="c4-inp"
                          />
                          <div className={`c4-uline${focused===key?' on':''}`}/>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* phone */}
                  <div style={{ marginBottom:'32px' }}>
                    <div className="c4-fwrap" style={{ position:'relative', paddingTop:'20px' }}>
                      <label htmlFor="phone" className={`c4-flabel${isActive('phone')?' up':''}`}>
                        Phone Number
                      </label>
                      <input
                        id="phone" type="tel" name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocused('phone')}
                        onBlur={() => setFocused(null)}
                        required
                        className="c4-inp"
                      />
                      <div className={`c4-uline${focused==='phone'?' on':''}`}/>
                    </div>
                  </div>

                  {/* requirements */}
                  <div style={{ marginBottom:'36px' }}>
                    <div className="c4-fwrap" style={{ position:'relative', paddingTop:'20px' }}>
                      <label htmlFor="message" className={`c4-flabel${isActive('message')?' up':''}`}>
                        Requirements
                      </label>
                      <textarea
                        id="message" name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused(null)}
                        rows={4}
                        required
                        className="c4-inp"
                      />
                      <div className={`c4-uline${focused==='message'?' on':''}`}/>
                    </div>
                  </div>

                  {/* submit */}
                  <button
                    type="submit"
                    className="c4-btn"
                    onMouseEnter={() => setBtnHover(true)}
                    onMouseLeave={() => setBtnHover(false)}
                  >
                    <span>
                      Request Catalogue &amp; Pricing
                      <span className="c4-btn-arrow">
                        <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                          <path d="M1 5h14M9 1l5 4-5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </span>
                  </button>

                  <p style={{ fontFamily:"'Jost',sans-serif", fontSize:'0.58rem', fontWeight:300, color:'rgba(28,18,8,0.28)', textAlign:'center', marginTop:'14px', letterSpacing:'0.06em' }}>
                    We respond within 24 hours — no spam, ever.
                  </p>
                </form>
              )}
            </div>

            {/* ── RIGHT: IMAGE + TRUST ── */}
            <div
              className={`c4-rev${visible?' in':''}`}
              style={{ transitionDelay:'0.2s', display:'flex', flexDirection:'column' }}
            >
              {/* image */}
              <div className="c4-imgwrap" style={{ height:'clamp(220px,26vw,340px)' }}>
                <Image
                  src="/images/request-image.avif"
                  alt="Indian handicrafts export collection"
                  fill className="object-cover"
                  sizes="(max-width:960px)100vw,600px"
                />
                <div className="c4-ov1"/><div className="c4-ov2"/>
                {/* caption */}
                <div style={{ position:'absolute', bottom:'20px', left:'22px', zIndex:2, display:'flex', alignItems:'center', gap:'12px' }}>
                  <div style={{ width:'22px', height:'1px', background:'linear-gradient(90deg,#a8722a,#d4a444)', flexShrink:0 }}/>
                  <span style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'0.88rem', fontWeight:300, color:'rgba(253,250,245,0.65)' }}>
                    Premium export quality, always
                  </span>
                </div>
              </div>

              {/* trust panel */}
              <div style={{
                background:'#fdfaf5', flex:1,
                borderLeft:'1px solid rgba(168,114,42,0.14)',
                borderRight:'1px solid rgba(168,114,42,0.14)',
                borderBottom:'1px solid rgba(168,114,42,0.14)',
                borderTop:'2px solid rgba(168,114,42,0.25)',
                padding:'26px 26px 22px',
              }}>
                <p style={{ fontFamily:"'Jost',sans-serif", fontSize:'0.55rem', fontWeight:600, letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(28,18,8,0.3)', marginBottom:'18px' }}>
                  What You'll Receive
                </p>
                {[
                  { icon:'📦', title:'Full Product Catalogue', text:'200+ handcrafted SKUs across décor, tableware, gifting & office accessories.' },
                  { icon:'💰', title:'Wholesale Pricing Sheet', text:'Tiered bulk pricing with MOQ details, clearly laid out for buyers.' },
                  { icon:'🎨', title:'Custom Branding Options', text:'White-label & custom packaging available for your retail brand.' },
                ].map(({ icon, title, text }) => (
                  <div key={title} className="c4-trust">
                    <div className="c4-trust-icon">{icon}</div>
                    <div>
                      <div style={{ fontFamily:"'Jost',sans-serif", fontSize:'0.74rem', fontWeight:500, color:'#1c1208', marginBottom:'4px', letterSpacing:'0.02em' }}>{title}</div>
                      <div style={{ fontFamily:"'Jost',sans-serif", fontSize:'0.7rem', fontWeight:300, lineHeight:1.7, color:'rgba(28,18,8,0.48)' }}>{text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}