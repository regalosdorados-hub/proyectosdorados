
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

          <div className="hidden xl:flex flex-1 justify-center items-center gap-8 text-[0.95rem] text-slate-100">
            <NavLink href="#combos">Combos</NavLink>
            <NavLink href="#categorias">Categorías</NavLink>
            <NavLink href="#como-funciona">Cómo funciona</NavLink>
            <NavLink href="#empresas">Empresas</NavLink>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/cart"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-slate-100 transition hover:border-amber-300 hover:text-amber-300"
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

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white hover:text-mandarina focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="h-6 w-6"
            >
              {isMobileMenuOpen 
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              }
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900 py-4 mt-3 rounded-3xl shadow-2xl fade-in border border-white/10">
            <div className="flex flex-col items-center space-y-4">
              <MobileNavLink href="#top" onClick={toggleMobileMenu}>Inicio</MobileNavLink>
              <MobileNavLink href="#combos" onClick={toggleMobileMenu}>Combos</MobileNavLink>
              <MobileNavLink href="#categorias" onClick={toggleMobileMenu}>Categorías</MobileNavLink>
              <MobileNavLink href="#como-funciona" onClick={toggleMobileMenu}>Cómo funciona</MobileNavLink>
              <MobileNavLink href="#empresas" onClick={toggleMobileMenu}>Empresas</MobileNavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <a 
      href={href} 
      className="text-white font-medium hover:text-mandarina page-transition"
    >
      {children}
    </a>
  );
};

type MobileNavLinkProps = NavLinkProps & {
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, children, onClick }) => {
  return (
    <a 
      href={href} 
      className="text-white font-medium hover:text-mandarina py-2 w-full text-center page-transition"
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default Navbar;
