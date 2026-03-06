import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { blogs } from "@/libs/blogs";

export default function BlogPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        /* ── PAGE SHELL ── */
        .bp-shell {
          background: #f2ebe0;
          min-height: 100vh;
          position: relative;
        }

        /* subtle grain texture */
        .bp-shell::before {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.028;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* ── CONTAINER ── */
        .bp-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 56px);
          position: relative;
          z-index: 1;
        }

        /* ── HERO HEADER ── */
        .bp-header {
          padding-top: 160px;
          padding-bottom: 80px;
          position: relative;
        }

        /* big decorative text behind */
        .bp-bg-word {
          position: absolute;
          top: 120px;
          left: -20px;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(6rem, 14vw, 13rem);
          font-weight: 300;
          color: rgba(168,114,42,0.055);
          line-height: 1;
          user-select: none;
          pointer-events: none;
          letter-spacing: -0.04em;
          white-space: nowrap;
        }

        /* eyebrow */
        .bp-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #a8722a;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .bp-eyebrow-line {
          width: 36px; height: 1px;
          background: linear-gradient(to right, #a8722a, transparent);
        }

        /* main title */
        .bp-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 5.5vw, 4.2rem);
          font-weight: 300;
          line-height: 1.08;
          letter-spacing: -0.025em;
          color: #0e0904;
          margin-bottom: 24px;
          max-width: 14ch;
        }
        .bp-title em {
          font-style: italic;
          color: #7a4d0e;
        }

        /* desc */
        .bp-desc {
          font-family: 'Jost', sans-serif;
          font-size: 0.9rem;
          font-weight: 300;
          line-height: 1.85;
          color: rgba(28,18,8,0.52);
          max-width: 480px;
          margin-bottom: 48px;
        }

        /* stats row */
        .bp-stats {
          display: flex;
          align-items: center;
          gap: 40px;
          flex-wrap: wrap;
        }
        .bp-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 300;
          color: #a8722a;
          line-height: 1;
        }
        .bp-stat-label {
          font-family: 'Jost', sans-serif;
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(28,18,8,0.38);
          margin-top: 4px;
        }
        .bp-stat-divider {
          width: 1px;
          height: 36px;
          background: rgba(168,114,42,0.2);
        }

        /* gold full-width divider */
        .bp-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(168,114,42,0.4), transparent);
          margin: 60px 0 70px;
        }

        /* ── GRID ── */
        .bp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          padding-bottom: 100px;
        }

        @media (max-width: 1020px) {
          .bp-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .bp-grid { grid-template-columns: 1fr; gap: 24px; }
          .bp-title { font-size: 2.6rem; }
        }

        /* ── SECTION LABEL ── */
        .bp-section-label {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 40px;
        }
        .bp-section-label-text {
          font-family: 'Jost', sans-serif;
          font-size: 0.58rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(28,18,8,0.35);
          white-space: nowrap;
        }
        .bp-section-label-line {
          flex: 1; height: 1px;
          background: linear-gradient(to right, rgba(168,114,42,0.25), transparent);
        }

        /* ── FADE IN HERO ── */
        @keyframes bp-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .bp-anim-1 { animation: bp-fade-up 0.8s cubic-bezier(0.25,0.46,0.45,0.94) 0.1s both; }
        .bp-anim-2 { animation: bp-fade-up 0.8s cubic-bezier(0.25,0.46,0.45,0.94) 0.25s both; }
        .bp-anim-3 { animation: bp-fade-up 0.8s cubic-bezier(0.25,0.46,0.45,0.94) 0.4s both; }
        .bp-anim-4 { animation: bp-fade-up 0.8s cubic-bezier(0.25,0.46,0.45,0.94) 0.55s both; }
      `}</style>

      <div className="bp-shell">
        <Navbar />

        <div className="bp-container">

          {/* ── HERO HEADER ── */}
          <header className="bp-header">
            {/* Big decorative background word */}
            <div className="bp-bg-word" aria-hidden="true">Journal</div>

            <div className="bp-eyebrow bp-anim-1">
              <span className="bp-eyebrow-line" />
              Craft Journal
            </div>

            <h1 className="bp-title bp-anim-2">
              Insights &amp; <em>Articles</em>
            </h1>

            <p className="bp-desc bp-anim-3">
              Trends, sourcing insights and stories behind Indian craftsmanship —
              written for interior designers, buyers and lovers of handmade.
            </p>

            {/* Stats row */}
            <div className="bp-stats bp-anim-4">
              <div>
                <div className="bp-stat-num">{blogs.length}+</div>
                <div className="bp-stat-label">Articles</div>
              </div>
              <div className="bp-stat-divider" />
              <div>
                <div className="bp-stat-num">12</div>
                <div className="bp-stat-label">Topics</div>
              </div>
              <div className="bp-stat-divider" />
              <div>
                <div className="bp-stat-num">∞</div>
                <div className="bp-stat-label">Craft Stories</div>
              </div>
            </div>
          </header>

          {/* ── DIVIDER ── */}
          <div className="bp-divider" />

          {/* ── ALL ARTICLES SECTION ── */}
          <div className="bp-section-label">
            <span className="bp-section-label-text">All Articles</span>
            <div className="bp-section-label-line" />
            <span className="bp-section-label-text">{blogs.length} posts</span>
          </div>

          {/* ── GRID ── */}
          <div className="bp-grid">
            {blogs.map((blog, i) => (
              <BlogCard key={blog.slug} blog={blog} index={i} />
            ))}
          </div>

        </div>

        <Footer />
      </div>
    </>
  );
}