
import React from 'react';
import { Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <span className="font-petit text-mandarina text-2xl">Mandarina</span>
                <span className="font-playfair ml-1 text-xl">Delantales</span>
              </div>
              <p className="mt-2 text-gray-600 max-w-sm">
                Elegancia y funcionalidad en cada detalle. Delantales artesanales de alta calidad para profesionales.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-playfair text-gray-800 font-medium mb-3">Categorías</h3>
                <ul className="space-y-2">
                  <FooterLink to="/delantales-gastronomico">Delantales Gastronómico</FooterLink>
                  <FooterLink to="/delantales-peluqueria">Delantales Peluquería</FooterLink>
                  <FooterLink to="/delantales-veterinaria">Delantales Veterinaria</FooterLink>
                </ul>
              </div>
              
              <div>
                <h3 className="font-playfair text-gray-800 font-medium mb-3">Contacto</h3>
                <p className="text-gray-600 mb-1">Córdoba, Argentina</p>
                <a href="mailto:info@mandarinadelantales.com" className="text-gray-600 hover:text-mandarina transition-colors break-all">
                  instagram: @mandarinadelantales
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-10 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 text-sm">
                © Mandarina Delantales 2025
              </p>
              <p className="text-gray-600 text-sm mt-2 md:mt-0">
                Desarrollado por <a 
                  href="https://naiam.studio" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-mandarina hover:underline"
                >
                  Naiam Studio
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

type FooterLinkProps = {
  to: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, children }) => {
  return (
    <li>
      <a 
        href={to} 
        className="text-gray-600 hover:text-mandarina transition-colors"
      >
        {children}
      </a>
    </li>
  );
};

export default Footer;
