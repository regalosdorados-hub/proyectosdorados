import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import PersonalizationSection from '../components/PersonalizationSection';
import HowItWorks from '../components/HowItWorks';
import CompaniesSection from '../components/CompaniesSection';
import FAQ from '../components/FAQ';
import WhatsAppButton from '../components/WhatsAppButton';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <FeaturedProducts />
        <PersonalizationSection />
        <HowItWorks />
        <CompaniesSection />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;