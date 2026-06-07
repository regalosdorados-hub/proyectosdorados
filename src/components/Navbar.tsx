import React, { useState, useEffect } from 'react';
import { ShoppingCart, ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 shadow-xl py-2' : 'bg-black/40 backdrop-blur-sm py-3'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo - Only Image */}
          <a href="/" className="flex items-center">
            <img src="/RegalosDoradosLogotype.png" alt="Regalos Dorados" className="h-10 md:h-12 w-auto" />
          </a>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#combos" className="text-sm font-medium text-amber-500 border-b-2 border-amber-500 pb-1">Combos</a>
            <div className="flex items-center gap-1 cursor-pointer group">
              <span className="text-sm font-medium text-white/90 group-hover:text-amber-500 transition-colors">Categorías</span>
              <ChevronDown size={14} className="text-white/60 group-hover:text-amber-500" />
            </div>
            <a href="#" className="text-sm font-medium text-white/90 hover:text-amber-500 transition-colors">Personalización</a>
            <a href="#como-funciona" className="text-sm font-medium text-white/90 hover:text-amber-500 transition-colors">Cómo funciona</a>
            <a href="#empresas" className="text-sm font-medium text-white/90 hover:text-amber-500 transition-colors">Empresas</a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="relative flex items-center gap-2 text-white/90 hover:text-amber-500 cursor-pointer transition-colors">
              <ShoppingCart size={18} />
              <span className="text-xs font-medium hidden sm:inline">Carrito</span>
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-black">0</span>
            </div>
            <a
              href="https://wa.me/5492901464534"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-[#B8860B] px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white transition hover:bg-[#966d09]"
            >
              Solicitar cotización
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;