"use client";

import Link from "next/link";
import { useState } from "react";

type Props = {
  category: string;
};

const categorySections = [
  {
    title: "Tableware & Kitchen",
    emoji: "🍽",
    items: [
      { slug: "coasters", name: "Coasters" },
      { slug: "serving-platters", name: "Serving Platters" },
      { slug: "chopping-board", name: "Chopping Board" },
      { slug: "napkin-holders", name: "Napkin Holders" },
    ],
  },
  {
    title: "Office Accessories",
    emoji: "🖊",
    items: [
      { slug: "desk-organizers", name: "Desk Organizers" },
      { slug: "pen-holder", name: "Pen Holder" },
      { slug: "phone-holder", name: "Phone Stands" },
    ],
  },
  {
    title: "Home Decor",
    emoji: "🪔",
    items: [
      { slug: "candle-holders", name: "Candle Holders" },
      { slug: "globes", name: "Globes" },
      { slug: "decor-objects", name: "Decor Objects" },
    ],
  },
  {
    title: "Storage & Utility",
    emoji: "📦",
    items: [
      { slug: "storage-boxes", name: "Storage Boxes" },
      { slug: "photo-frames", name: "Photo Frames" },
      { slug: "wooden-games", name: "Wooden Games" },
    ],
  },
];

export default function ProductSidebar({ category }: Props) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggle = (title: string) => {
    setCollapsed((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        .sidebar-root {
          font-family: 'DM Sans', sans-serif;
        }

        .sidebar-item {
          position: relative;
          overflow: hidden;
          transition: all 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .sidebar-item::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #fdf3e3 0%, #fef9f1 100%);
          opacity: 0;
          transition: opacity 0.25s ease;
          border-radius: 10px;
        }

        .sidebar-item:hover::before,
        .sidebar-item.active::before {
          opacity: 1;
        }

        .sidebar-item-inner {
          position: relative;
          z-index: 1;
        }

        .sidebar-item .left-bar {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 0;
          background: linear-gradient(180deg, #c8922a, #e8b84b);
          border-radius: 0 2px 2px 0;
          transition: height 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .sidebar-item:hover .left-bar,
        .sidebar-item.active .left-bar {
          height: 65%;
        }

        .sidebar-item .arrow-icon {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.2s ease;
          color: #ccc;
        }

        .sidebar-item:hover .arrow-icon,
        .sidebar-item.active .arrow-icon {
          transform: translateX(4px);
          color: #c8922a;
        }

        .section-items {
          overflow: hidden;
          transition: max-height 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      opacity 0.28s ease;
        }

        .section-items.open {
          max-height: 300px;
          opacity: 1;
        }

        .section-items.closed {
          max-height: 0;
          opacity: 0;
        }

        .section-header {
          cursor: pointer;
          transition: color 0.2s ease;
          user-select: none;
        }

        .section-header:hover .section-title-text {
          color: #8B6340;
        }

        .chevron {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          color: #bbb;
        }

        .chevron.open {
          transform: rotate(180deg);
          color: #c8922a;
        }

        .sidebar-card {
          background: #fdfaf5;
          border: 1px solid rgba(180, 150, 100, 0.14);
          box-shadow:
            0 4px 24px rgba(0,0,0,0.06),
            0 1px 4px rgba(0,0,0,0.04),
            inset 0 1px 0 rgba(255,255,255,0.8);
        }

        .brand-badge {
          background: linear-gradient(135deg, #1a1208 0%, #2d1f0a 100%);
        }

        .gold-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c8922a, #e8b84b);
          flex-shrink: 0;
        }

        /* Scrollbar */
        .sidebar-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: rgba(200,146,42,0.25);
          border-radius: 4px;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(200,146,42,0.5);
        }
      `}</style>

      <div className="sidebar-root hidden lg:block">
        <div
          className="sidebar-card sidebar-scroll rounded-2xl sticky top-32 overflow-y-auto"
          style={{ maxHeight: "82vh" }}
        >

          {/* ── HEADER ── */}
          <div className="px-5 pt-6 pb-4">
            <div className="flex items-center gap-2.5 mb-1">
              <div className="gold-dot" />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "#1a1208",
                  letterSpacing: "0.01em",
                }}
              >
                Collections
              </span>
            </div>
            <p
              style={{
                fontSize: "0.68rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#b07d45",
                fontWeight: 500,
                paddingLeft: "18px",
              }}
            >
              Browse by category
            </p>
            {/* Gold rule */}
            <div
              className="mt-3"
              style={{
                height: "1px",
                background:
                  "linear-gradient(90deg, #c8922a 0%, rgba(200,146,42,0.1) 100%)",
              }}
            />
          </div>

          {/* ── SECTIONS ── */}
          <div className="px-4 pb-4 space-y-1">
            {categorySections.map((section, sIdx) => {
              const isOpen = collapsed[section.title] !== true; // default open

              return (
                <div key={section.title}>

                  {/* Section Header — collapsible */}
                  <div
                    className="section-header flex items-center justify-between px-2 py-2.5 rounded-lg"
                    onClick={() => toggle(section.title)}
                  >
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: "0.85rem" }}>{section.emoji}</span>
                      <span
                        className="section-title-text"
                        style={{
                          fontSize: "0.68rem",
                          letterSpacing: "0.13em",
                          textTransform: "uppercase",
                          color: "#9c7a52",
                          fontWeight: 600,
                          transition: "color 0.2s",
                        }}
                      >
                        {section.title}
                      </span>
                    </div>

                    <svg
                      className={`chevron ${isOpen ? "open" : ""}`}
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                    >
                      <path
                        d="M2.5 4.5l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {/* Section Items */}
                  <div className={`section-items ${isOpen ? "open" : "closed"}`}>
                    <ul className="space-y-0.5 pb-2">
                      {section.items.map((item, iIdx) => {
                        const isActive = category === item.slug;

                        return (
                          <li key={item.slug}>
                            <Link
                              href={`/products/${item.slug}`}
                              className={`sidebar-item block rounded-xl ${isActive ? "active" : ""}`}
                              style={{
                                animationDelay: `${sIdx * 60 + iIdx * 30}ms`,
                              }}
                            >
                              <div className="left-bar" />
                              <div
                                className="sidebar-item-inner flex items-center justify-between px-4 py-2.5"
                              >
                                <span
                                  style={{
                                    fontSize: "0.85rem",
                                    fontWeight: isActive ? 600 : 400,
                                    color: isActive ? "#c8922a" : "#3d2e1a",
                                    transition: "color 0.2s, font-weight 0.2s",
                                  }}
                                >
                                  {item.name}
                                </span>

                                <svg
                                  className="arrow-icon"
                                  width="14"
                                  height="14"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                >
                                  <path
                                    d="M2 7h10M8 3l4 4-4 4"
                                    stroke="currentColor"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Divider between sections */}
                  {sIdx < categorySections.length - 1 && (
                    <div
                      style={{
                        height: "1px",
                        margin: "2px 8px 4px",
                        background: "rgba(180,150,100,0.1)",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* ── BOTTOM BRAND BADGE ── */}
          <div className="mx-4 mb-5">
            <div
              className="brand-badge rounded-xl px-4 py-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="gold-dot" />
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: "#f5efe6",
                    letterSpacing: "0.02em",
                  }}
                >
                  Custom Orders
                </span>
              </div>
              <p
                style={{
                  fontSize: "0.71rem",
                  color: "rgba(245,239,230,0.6)",
                  lineHeight: 1.6,
                  marginBottom: "12px",
                }}
              >
                Need bulk or branded products? We craft to your vision.
              </p>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full py-2 rounded-lg"
                style={{
                  background: "linear-gradient(135deg, #c8922a 0%, #e8b84b 100%)",
                  color: "#1a1208",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  transition: "opacity 0.2s",
                }}
              >
                Get in Touch
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path
                    d="M1 5.5h9M6 1.5l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}