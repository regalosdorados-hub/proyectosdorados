
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
        isScrolled ? 'navbar-blur shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center page-transition">
            <span className="font-petit text-mandarina text-2xl md:text-3xl">Mandarina</span>
            <span className="font-playfair ml-1 text-xl md:text-2xl">Delantales y algo más...</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <NavLink to="/">Inicio</NavLink>
<<<<<<< Updated upstream
            <NavLink to="/delantales-gastronomico">Gastronómico</NavLink>
=======
            <NavLink to="/delantales-bachero">Gastronómíco</NavLink>
            <NavLink to="/delantales-tela">Tela</NavLink>
>>>>>>> Stashed changes
            <NavLink to="/delantales-peluqueria">Peluquería</NavLink>
            <NavLink to="/delantales-veterinaria">Veterinaria</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-800 hover:text-mandarina focus:outline-none"
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
          <div className="md:hidden bg-white py-4 mt-3 rounded-lg shadow-lg fade-in">
            <div className="flex flex-col items-center space-y-4">
              <MobileNavLink to="/" onClick={toggleMobileMenu}>Inicio</MobileNavLink>
              <MobileNavLink to="/delantales-gastronomico" onClick={toggleMobileMenu}>Gastronómico</MobileNavLink>
              <MobileNavLink to="/delantales-peluqueria" onClick={toggleMobileMenu}>Peluquería</MobileNavLink>
              <MobileNavLink to="/delantales-veterinaria" onClick={toggleMobileMenu}>Veterinaria</MobileNavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

type NavLinkProps = {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => {
  return (
    <Link 
      to={to} 
      className="text-gray-800 font-medium hover:text-mandarina page-transition"
    >
      {children}
    </Link>
  );
};

type MobileNavLinkProps = NavLinkProps & {
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, children, onClick }) => {
  return (
    <Link 
      to={to} 
      className="text-gray-800 font-medium hover:text-mandarina py-2 w-full text-center page-transition"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar;
