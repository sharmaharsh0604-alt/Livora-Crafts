import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();

  const collections = [
    { label: 'Wooden Tableware',   href: '/products/coasters'        },
    { label: 'Home Décor',         href: '/products/candle-holders'  },
    { label: 'Office Accessories', href: '/products/desk-organizers' },
    { label: 'Storage & Utility',  href: '/products/storage-boxes'   },
  ];

  const company = [
    { label: 'About Us',    href: '/about'   },
    { label: 'Craft Story', href: '/respect' },
    { label: 'Product',     href: '/product/coasters' },
    { label: 'Blog',        href: '/blog'    },
  ];


  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        .ft2 * { box-sizing: border-box; }
        .ft2   { font-family: 'Jost', sans-serif; }

        /* ── Section label (col heading) ── */
        .ft2-col-head {
          font-family: 'Jost', sans-serif;
          font-size: 0.56rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #a8722a;
          margin-bottom: 24px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(168,114,42,0.16);
          display: block;
        }

        /* ── Nav links ── */
        .ft2-link {
          display: flex;
          align-items: center;
          font-family: 'Jost', sans-serif;
          font-size: 0.8rem;
          font-weight: 300;
          color: rgba(253,250,245,0.38);
          text-decoration: none;
          padding: 6px 0;
          transition: color 0.22s, padding-left 0.28s;
          position: relative;
        }
        .ft2-link::before {
          content: '';
          display: inline-block;
          width: 0; height: 1px;
          background: linear-gradient(90deg,#a8722a,#d4a444);
          margin-right: 0;
          flex-shrink: 0;
          transition: width 0.28s cubic-bezier(0.25,0.46,0.45,0.94),
                      margin-right 0.28s;
        }
        .ft2-link:hover {
          color: rgba(253,250,245,0.85);
          padding-left: 4px;
        }
        .ft2-link:hover::before {
          width: 12px;
          margin-right: 8px;
        }

        /* ── Social icon ── */
        .ft2-social {
          width: 38px; height: 38px;
          border: 1px solid rgba(253,250,245,0.08);
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
          transition: border-color 0.26s, background 0.26s, transform 0.26s;
          flex-shrink: 0;
        }
        .ft2-social:hover {
          border-color: rgba(168,114,42,0.5);
          background: rgba(168,114,42,0.08);
          transform: translateY(-3px);
        }
        .ft2-social svg { transition: stroke 0.26s; }
        .ft2-social:hover svg { stroke: #d4a444; }

        /* ── Email link ── */
        .ft2-email {
          font-family: 'Jost', sans-serif;
          font-size: 0.82rem;
          font-weight: 400;
          color: rgba(253,250,245,0.65);
          text-decoration: none;
          transition: color 0.22s;
          display: block;
        }
        .ft2-email:hover { color: #d4a444; }

        /* ── Bottom bar links ── */
        .ft2-btm {
          font-family: 'Jost', sans-serif;
          font-size: 0.58rem;
          font-weight: 300;
          letter-spacing: 0.1em;
          color: rgba(253,250,245,0.2);
          text-decoration: none;
          transition: color 0.22s;
          white-space: nowrap;
        }
        .ft2-btm:hover { color: rgba(253,250,245,0.55); }

        /* ── Divider ── */
        .ft2-divider {
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(168,114,42,0.18) 20%,
            rgba(168,114,42,0.18) 80%,
            transparent
          );
          margin: 0;
        }

        /* ── Grid ── */
        .ft2-grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr;
          gap: 56px;
          align-items: start;
        }

        @media (max-width: 1100px) {
          .ft2-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
        }
        @media (max-width: 600px) {
          .ft2-grid { grid-template-columns: 1fr; gap: 36px; }
        }
      `}</style>

      <footer className="ft2" style={{ background: '#0c0804' }}>

        {/* ── GOLD TOP ACCENT ── */}
        <div style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #a8722a 20%, #d4a444 50%, #a8722a 80%, transparent)',
        }}/>

        {/* ── MAIN BODY ── */}
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '80px clamp(24px,5vw,80px) 72px' }}>
          <div className="ft2-grid">

            {/* ── COL 1: Brand ── */}
            <div style={{ display:'flex', flexDirection:'column', gap:'0' }}>

              {/* Logo row */}
              <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'24px' }}>
                <Image
                  src="/images/image-logo.png"
                  alt="Livora Crafts"
                  width={52} height={52}
                  className="object-contain"
                  style={{ filter:'drop-shadow(0 0 10px rgba(168,114,42,0.2))' }}
                />
                <div>
                  <div style={{
                    fontFamily:"'Cormorant Garamond',serif",
                    fontSize:'1.3rem', fontWeight:400,
                    color:'#fdfaf5', lineHeight:1.1, letterSpacing:'0.03em',
                  }}>
                    Livora Crafts
                  </div>
                  <div style={{
                    fontFamily:"'Jost',sans-serif",
                    fontSize:'0.52rem', fontWeight:500,
                    letterSpacing:'0.22em', textTransform:'uppercase',
                    color:'rgba(168,114,42,0.6)', marginTop:'4px',
                  }}>
                    Premium Export · India
                  </div>
                </div>
              </div>

              {/* tagline */}
              <p style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontStyle:'italic', fontSize:'1rem', fontWeight:300,
                color:'rgba(253,250,245,0.3)', lineHeight:1.7,
                marginBottom:'28px', maxWidth:'280px',
              }}>
                "Handcrafted with soul,<br/>delivered to the world."
              </p>

              {/* thin gold separator */}
              <div style={{ width:'40px', height:'1px', background:'linear-gradient(90deg,#a8722a,#d4a444)', marginBottom:'28px' }}/>

              {/* contact stack */}
              <div style={{ display:'flex', flexDirection:'column', gap:'16px', marginBottom:'32px' }}>

                {/* email */}
                <div style={{ display:'flex', alignItems:'flex-start', gap:'12px' }}>
                  <div style={{
                    width:'30px', height:'30px', flexShrink:0,
                    border:'1px solid rgba(168,114,42,0.18)',
                    background:'rgba(168,114,42,0.05)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    marginTop:'1px',
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(168,114,42,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily:"'Jost',sans-serif", fontSize:'0.52rem', fontWeight:600, letterSpacing:'0.16em', textTransform:'uppercase', color:'rgba(253,250,245,0.2)', marginBottom:'3px' }}>
                      Email
                    </div>
                    <Link href="mailto:info@livoracrafts.com" className="ft2-email">
                      info@livoracrafts.com
                    </Link>
                  </div>
                </div>

                {/* location */}
                <div style={{ display:'flex', alignItems:'flex-start', gap:'12px' }}>
                  <div style={{
                    width:'30px', height:'30px', flexShrink:0,
                    border:'1px solid rgba(168,114,42,0.18)',
                    background:'rgba(168,114,42,0.05)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    marginTop:'1px',
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(168,114,42,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily:"'Jost',sans-serif", fontSize:'0.52rem', fontWeight:600, letterSpacing:'0.16em', textTransform:'uppercase', color:'rgba(253,250,245,0.2)', marginBottom:'3px' }}>
                      Location
                    </div>
                    <div style={{ fontFamily:"'Jost',sans-serif", fontSize:'0.82rem', fontWeight:300, color:'rgba(253,250,245,0.55)' }}>
                      Delhi, India
                    </div>
                  </div>
                </div>

              </div>

              {/* socials */}
              <div style={{ display:'flex', gap:'10px' }}>
                <Link href="https://instagram.com" target="_blank" className="ft2-social" aria-label="Instagram">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(253,250,245,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="rgba(253,250,245,0.45)" stroke="none"/>
                  </svg>
                </Link>
                <Link href="https://linkedin.com" target="_blank" className="ft2-social" aria-label="LinkedIn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(253,250,245,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </Link>
              </div>

            </div>

            {/* ── COL 2: Collections ── */}
            <div>
              <span className="ft2-col-head">Collections</span>
              <nav style={{ display:'flex', flexDirection:'column' }}>
                {collections.map(({ label, href }) => (
                  <Link key={label} href={href} className="ft2-link">{label}</Link>
                ))}
              </nav>
            </div>

            {/* ── COL 3: Company ── */}
            <div>
              <span className="ft2-col-head">Company</span>
              <nav style={{ display:'flex', flexDirection:'column' }}>
                {company.map(({ label, href }) => (
                  <Link key={label} href={href} className="ft2-link">{label}</Link>
                ))}
              </nav>
            </div>



          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div className="ft2-divider"/>

        {/* ── BOTTOM BAR ── */}
        <div style={{ maxWidth:'1320px', margin:'0 auto', padding:'20px clamp(24px,5vw,80px)' }}>
          <div style={{
            display:'flex', alignItems:'center',
            justifyContent:'space-between',
            flexWrap:'wrap', gap:'16px',
          }}>

            {/* left — tagline */}
            <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
              <div style={{ width:'3px', height:'3px', borderRadius:'50%', background:'rgba(168,114,42,0.5)', flexShrink:0 }}/>
              <span style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontStyle:'italic', fontSize:'0.78rem',
                color:'rgba(253,250,245,0.18)',
              }}>
                Made with soul in India
              </span>
            </div>

            {/* center — copyright */}
            <p style={{
              fontFamily:"'Jost',sans-serif",
              fontSize:'0.56rem', fontWeight:300,
              color:'rgba(253,250,245,0.16)',
              letterSpacing:'0.1em', textAlign:'center',
            }}>
              © {year} Livora Crafts. All rights reserved.
            </p>

            {/* right — legal links */}
            <div style={{ display:'flex', alignItems:'center', gap:'20px' }}>
              {[
                { label:'Privacy',  href:'/privacy'  },
                { label:'Terms',    href:'/terms'     },
                { label:'Shipping', href:'/shipping'  },
              ].map(({ label, href }, i, arr) => (
                <span key={label} style={{ display:'flex', alignItems:'center', gap:'20px' }}>
                  <Link href={href} className="ft2-btm">{label}</Link>
                  {i < arr.length - 1 && (
                    <span style={{ width:'1px', height:'10px', background:'rgba(253,250,245,0.08)', display:'inline-block' }}/>
                  )}
                </span>
              ))}
            </div>

          </div>
        </div>

      </footer>
    </>
  );
}