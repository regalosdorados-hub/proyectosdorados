import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, ChevronDown } from 'lucide-react';

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
        isScrolled ? 'bg-black/95 shadow-xl py-2' : 'bg-black/40 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <img src="/RegalosDoradosLogotype.png" alt="Regalos Dorados" className="h-12 w-auto" />
            <div className="flex flex-col leading-none">
              <span className="font-playfair text-xl font-bold tracking-wider text-white">REGALOS</span>
              <span className="font-playfair text-xl font-bold tracking-wider text-amber-500">DORADOS</span>
            </div>
          </a>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#combos" className="text-sm font-medium text-amber-500 border-b-2 border-amber-500 pb-1">Combos</a>
            <div className="flex items-center gap-1 cursor-pointer group">
              <span className="text-sm font-medium text-white/90 group-hover:text-amber-500 transition-colors">Categorías</span>
              <ChevronDown size={14} className="text-white/60 group-hover:text-amber-500" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer group">
              <span className="text-sm font-medium text-white/90 group-hover:text-amber-500 transition-colors">Ocasiones</span>
              <ChevronDown size={14} className="text-white/60 group-hover:text-amber-500" />
            </div>
            <a href="#" className="text-sm font-medium text-white/90 hover:text-amber-500 transition-colors">Personalización</a>
            <a href="#como-funciona" className="text-sm font-medium text-white/90 hover:text-amber-500 transition-colors">Cómo funciona</a>
            <a href="#empresas" className="text-sm font-medium text-white/90 hover:text-amber-500 transition-colors">Empresas</a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-white/90 hover:text-amber-500 cursor-pointer transition-colors">
              <User size={18} />
              <span className="text-xs font-medium">Mi cuenta</span>
            </div>
            <div className="relative flex items-center gap-2 text-white/90 hover:text-amber-500 cursor-pointer transition-colors">
              <ShoppingCart size={18} />
              <span className="text-xs font-medium">Carrito</span>
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-black">0</span>
            </div>
            <a
              href="https://wa.me/5492901464534"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block rounded-md bg-[#B8860B] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#966d09]"
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