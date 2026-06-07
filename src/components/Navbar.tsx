
import React, { useState, useEffect } from 'react';
import { ShoppingCart, MessageCircle } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 shadow-2xl py-3 backdrop-blur-xl' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex flex-wrap items-center justify-between gap-4 py-4">
          <a href="#top" className="page-transition inline-flex items-center">
            <img src="/RegalosDoradosLogotype.png" alt="Regalos Dorados" className="h-24 w-auto max-h-[56px]" />
          </a>

          <div className="flex items-center gap-3">
            <a
              href="/cart"
              className="inline-flex items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/10 p-2 text-amber-200 transition hover:bg-amber-300/20 hover:text-amber-100"
              aria-label="Carrito"
            >
              <ShoppingCart size={16} />
            </a>
            <a
              href="https://wa.me/5492901464534?text=Hola!%20Quiero%20escribir%20por%20Whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-100 transition hover:border-amber-300 hover:text-amber-300"
            >
              <MessageCircle size={14} />
              Whatsapp
            </a>
          </div>

        </nav>
      </div>
    </header>
  );
};

export default Navbar;
