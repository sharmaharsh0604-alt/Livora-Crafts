import { products } from "@/libs/products";
import { categoryData } from "@/libs/categoryData";
import CategoryHero from "@/components/product/CategoryHero";
import ProductSidebar from "@/components/product/ProductSidebar";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  // Filter products
  const filteredProducts = products.filter(
    (item) => item.category === category
  );

  // Get category data
  const data = categoryData[category as keyof typeof categoryData];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar/>

      {/* HERO */}
      <CategoryHero
        title={data?.title || category}
        image={data?.image || "/images/default.jpg"}
        subtitle="Luxury handcrafted decor for global buyers"
      />

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top Bar (Premium Feel) */}
        <div className="flex items-center justify-between mb-8">

          <p className="text-sm text-gray-600">
            Showing {filteredProducts.length} products
          </p>

          <p className="text-sm text-gray-500">
            Premium handcrafted collection
          </p>

        </div>

        <div className="grid lg:grid-cols-4 gap-10">

          {/* Sidebar */}
          <ProductSidebar category={category} />

          {/* Grid */}
          <div className="lg:col-span-3">
            <ProductGrid products={filteredProducts} />
          </div>

        </div>

      </div>

      <Footer />

    </div>
  );
}