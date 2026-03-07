"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const categories = [
    {
      title: "Tableware & Kitchen",
      items: ["Coasters", "Serving Platters", "Chopping Board", "Napkin Holders"],
    },
    {
      title: "Desk & Office Accessories",
      items: ["Desk Organizers", "Pen Holder","Globes", "Phone Holder"],
    },
    {
      title: "Home Decor",
      items: ["Candle Holders","Photo Frames", "Decor Objects"],
    },
    {
      title: "Storage & Lifestyle",
      items: ["Storage Boxes", "Wooden Games"],
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Jost:wght@300;400;500;600&display=swap');

        .nb { font-family: 'Jost', sans-serif; }

        /* ── Marquee ── */
        @keyframes nb-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .nb-marquee-track {
          display: flex;
          width: max-content;
          animation: nb-marquee 30s linear infinite;
        }

        /* ── Nav links ── */
        .nb-link {
          position: relative;
          font-family: 'Jost', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: #2e200e;
          transition: color 0.25s;
          white-space: nowrap;
          text-decoration: none;
          padding-bottom: 2px;
        }
        .nb-link::after {
          content: '';
          position: absolute;
          bottom: -3px; left: 50%;
          transform: translateX(-50%);
          width: 0; height: 1px;
          background: #a8722a;
          transition: width 0.32s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .nb-link:hover { color: #a8722a; }
        .nb-link:hover::after { width: 100%; }

        /* ── Products trigger ── */
        .nb-products { position: relative; }
        .nb-chevron {
          display: inline-block;
          transition: transform 0.32s cubic-bezier(0.34,1.56,0.64,1);
          color: #a8722a;
          vertical-align: middle;
          margin-left: 3px;
          margin-top: -1px;
        }
        .nb-products:hover .nb-chevron { transform: rotate(180deg); }

        /* ── Mega panel ── */
        .nb-mega {
          position: absolute;
          top: calc(100% + 20px);
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          width: 560px;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition:
            opacity 0.26s ease,
            transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94),
            visibility 0.26s;
          z-index: 200;
        }
        .nb-mega::before {
          content: '';
          position: absolute;
          top: -20px; left: 0;
          width: 100%; height: 20px;
        }
        .nb-products:hover .nb-mega {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
          pointer-events: all;
        }

        .nb-mega-inner {
          background: #fdfaf5;
          border: 1px solid rgba(168,114,42,0.14);
          border-radius: 12px;
          overflow: hidden;
          box-shadow:
            0 24px 64px rgba(50,28,5,0.12),
            0 4px 16px rgba(50,28,5,0.07);
        }

        .nb-mega-topline {
          height: 2px;
          background: linear-gradient(90deg, #a8722a, #d4a444, #a8722a);
        }

        .nb-mega-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 28px 0 24px;
        }

        .nb-mega-col { padding: 0 28px; }
        .nb-mega-col:first-child { border-right: 1px solid rgba(168,114,42,0.1); }

        .nb-mega-section { margin-bottom: 22px; }
        .nb-mega-section:last-child { margin-bottom: 0; }

        .nb-cat-title {
          font-family: 'Jost', sans-serif;
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #a8722a;
          margin-bottom: 10px;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(168,114,42,0.12);
        }

        .nb-mega-link {
          display: flex;
          align-items: center;
          gap: 0;
          font-family: 'Jost', sans-serif;
          font-size: 0.88rem;
          font-weight: 400;
          letter-spacing: 0.02em;
          color: #3a2a14;
          padding: 5px 0;
          text-decoration: none;
          transition: color 0.2s ease, padding-left 0.24s cubic-bezier(0.34,1.56,0.64,1);
          position: relative;
        }
        .nb-mega-link::before {
          content: '';
          display: inline-block;
          width: 0; height: 1px;
          background: #a8722a;
          transition: width 0.22s cubic-bezier(0.34,1.56,0.64,1), margin-right 0.22s;
          vertical-align: middle;
          margin-right: 0;
          flex-shrink: 0;
        }
        .nb-mega-link:hover { color: #a8722a; padding-left: 6px; }
        .nb-mega-link:hover::before { width: 10px; margin-right: 6px; }

        .nb-mega-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 28px;
          border-top: 1px solid rgba(168,114,42,0.1);
          background: linear-gradient(90deg, #fdf0e0, #fef8f2);
        }
        .nb-mega-footer-text {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 0.8rem;
          color: #c8a060;
          letter-spacing: 0.02em;
        }
        .nb-mega-footer-link {
          font-family: 'Jost', sans-serif;
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #a8722a;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: opacity 0.2s;
        }
        .nb-mega-footer-link:hover { opacity: 0.65; }

        .nb-cta {
          font-family: 'Jost', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #fdfaf5;
          background: #1c1208;
          padding: 10px 22px;
          border-radius: 2px;
          text-decoration: none;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
          display: inline-block;
          transition: box-shadow 0.3s, transform 0.25s;
          box-shadow: 0 2px 12px rgba(28,18,8,0.18);
        }
        .nb-cta::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #a8722a, #d4a444);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .nb-cta:hover::after { opacity: 1; }
        .nb-cta:hover { box-shadow: 0 6px 22px rgba(168,114,42,0.36); transform: translateY(-1px); }
        .nb-cta span { position: relative; z-index: 1; }

        /* ── Mobile ── */
        .nb-mob-section {
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.28s ease;
        }
        .nb-mob-section.open  { max-height: 1000px; opacity: 1; }
        .nb-mob-section.closed { max-height: 0; opacity: 0; }

        .nb-mob-link {
          display: block;
          font-family: 'Jost', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.11em;
          text-transform: uppercase;
          color: #2e200e;
          padding: 10px 14px;
          border-radius: 6px;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
        }
        .nb-mob-link:hover { background: rgba(168,114,42,0.07); color: #a8722a; }

        .nb-mob-sub {
          display: block;
          font-family: 'Jost', sans-serif;
          font-size: 0.86rem;
          font-weight: 400;
          color: #4a3418;
          padding: 7px 10px;
          border-radius: 5px;
          text-decoration: none;
          transition: background 0.18s, color 0.18s;
        }
        .nb-mob-sub:hover { background: rgba(168,114,42,0.07); color: #a8722a; }

        .nb-mob-cat-title {
          font-family: 'Jost', sans-serif;
          font-size: 0.56rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #a8722a;
          margin-bottom: 5px;
        }

        .nb-shell {
          transition: background 0.4s ease, box-shadow 0.4s ease;
        }
      `}</style>

      <nav className="nb nb-shell fixed w-full top-0 z-50"
        style={{
          background: scrolled ? "rgba(253,250,245,0.97)" : "#fdfaf5",
          backdropFilter: "blur(16px)",
          boxShadow: scrolled
            ? "0 4px 28px rgba(80,45,5,0.09), 0 1px 0 rgba(168,114,42,0.12)"
            : "0 1px 0 rgba(168,114,42,0.12)",
        }}
      >
        {/* ── MARQUEE ── */}
        <div style={{
          background: "linear-gradient(90deg,#fdf0e0,#fef6ea,#fdf0e0)",
          borderBottom: "1px solid rgba(168,114,42,0.13)",
          overflow: "hidden",
          padding: "6px 0",
        }}>
          <div className="nb-marquee-track">
            {[
              "🪔 Exporting Premium Indian Handicrafts Worldwide",
              "✦ Authentic Handcrafted Products",
              "🌍 Worldwide Shipping  ·  Custom Orders  ·  Bulk Pricing",
              "✦ Direct from Indian Artisans",
              "🪔 Exporting Premium Indian Handicrafts Worldwide",
              "✦ Authentic Handcrafted Products",
              "🌍 Worldwide Shipping  ·  Custom Orders  ·  Bulk Pricing",
              "✦ Direct from Indian Artisans",
            ].map((t, i) => (
              <span key={i} style={{
                display: "inline-block",
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 500,
                letterSpacing: "0.14em",
                color: "#9a6218",
                padding: "0 44px",
                whiteSpace: "nowrap",
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* ── MAIN BAR ── */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-[64px]">

            <Link href="/" className="flex items-center group flex-shrink-0">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <Image
                  src="/images/image-logo.png"
                  alt="Livora Crafts"
                  width={73}
                  height={73}
                  className="object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
                  priority
                />
              </div>
            </Link>

            {/* ── DESKTOP LINKS ── */}
            <div className="hidden lg:flex items-center gap-9">
              <Link href="/" className="nb-link">Home</Link>
              <Link href="/about" className="nb-link">About Us</Link>

              <div className="nb-products">
                <div className="nb-link flex items-center cursor-pointer select-none" style={{ textDecoration: "none" }}>
                  Products
                  <svg className="nb-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 3.5l3.5 3 3.5-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                <div className="nb-mega">
                  <div className="nb-mega-inner">
                    <div className="nb-mega-topline" />
                    <div className="nb-mega-grid">
                      <div className="nb-mega-col">
                        {categories.slice(0, 2).map((cat) => (
                          <div key={cat.title} className="nb-mega-section">
                            <div className="nb-cat-title">{cat.title}</div>
                            {cat.items.map((item) => (
                              <Link key={item} href={`/products/${item.toLowerCase().replace(/\s+/g, "-")}`} className="nb-mega-link">
                                {item}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                      <div className="nb-mega-col">
                        {categories.slice(2, 4).map((cat) => (
                          <div key={cat.title} className="nb-mega-section">
                            <div className="nb-cat-title">{cat.title}</div>
                            {cat.items.map((item) => (
                              <Link key={item} href={`/products/${item.toLowerCase().replace(/\s+/g, "-")}`} className="nb-mega-link">
                                {item}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="nb-mega-footer">
                      <span className="nb-mega-footer-text">Handcrafted with love in India</span>
                      <Link href="/products/coasters" className="nb-mega-footer-link">
                        View All
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M1 5h8M5.5 1.5l3.5 3.5-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/respect" className="nb-link">Respect</Link>
              <Link href="/blog" className="nb-link">Blog</Link>
              <Link href="/catalogue" className="nb-cta ml-1"><span>Get Catalogue</span></Link>
            </div>

            {/* ── MOBILE HAMBURGER ── */}
            <button
              className="lg:hidden p-2 rounded-lg transition"
              onClick={() => setIsOpen(!isOpen)}
              style={{
                color: "#3a2a14",
                background: isOpen ? "rgba(168,114,42,0.07)" : "transparent",
              }}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12"/>
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16M4 18h16"/>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU — SCROLLABLE FIX ── */}
        {isOpen && (
          <div style={{
            background: "#fdfaf5",
            borderTop: "1px solid rgba(168,114,42,0.12)",
            boxShadow: "0 16px 40px rgba(50,28,5,0.1)",
            maxHeight: "70vh",        /* ← screen ka 70% tak hi */
            overflowY: "auto",        /* ← scroll enable */
            WebkitOverflowScrolling: "touch", /* ← smooth iOS scroll */
          }}>
            <div className="px-5 py-5 space-y-0.5">
              {[{ href: "/", label: "Home" }, { href: "/about", label: "About Us" }].map(({ href, label }) => (
                <Link key={href} href={href} className="nb-mob-link">{label}</Link>
              ))}

              <div>
                <button
                  onClick={() => setOpenMenu(openMenu === "products" ? "" : "products")}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg transition"
                  style={{
                    fontFamily: "'Jost',sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    letterSpacing: "0.11em",
                    textTransform: "uppercase",
                    color: "#2e200e",
                    background: openMenu === "products" ? "rgba(168,114,42,0.07)" : "transparent",
                  }}
                >
                  Products
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                    style={{
                      transform: openMenu === "products" ? "rotate(180deg)" : "rotate(0)",
                      transition: "transform 0.32s cubic-bezier(0.34,1.56,0.64,1)",
                      color: "#a8722a",
                    }}
                  >
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <div className={`nb-mob-section ${openMenu === "products" ? "open" : "closed"}`}>
                  <div className="ml-3 mt-2 pl-4" style={{ borderLeft: "2px solid rgba(168,114,42,0.14)" }}>
                    {categories.map(({ title, items }) => (
                      <div key={title} className="mb-4 mt-3">
                        <p className="nb-mob-cat-title">{title}</p>
                        {items.map((item) => (
                          <Link key={item} href={`/products/${item.toLowerCase().replace(/\s+/g, "-")}`} className="nb-mob-sub">
                            {item}
                          </Link>
                        ))}
                      </div>
                    ))}
                    <Link
                      href="/products"
                      className="flex items-center gap-1.5 px-2 py-2 mb-2"
                      style={{
                        fontFamily: "'Jost',sans-serif",
                        fontSize: "0.62rem",
                        fontWeight: 600,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#a8722a",
                      }}
                    >
                      View All Products →
                    </Link>
                  </div>
                </div>
              </div>

              {[{ href: "/respect", label: "Respect" }, { href: "/blog", label: "Blog" }].map(({ href, label }) => (
                <Link key={href} href={href} className="nb-mob-link">{label}</Link>
              ))}

              <div className="pt-4 pb-1">
                <Link href="/catalogue" className="nb-cta block w-full text-center">
                  <span>Get Catalogue</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}