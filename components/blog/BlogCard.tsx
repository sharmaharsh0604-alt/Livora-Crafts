'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

type Props = {
  blog: {
    slug: string;
    title: string;
    image: string;
    excerpt: string;
    readTime: string;
  };
  index?: number;
};

export default function BlogCard({ blog, index = 0 }: Props) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        .bc-wrap {
          display: block;
          text-decoration: none;
          position: relative;
          background: #fdfaf5;
          border: 1px solid rgba(168,114,42,0.13);
          overflow: hidden;
          opacity: 0;
          transform: translateY(40px);
          transition:
            opacity 0.75s cubic-bezier(0.25,0.46,0.45,0.94),
            transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94),
            box-shadow 0.4s ease,
            border-color 0.4s ease;
          will-change: transform, opacity;
        }

        /* gold sweep top border on hover */
        .bc-wrap::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 0; height: 2px;
          background: linear-gradient(90deg, #a8722a, #d4a444, #a8722a);
          transition: width 0.55s cubic-bezier(0.25,0.46,0.45,0.94);
          z-index: 2;
        }
        .bc-wrap:hover::before { width: 100%; }

        .bc-wrap:hover {
          box-shadow: 0 28px 60px rgba(0,0,0,0.10), 0 8px 24px rgba(168,114,42,0.08);
          border-color: rgba(168,114,42,0.3);
          transform: translateY(-8px) !important;
        }

        /* IMAGE */
        .bc-img {
          position: relative;
          height: 260px;
          overflow: hidden;
        }
        .bc-img-inner {
          transition: transform 1.8s cubic-bezier(0.25,0.46,0.45,0.94) !important;
        }
        .bc-wrap:hover .bc-img-inner {
          transform: scale(1.07) !important;
        }

        /* dark gradient overlay */
        .bc-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10,6,2,0.80) 0%,
            rgba(10,6,2,0.30) 50%,
            transparent 80%
          );
          z-index: 1;
        }

        /* index number watermark */
        .bc-num {
          position: absolute;
          bottom: 10px; right: 18px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 5.5rem;
          font-weight: 300;
          color: rgba(255,255,255,0.07);
          line-height: 1;
          z-index: 2;
          user-select: none;
          pointer-events: none;
        }

        /* category pill on image */
        .bc-cat {
          position: absolute;
          top: 18px; left: 18px;
          font-family: 'Jost', sans-serif;
          font-size: 0.55rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.85);
          background: rgba(168,114,42,0.75);
          backdrop-filter: blur(6px);
          padding: 5px 12px;
          z-index: 2;
        }

        /* BODY */
        .bc-body {
          padding: 28px 26px 26px;
        }

        /* meta row */
        .bc-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .bc-meta-line {
          flex: 1; height: 1px;
          background: linear-gradient(to right, rgba(168,114,42,0.4), transparent);
        }
        .bc-time {
          font-family: 'Jost', sans-serif;
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(28,18,8,0.4);
          white-space: nowrap;
        }

        /* title */
        .bc-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.25rem, 1.5vw, 1.42rem);
          font-weight: 400;
          line-height: 1.28;
          color: #0e0904;
          margin-bottom: 12px;
          transition: color 0.3s ease;
        }
        .bc-wrap:hover .bc-title { color: #7a4d0e; }

        /* excerpt */
        .bc-excerpt {
          font-family: 'Jost', sans-serif;
          font-size: 0.84rem;
          font-weight: 300;
          line-height: 1.85;
          color: rgba(28,18,8,0.52);
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 22px;
        }

        /* CTA */
        .bc-read {
          font-family: 'Jost', sans-serif;
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #a8722a;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: gap 0.35s ease, color 0.3s;
        }
        .bc-wrap:hover .bc-read { gap: 18px; }

        .bc-arrow {
          width: 22px; height: 1px;
          background: #a8722a;
          position: relative;
          transition: width 0.35s ease;
          flex-shrink: 0;
        }
        .bc-wrap:hover .bc-arrow { width: 30px; }
        .bc-arrow::after {
          content: '';
          position: absolute;
          right: 0; top: 50%;
          transform: translateY(-50%) rotate(45deg);
          width: 4px; height: 4px;
          border-right: 1.5px solid #a8722a;
          border-top: 1.5px solid #a8722a;
        }

        /* bottom gold line */
        .bc-bottom-line {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(168,114,42,0.2), transparent);
          transform: scaleX(0);
          transition: transform 0.5s ease;
          transform-origin: left;
        }
        .bc-wrap:hover .bc-bottom-line { transform: scaleX(1); }
      `}</style>

      <Link
        ref={cardRef}
        href={`/blog/${blog.slug}`}
        className="bc-wrap"
        style={{ transitionDelay: `${index * 0.12}s` }}
      >
        {/* Image */}
        <div className="bc-img">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="bc-img-inner object-cover"
          />
          <div className="bc-overlay" />
          <span className="bc-cat">Craft Journal</span>
          <div className="bc-num">{String(index + 1).padStart(2, "0")}</div>
        </div>

        {/* Body */}
        <div className="bc-body">
          <div className="bc-meta">
            <div className="bc-meta-line" />
            <span className="bc-time">{blog.readTime}</span>
          </div>

          <h3 className="bc-title">{blog.title}</h3>
          <p className="bc-excerpt">{blog.excerpt}</p>

          <span className="bc-read">
            Read Article
            <span className="bc-arrow" />
          </span>
        </div>

        <div className="bc-bottom-line" />
      </Link>
    </>
  );
}