import Navbar from '@/components/layout/Navbar';
import AboutHero from '@/components/about/AboutHero';
import WhyWeExist from '@/components/about/WhyWeExist';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutHero />
      <WhyWeExist/>
      <Footer/>
    </main>
  );
}