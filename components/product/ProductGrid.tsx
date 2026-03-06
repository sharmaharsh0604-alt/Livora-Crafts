import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  image: string;
  category: string;
};

type Props = {
  products: Product[];
};

export default function ProductGrid({ products }: Props) {
  return (
    <>
      {/* Google Fonts — Cormorant Garamond (luxury display) + DM Sans (body) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .product-card {
          font-family: 'DM Sans', sans-serif;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .product-card:hover {
          transform: translateY(-6px);
        }
        .product-card-name {
          font-family: 'Cormorant Garamond', serif;
        }
        .product-img-wrap img {
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .product-card:hover .product-img-wrap img {
          transform: scale(1.06);
        }
        .reveal-btn {
          transform: translateY(10px);
          opacity: 0;
          transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .product-card:hover .reveal-btn {
          transform: translateY(0);
          opacity: 1;
        }
        .shimmer-line {
          width: 0;
          transition: width 0.45s ease;
        }
        .product-card:hover .shimmer-line {
          width: 100%;
        }
      `}</style>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.category}/${product.id}`}
            className="product-card group block"
          >
            {/* CARD */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "#fdfaf5",
                boxShadow:
                  "0 2px 20px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
                border: "1px solid rgba(180,150,100,0.13)",
              }}
            >
              {/* ── IMAGE ── */}
              <div
                className="product-img-wrap relative overflow-hidden"
                style={{
                  aspectRatio: "4/3",
                  background:
                    "linear-gradient(135deg, #f5efe6 0%, #ede5d8 100%)",
                }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Warm hover tint */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "rgba(120,80,30,0.06)" }}
                />

                {/* Category pill — top left */}
                <div className="absolute top-3 left-3">
                  <span
                    className="px-3 py-1 rounded-full"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.62rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      background: "rgba(255,255,255,0.88)",
                      color: "#8B6340",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    {product.category}
                  </span>
                </div>

                {/* CTA button — slides up on hover */}
                <div className="reveal-btn absolute bottom-4 left-1/2 -translate-x-1/2">
                  <span
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm whitespace-nowrap"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                      letterSpacing: "0.03em",
                      background: "rgba(20,14,8,0.88)",
                      color: "#f5efe6",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    View Details
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M1 6h10M7 2l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              {/* ── TEXT ── */}
              <div className="px-5 pt-4 pb-5">
                <h3
                  className="product-card-name text-xl font-medium leading-snug transition-colors duration-300 group-hover:text-amber-800"
                  style={{ color: "#1a1208" }}
                >
                  {product.name}
                </h3>

                {/* Animated underline */}
                <div
                  className="mt-2 h-px rounded-full overflow-hidden"
                  style={{ background: "#e8d9c0" }}
                >
                  <div
                    className="shimmer-line h-full rounded-full"
                    style={{ background: "#c8922a" }}
                  />
                </div>

                <div className="flex items-center justify-between mt-3">
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.7rem",
                      letterSpacing: "0.09em",
                      textTransform: "uppercase",
                      color: "#9c7a52",
                      fontWeight: 500,
                    }}
                  >
                    Handcrafted in India
                  </p>

                  <span className="flex items-center gap-1.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "#c8922a" }}
                    />
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.72rem",
                        color: "#b07d45",
                      }}
                    >
                      Artisan made
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}