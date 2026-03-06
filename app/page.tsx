import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/home/HeroSection';
import CraftingSection from '@/components/home/CraftingSection';
import ProductShowcase from '@/components/home/ProductShowcase';
import GallerySection from '@/components/home/GallerySection';
import CatalogueSection from '@/components/home/CatalogueSection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <CraftingSection />
      <ProductShowcase />
      <GallerySection />
      <CatalogueSection />
      <Footer/>
    </main>
  );
}
