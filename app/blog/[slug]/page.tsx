"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { blogs } from "@/libs/blogs";

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) notFound();

  const related = blogs.filter((b) => b.slug !== blog.slug).slice(0, 2);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        /* ── SHELL ── */
        .bsp-shell {
          background: #f2ebe0;
          min-height: 100vh;
        }

        /* ── HERO ── */
        .bsp-hero {
          position: relative;
          height: clamp(340px, 52vh, 520px);
          overflow: hidden;
        }
        .bsp-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(10,6,2,0.25) 0%,
            rgba(10,6,2,0.72) 100%
          );
          z-index: 1;
        }
        .bsp-hero-content {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          z-index: 2;
          padding: clamp(28px, 5vw, 64px);
          max-width: 860px;
        }

        /* category pill */
        .bsp-cat {
          display: inline-block;
          font-family: 'Jost', sans-serif;
          font-size: 0.55rem;
          font-weight: 600;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.9);
          background: rgba(168,114,42,0.8);
          backdrop-filter: blur(6px);
          padding: 5px 14px;
          margin-bottom: 16px;
        }

        .bsp-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.9rem, 4vw, 3.2rem);
          font-weight: 300;
          line-height: 1.12;
          color: #fdfaf5;
          margin-bottom: 20px;
          letter-spacing: -0.02em;
        }

        .bsp-hero-meta {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .bsp-hero-meta span {
          font-family: 'Jost', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
        }
        .bsp-hero-meta-dot {
          width: 3px; height: 3px;
          border-radius: 50%;
          background: rgba(168,114,42,0.7);
          flex-shrink: 0;
        }

        /* ── LAYOUT ── */
        .bsp-layout {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(20px, 5vw, 56px);
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 64px;
          padding-top: 64px;
          padding-bottom: 100px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .bsp-layout {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }

        /* ── ARTICLE BODY ── */
        .bsp-article {
          font-family: 'Jost', sans-serif;
        }

        /* breadcrumb */
        .bsp-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(28,18,8,0.38);
          margin-bottom: 40px;
        }
        .bsp-breadcrumb a {
          color: inherit;
          text-decoration: none;
          transition: color 0.2s;
        }
        .bsp-breadcrumb a:hover { color: #a8722a; }

        /* prose */
        .bsp-prose {
          font-family: 'Jost', sans-serif;
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.9;
          color: rgba(28,18,8,0.75);
        }
        .bsp-prose p {
          margin-bottom: 1.5rem;
        }
        .bsp-prose h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.4rem, 2.2vw, 1.8rem);
          font-weight: 400;
          color: #0e0904;
          line-height: 1.2;
          margin: 2.5rem 0 1rem;
          letter-spacing: -0.01em;
          position: relative;
          padding-left: 18px;
        }
        .bsp-prose h2::before {
          content: '';
          position: absolute;
          left: 0; top: 0.2em;
          width: 3px;
          height: 70%;
          background: linear-gradient(to bottom, #a8722a, #d4a444);
          border-radius: 2px;
        }
        .bsp-prose ul {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem;
        }
        .bsp-prose ul li {
          padding: 0.45rem 0 0.45rem 22px;
          position: relative;
          border-bottom: 1px solid rgba(168,114,42,0.1);
          font-size: 0.95rem;
        }
        .bsp-prose ul li:last-child { border-bottom: none; }
        .bsp-prose ul li::before {
          content: '';
          position: absolute;
          left: 0; top: 50%;
          transform: translateY(-50%);
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #a8722a;
        }
        .bsp-prose strong { color: #0e0904; font-weight: 500; }

        /* divider */
        .bsp-prose-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(168,114,42,0.3), transparent);
          margin: 3rem 0;
        }

        /* ── SIDEBAR ── */
        .bsp-sidebar {
          position: sticky;
          top: 110px;
        }

        .bsp-sidebar-block {
          background: #fdfaf5;
          border: 1px solid rgba(168,114,42,0.13);
          padding: 28px 24px;
          margin-bottom: 24px;
        }
        .bsp-sidebar-label {
          font-family: 'Jost', sans-serif;
          font-size: 0.55rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #a8722a;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(168,114,42,0.15);
          display: block;
        }

        /* related card in sidebar */
        .bsp-related-card {
          display: flex;
          gap: 14px;
          text-decoration: none;
          align-items: flex-start;
          padding: 12px 0;
          border-bottom: 1px solid rgba(168,114,42,0.1);
          transition: opacity 0.2s;
        }
        .bsp-related-card:last-child { border-bottom: none; padding-bottom: 0; }
        .bsp-related-card:hover { opacity: 0.72; }
        .bsp-related-thumb {
          width: 58px; height: 58px;
          object-fit: cover;
          flex-shrink: 0;
        }
        .bsp-related-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.95rem;
          font-weight: 400;
          color: #0e0904;
          line-height: 1.3;
          margin-bottom: 5px;
        }
        .bsp-related-time {
          font-family: 'Jost', sans-serif;
          font-size: 0.56rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(28,18,8,0.38);
        }

        /* CTA block */
        .bsp-cta-block {
          background: #1c1208;
          padding: 28px 24px;
        }
        .bsp-cta-label {
          font-family: 'Jost', sans-serif;
          font-size: 0.55rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(168,114,42,0.7);
          display: block;
          margin-bottom: 12px;
        }
        .bsp-cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-weight: 300;
          color: #fdfaf5;
          line-height: 1.3;
          margin-bottom: 20px;
        }
        .bsp-cta-btn {
          display: block;
          font-family: 'Jost', sans-serif;
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #1c1208;
          background: linear-gradient(135deg, #a8722a, #d4a444);
          padding: 12px 20px;
          text-decoration: none;
          text-align: center;
          transition: opacity 0.2s, transform 0.2s;
        }
        .bsp-cta-btn:hover { opacity: 0.88; transform: translateY(-1px); }
      `}</style>

      <div className="bsp-shell">
        <Navbar />

        {/* ── HERO IMAGE ── */}
        <div className="bsp-hero" style={{ marginTop: "100px" }}>
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
          <div className="bsp-hero-overlay" />
          <div className="bsp-hero-content">
            <span className="bsp-cat">{blog.category}</span>
            <h1 className="bsp-hero-title">{blog.title}</h1>
            <div className="bsp-hero-meta">
              <span>Livora Crafts</span>
              <div className="bsp-hero-meta-dot" />
              <span>{blog.readTime}</span>
              <div className="bsp-hero-meta-dot" />
              <span>Craft Journal</span>
            </div>
          </div>
        </div>

        {/* ── MAIN LAYOUT ── */}
        <div className="bsp-layout">

          {/* LEFT — Article */}
          <article className="bsp-article">

            {/* Breadcrumb */}
            <div className="bsp-breadcrumb">
              <Link href="/">Home</Link>
              <span>›</span>
              <Link href="/blog">Blog</Link>
              <span>›</span>
              <span style={{ color: "#0e0904" }}>{blog.category}</span>
            </div>

            {/* Prose content */}
            <div
              className="bsp-prose"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            <div className="bsp-prose-divider" />

            {/* Back link */}
            <Link
              href="/blog"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#a8722a",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              ← Back to all articles
            </Link>
          </article>

          {/* RIGHT — Sidebar */}
          <aside className="bsp-sidebar">

            {/* Related posts */}
            <div className="bsp-sidebar-block">
              <span className="bsp-sidebar-label">More Articles</span>
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="bsp-related-card">
                  <Image
                    src={r.image}
                    alt={r.title}
                    width={58}
                    height={58}
                    className="bsp-related-thumb"
                  />
                  <div>
                    <div className="bsp-related-title">{r.title}</div>
                    <div className="bsp-related-time">{r.readTime}</div>
                  </div>
                </Link>
              ))}
            </div>

          </aside>
        </div>

        <Footer />
      </div>
    </>
  );
}