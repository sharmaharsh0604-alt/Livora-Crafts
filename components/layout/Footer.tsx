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
    { label: 'Product',     href: '/products/coasters' },
    { label: 'Blog',        href: '/blog'    },
  ];

  const socials = [
    {
      label: 'Instagram',
      href: 'https://instagram.com',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
        </svg>
      ),
    },
    {
      label: 'Facebook',
      href: 'https://facebook.com',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
        </svg>
      ),
    },
    {
      label: 'Twitter / X',
      href: 'https://twitter.com',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l16 16M4 20L20 4"/>
          <path d="M20 4h-5l-11 16h5"/>
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
          <rect x="2" y="9" width="4" height="12"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ),
    },
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
          border-bottom: 1px solid rgba(168,114,42,0.22);
          display: block;
        }

        /* ── Nav links ── */
        .ft2-link {
          display: flex;
          align-items: center;
          font-family: 'Jost', sans-serif;
          font-size: 0.82rem;
          font-weight: 300;
          color: rgba(253,245,232,0.42);
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
          color: rgba(253,245,232,0.88);
          padding-left: 4px;
        }
        .ft2-link:hover::before {
          width: 12px;
          margin-right: 8px;
        }

        /* ── Phone link ── */
        .ft2-phone-link {
          font-family: 'Jost', sans-serif;
          font-size: 0.82rem;
          font-weight: 300;
          color: rgba(253,245,232,0.6);
          text-decoration: none;
          transition: color 0.22s;
          display: block;
        }
        .ft2-phone-link:hover { color: #d4a444; }

        /* ── Social icon ── */
        .ft2-social {
          width: 40px; height: 40px;
          border: 1px solid rgba(253,245,232,0.1);
          background: rgba(253,245,232,0.03);
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
          color: rgba(253,245,232,0.4);
          transition: border-color 0.26s, background 0.26s, transform 0.26s, color 0.26s;
          flex-shrink: 0;
          border-radius: 2px;
        }
        .ft2-social:hover {
          border-color: #a8722a;
          background: rgba(168,114,42,0.10);
          transform: translateY(-3px);
          color: #a8722a;
        }

        /* ── Phone link hover ── */
        .ft2-phone {
          font-family: 'Jost', sans-serif;
          font-size: 0.82rem;
          font-weight: 300;
          color: rgba(253,245,232,0.6);
          text-decoration: none;
          transition: color 0.22s;
          display: block;
        }
        .ft2-phone:hover { color: #d4a444; }
        .ft2-contact-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Jost', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #a8722a;
          text-decoration: none;
          border: 1px solid rgba(168,114,42,0.35);
          padding: 10px 20px;
          margin-top: 8px;
          transition: background 0.24s, border-color 0.24s, color 0.24s, transform 0.24s;
        }
        .ft2-contact-btn:hover {
          background: #a8722a;
          border-color: #a8722a;
          color: #fdfaf5;
          transform: translateY(-2px);
        }

        /* ── Phone link hover ── */
        .ft2-phone {
          font-family: 'Jost', sans-serif;
          font-size: 0.82rem;
          font-weight: 300;
          color: rgba(253,245,232,0.6);
          text-decoration: none;
          transition: color 0.22s;
          display: block;
        }
        .ft2-phone:hover { color: #d4a444; }
        .ft2-btm {
          font-family: 'Jost', sans-serif;
          font-size: 0.58rem;
          font-weight: 300;
          letter-spacing: 0.1em;
          color: rgba(253,245,232,0.22);
          text-decoration: none;
          transition: color 0.22s;
          white-space: nowrap;
        }
        .ft2-btm:hover { color: rgba(253,245,232,0.6); }

        /* ── Divider ── */
        .ft2-divider {
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(168,114,42,0.25) 20%,
            rgba(168,114,42,0.25) 80%,
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

      <footer className="ft2" style={{ background: '#1e1108' }}>

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
                  style={{ filter:'drop-shadow(0 0 10px rgba(168,114,42,0.15))' }}
                />
                <div>
                  <div style={{
                    fontFamily:"'Cormorant Garamond',serif",
                    fontSize:'1.3rem', fontWeight:400,
                    color:'#fdf8f0', lineHeight:1.1, letterSpacing:'0.03em',
                  }}>
                    Livora Crafts
                  </div>
                  <div style={{
                    fontFamily:"'Jost',sans-serif",
                    fontSize:'0.52rem', fontWeight:500,
                    letterSpacing:'0.22em', textTransform:'uppercase',
                    color:'rgba(168,114,42,0.7)', marginTop:'4px',
                  }}>
                    Premium Export · India
                  </div>
                </div>
              </div>

              {/* tagline */}
              <p style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontStyle:'italic', fontSize:'1rem', fontWeight:300,
                color:'rgba(253,245,232,0.32)', lineHeight:1.7,
                marginBottom:'28px', maxWidth:'280px',
              }}>
                "Handcrafted with soul,<br/>delivered to the world."
              </p>

              {/* thin gold separator */}
              <div style={{ width:'40px', height:'1px', background:'linear-gradient(90deg,#a8722a,#d4a444)', marginBottom:'28px' }}/>

              {/* contact stack */}
              <div style={{ display:'flex', flexDirection:'column', gap:'16px', marginBottom:'32px' }}>

                {/* location row */}
                <div style={{ display:'flex', alignItems:'flex-start', gap:'12px' }}>
                  <div style={{
                    width:'30px', height:'30px', flexShrink:0,
                    border:'1px solid rgba(168,114,42,0.22)',
                    background:'rgba(168,114,42,0.07)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    marginTop:'1px',
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(168,114,42,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily:"'Jost',sans-serif", fontSize:'0.52rem', fontWeight:600, letterSpacing:'0.16em', textTransform:'uppercase', color:'rgba(253,245,232,0.24)', marginBottom:'3px' }}>
                      Location
                    </div>
                    <div style={{ fontFamily:"'Jost',sans-serif", fontSize:'0.82rem', fontWeight:300, color:'rgba(253,245,232,0.6)' }}>
                      Delhi, India
                    </div>
                  </div>
                </div>

                {/* phone row */}
                <div style={{ display:'flex', alignItems:'flex-start', gap:'12px' }}>
                  <div style={{
                    width:'30px', height:'30px', flexShrink:0,
                    border:'1px solid rgba(168,114,42,0.22)',
                    background:'rgba(168,114,42,0.07)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    marginTop:'1px',
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(168,114,42,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .99h3a2 2 0 012 1.72c.13 1 .37 1.97.72 2.91a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.18-1.18a2 2 0 012.11-.45c.94.35 1.91.59 2.91.72a2 2 0 011.71 2.02z"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily:"'Jost',sans-serif", fontSize:'0.52rem', fontWeight:600, letterSpacing:'0.16em', textTransform:'uppercase', color:'rgba(253,245,232,0.24)', marginBottom:'3px' }}>
                      Contact
                    </div>
                    <Link href="tel:+918595633217" className="ft2-phone-link">
                      +91 8595633217
                    </Link>
                  </div>
                </div>

              </div>

              {/* socials */}
              <div style={{ display:'flex', gap:'8px', marginTop:'28px' }}>
                {socials.map(({ label, href, icon }) => (
                  <Link key={label} href={href} target="_blank" className="ft2-social" aria-label={label}>
                    {icon}
                  </Link>
                ))}
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
                color:'rgba(253,245,232,0.22)',
              }}>
                Made with soul in India
              </span>
            </div>

            {/* center — copyright */}
            <p style={{
              fontFamily:"'Jost',sans-serif",
              fontSize:'0.56rem', fontWeight:300,
              color:'rgba(253,245,232,0.18)',
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
                    <span style={{ width:'1px', height:'10px', background:'rgba(253,245,232,0.08)', display:'inline-block' }}/>
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