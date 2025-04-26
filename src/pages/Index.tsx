
import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import CategorySection from '../components/CategorySection';
import WhatsAppButton from '../components/WhatsAppButton';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <FeaturedProducts />
        <CategorySection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
