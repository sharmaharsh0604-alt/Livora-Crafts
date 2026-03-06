import Image from 'next/image';
import Link from 'next/link';

export default function WhyWeExist() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        .ww * { box-sizing: border-box; }
        .ww   { font-family: 'Jost', sans-serif; }

        .ww-eyebrow {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 16px;
        }
        .ww-eyebrow-line { width: 26px; height: 1px; background: #a8722a; flex-shrink: 0; }
        .ww-eyebrow-text {
          font-family: 'Jost', sans-serif; font-size: 0.56rem;
          font-weight: 600; letter-spacing: 0.22em;
          text-transform: uppercase; color: #a8722a;
        }

        .ww-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.9rem, 3.5vw, 3rem);
          font-weight: 400; line-height: 1.12;
          color: #0e0904; letter-spacing: -0.01em;
          margin-bottom: 20px;
        }
        .ww-h2 em { font-style: italic; color: #7a4d0e; }

        .ww-p {
          font-family: 'Jost', sans-serif;
          font-size: 0.86rem; font-weight: 400;
          line-height: 1.95; color: #3a2a18;
        }

        .ww-divider { width: 36px; height: 1px; background: linear-gradient(90deg,#a8722a,#d4a444); margin-bottom: 20px; }

        /* image */
        .ww-img { position: relative; overflow: hidden; }
        .ww-img img { transition: transform 8s ease !important; }
        .ww-img:hover img { transform: scale(1.04) !important; }

        /* value row */
        .ww-val {
          display: flex; gap: 16px; padding: 18px 0;
          border-bottom: 1px solid rgba(168,114,42,0.1);
        }
        .ww-val:first-child { padding-top: 0; }
        .ww-val:last-child  { border-bottom: none; }
        .ww-val-n {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem; font-weight: 300;
          color: rgba(168,114,42,0.3); flex-shrink: 0;
          padding-top: 1px; min-width: 26px;
        }
        .ww-val-title {
          font-family: 'Jost', sans-serif; font-size: 0.78rem;
          font-weight: 600; color: #0e0904; margin-bottom: 5px;
        }
        .ww-val-text {
          font-family: 'Jost', sans-serif; font-size: 0.76rem;
          font-weight: 400; line-height: 1.8; color: #3a2a18;
        }

        /* CTA */
        .ww-btn {
          font-family: 'Jost', sans-serif; font-size: 0.63rem;
          font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase;
          color: #fdfaf5; background: #1c1208;
          border: 1px solid #1c1208; padding: 14px 34px;
          text-decoration: none; display: inline-block;
          position: relative; overflow: hidden;
          transition: border-color 0.3s;
        }
        .ww-btn::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, #9a6618, #d4a444);
          transform: translateX(-101%);
          transition: transform 0.42s cubic-bezier(0.76,0,0.24,1);
        }
        .ww-btn:hover::before { transform: translateX(0); }
        .ww-btn:hover { border-color: #a8722a; }
        .ww-btn span { position: relative; z-index: 1; }

        /* 2-col layout */
        .ww-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: clamp(40px,6vw,80px); align-items: center;
        }
        @media (max-width: 860px) {
          .ww-grid { grid-template-columns: 1fr; }
          .ww-flip { order: -1; }
        }
      `}</style>

      <div className="ww">

        {/* ── 1. OUR STORY ── */}
        <section style={{ background: '#e8dcc8', padding: '100px 0' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(24px,5vw,72px)' }}>
            <div className="ww-grid">

              {/* Text */}
              <div>
                <div className="ww-eyebrow">
                  <div className="ww-eyebrow-line"/><span className="ww-eyebrow-text">Our Story</span>
                </div>
                <h2 className="ww-h2">
                  Crafted with Heritage,<br/>
                  <em>Designed for the World</em>
                </h2>
                <div className="ww-divider"/>
                <p className="ww-p" style={{ marginBottom: '14px' }}>
                  At <strong style={{ fontWeight: 600, color: '#0e0904' }}>Livora Crafts</strong>, our goal is to
                  bring India's rich craftsmanship to global markets through carefully sourced, handcrafted
                  products. From the vibrant deserts of Rajasthan to the coastal regions of South India, our
                  collection reflects tradition, skill, and authenticity — present in every piece we deliver.
                </p>
                <p className="ww-p">
                  We collaborate closely with local artisans and small workshops who have carried their craft
                  across generations. From hand-painted trays to intricate brass décor, each product showcases
                  traditional artistry with a modern global appeal.
                </p>
              </div>

              {/* Image */}
              <div className="ww-img" style={{ height: 'clamp(300px,38vw,480px)' }}>
                <Image
                  src="/images/crafted.avif" alt="Indian Artisan Crafting"
                  fill className="object-cover" sizes="(max-width:860px)100vw,620px"
                />
              </div>

            </div>
          </div>
        </section>

        {/* ── 2. WHY WE EXIST ── */}
        <section style={{ background: '#d8cdb8', padding: '100px 0' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(24px,5vw,72px)' }}>
            <div className="ww-grid">

              {/* Image */}
              <div className="ww-img ww-flip" style={{ height: 'clamp(260px,32vw,400px)' }}>
                <Image
                  src="/images/quality.png" alt="Craftsmanship"
                  fill className="object-cover" sizes="(max-width:860px)100vw,620px"
                />
              </div>

              {/* Text */}
              <div>
                <div className="ww-eyebrow">
                  <div className="ww-eyebrow-line"/><span className="ww-eyebrow-text">Purpose</span>
                </div>
                <h2 className="ww-h2">
                  Why We <em>Exist</em>
                </h2>
                <div className="ww-divider"/>
                <p className="ww-p" style={{ marginBottom: '14px' }}>
                  India has a rich tradition of craftsmanship, but many artisans lack access to global markets.
                  We bridge this gap by connecting international buyers with authentic, high-quality handcrafted
                  products.
                </p>
                <p className="ww-p">
                  Our goal is to make sourcing reliable and transparent, while supporting artisans and
                  delivering consistent quality that buyers can trust.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── 3. VALUES ── */}
        <section style={{ background: '#e8dcc8', padding: '100px 0' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(24px,5vw,72px)' }}>
            <div className="ww-grid">

              {/* Text */}
              <div>
                <div className="ww-eyebrow">
                  <div className="ww-eyebrow-line"/><span className="ww-eyebrow-text">Our Values</span>
                </div>
                <h2 className="ww-h2">
                  Quality, <em>Ethics</em> &amp; Trust
                </h2>
                <div className="ww-divider"/>
                <div>
                  {[
                    { n:'01', title:'Authentic Craftsmanship', text:'Every product is handmade by skilled artisans using traditional techniques passed down through generations.' },
                    { n:'02', title:'Fair Trade Partnership',  text:'We ensure artisans receive fair compensation and work in safe, dignified conditions.' },
                    { n:'03', title:'Sustainable Export',      text:'We prioritize eco-friendly materials and packaging, minimizing environmental impact.' },
                  ].map(({ n, title, text }) => (
                    <div key={n} className="ww-val">
                      <div className="ww-val-n">{n}</div>
                      <div>
                        <div className="ww-val-title">{title}</div>
                        <div className="ww-val-text">{text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div className="ww-img" style={{ height: 'clamp(300px,38vw,480px)' }}>
                <Image
                  src="/images/quality.png" alt="Indian Handicrafts"
                  fill className="object-cover" sizes="(max-width:860px)100vw,620px"
                />
              </div>

            </div>
          </div>
        </section>

        {/* ── 4. BUILD TOGETHER ── */}
        <section style={{ background: '#d8cdb8', padding: '100px 0' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(24px,5vw,72px)' }}>

            {/* top: heading + para */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap', marginBottom: '52px' }}>
              <div style={{ maxWidth: '480px' }}>
                <div className="ww-eyebrow">
                  <div className="ww-eyebrow-line"/><span className="ww-eyebrow-text">Partner With Us</span>
                </div>
                <h2 className="ww-h2" style={{ marginBottom: 0 }}>
                  Let's Build Something<br/>
                  <em>Beautiful Together</em>
                </h2>
              </div>
              <div style={{ maxWidth: '380px', paddingTop: '8px' }}>
                <div className="ww-divider"/>
                <p className="ww-p" style={{ marginBottom: '24px' }}>
                  We believe trade should empower. Every order supports artisans and keeps traditional
                  craftsmanship alive. Partner with us to bring authentic Indian handicrafts to your market.
                </p>
              </div>
            </div>

            {/* full-width image */}
            <div className="ww-img" style={{ height: 'clamp(220px,28vw,380px)' }}>
              <Image
                src="/images/build.png" alt="Handcrafted décor"
                fill className="object-cover" sizes="1240px"
              />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(6,3,1,0.45) 0%,transparent 55%)', zIndex:1, pointerEvents:'none' }}/>
              <div style={{ position:'absolute', bottom:'20px', left:'28px', zIndex:2, display:'flex', alignItems:'center', gap:'10px' }}>
                <div style={{ width:'22px', height:'1px', background:'linear-gradient(90deg,#a8722a,#d4a444)' }}/>
                <span style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'0.88rem', fontWeight:300, color:'rgba(253,250,245,0.6)' }}>
                  Handcrafted with soul — made in India
                </span>
              </div>
            </div>

          </div>
        </section>

      </div>
    </>
  );
}