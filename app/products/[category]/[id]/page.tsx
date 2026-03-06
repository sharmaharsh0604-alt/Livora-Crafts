"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/libs/products";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category, id } = use(params);

  const product = products.find(
    (p) => p.id === Number(id) && p.category === category
  );

  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const specs = [
    { label: "Material", value: product.material },
    { label: "Finish", value: product.finish },
    { label: "Size", value: product.size },
    { label: "Thickness", value: product.thickness },
    { label: "Usage", value: product.usage },
    { label: "Packaging", value: product.packaging },
  ].filter((s) => s.value);

  return (
    <>
      <Navbar />

      <main
        className="min-h-screen bg-[#F9F6F1]"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", paddingTop: "100px" }}
      >
        {/* ── Breadcrumb ── */}
        <div
          className="px-6 md:px-16 pt-6 pb-4 flex items-center gap-2 text-xs tracking-widest uppercase text-[#9a8570]"
          style={{ fontFamily: "sans-serif" }}
        >
          <Link href="/" className="hover:text-[#6B4B2A]">Home</Link>
          <span>›</span>
          <Link href="/products" className="hover:text-[#6B4B2A]">Products</Link>
          <span>›</span>
          <Link href={`/products/${product.category}`} className="hover:text-[#6B4B2A] capitalize">
            {product.category.replace(/-/g, " ")}
          </Link>
          <span>›</span>
          <span className="text-[#1a1208]">{product.name}</span>
        </div>

        {/* ── Product Section ── */}
        <section className="px-6 md:px-16 py-6 grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* LEFT — Single Image */}
          <div className="aspect-square overflow-hidden bg-[#EDE8E0] relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <span
              className="absolute top-3 left-3 text-[10px] tracking-widest uppercase px-3 py-1 bg-white/80 text-[#6B4B2A]"
              style={{ fontFamily: "sans-serif" }}
            >
              {product.category.replace(/-/g, " ")}
            </span>
          </div>

          {/* RIGHT — Details */}
          <div className="flex flex-col justify-start">

            <p className="text-[11px] tracking-widest uppercase text-[#C4A882] mb-2" style={{ fontFamily: "sans-serif" }}>
              {product.category.replace(/-/g, " ")}
            </p>

            <h1 className="text-3xl md:text-4xl font-light leading-tight text-[#1a1208] mb-4">
              {product.name}
            </h1>

            <div className="h-px bg-gradient-to-r from-[#C4A882] to-transparent mb-6" />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["Handcrafted", "Export Ready", "Artisan Made"].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] tracking-widest uppercase border border-[#C4A882]/40 text-[#6B4B2A] px-3 py-1"
                  style={{ fontFamily: "sans-serif" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Specifications */}
            <p className="text-[11px] tracking-widest uppercase text-[#9a8570] mb-3" style={{ fontFamily: "sans-serif" }}>
              Specifications
            </p>
            <div className="border border-[#C4A882]/20 mb-8">
              {specs.map((s: any, i: number) => (
                <div
                  key={s.label}
                  className={`flex items-start px-4 py-3 gap-4 ${
                    i !== specs.length - 1 ? "border-b border-[#C4A882]/20" : ""
                  }`}
                >
                  <span
                    className="text-[11px] tracking-wider uppercase text-[#9a8570] w-24 flex-shrink-0 pt-0.5"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    {s.label}
                  </span>
                  <span className="text-[1rem] text-[#1a1208]">{s.value}</span>
                </div>
              ))}
            </div>

            {/* Trust row */}
            <div
              className="flex flex-wrap gap-6 text-[11px] tracking-wider uppercase text-[#9a8570]"
              style={{ fontFamily: "sans-serif" }}
            >
              <span>🌿 Sustainably Sourced</span>
              <span>🛡️ Export Safe</span>
              <span>✈️ Worldwide Shipping</span>
            </div>
          </div>
        </section>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <section className="px-6 md:px-16 py-12 border-t border-[#C4A882]/20">
            <p className="text-[11px] tracking-widest uppercase text-[#C4A882] mb-1" style={{ fontFamily: "sans-serif" }}>
              You may also like
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-[#1a1208] mb-8">
              More from this collection
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {related.map((r: any) => (
                <Link key={r.id} href={`/products/${r.category}/${r.id}`} className="group">
                  <div className="aspect-square overflow-hidden bg-[#EDE8E0] mb-3">
                    <img
                      src={r.image}
                      alt={r.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-base text-[#1a1208] group-hover:text-[#6B4B2A] transition-colors">
                    {r.name}
                  </p>
                  <p className="text-[11px] tracking-wider uppercase text-[#9a8570] mt-1" style={{ fontFamily: "sans-serif" }}>
                    {r.material}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}