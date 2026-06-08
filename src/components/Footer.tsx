import React from 'react';
import { MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#070707] pt-16 pb-10 text-slate-300">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-10">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-3">
                <span className="font-petit text-3xl text-amber-300">Regalos Dorados</span>
                <span className="font-playfair text-lg text-slate-200">Regalos corporativos premium</span>
              </div>
              <p className="mt-4 text-slate-400 max-w-sm">
                Solución integral para elegir, personalizar y enviar regalos que reconocen el talento y fortalecen tu marca empleadora.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-playfair text-white font-medium mb-3">Secciones</h3>
                <ul className="space-y-2">
                  <FooterLink to="#combos">Combos destacados</FooterLink>
                  <FooterLink to="#como-funciona">Cómo funciona</FooterLink>
                  <FooterLink to="#empresas">Empresas</FooterLink>
                </ul>
              </div>
              
              <div>
                <h3 className="font-playfair text-white font-medium mb-3">Contacto</h3>
                <p className="text-slate-400 mb-1">Córdoba, Argentina</p>
                <a 
                  href="https://wa.me/5493516420000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-2"
                >
                  <MessageCircle size={16} />
                  <span className="break-all">+54 9 351 6420000</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-10 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3">
              <p className="text-slate-500 text-sm">
                © Regalos Dorados 2026
              </p>
              <p className="text-slate-500 text-sm">
                Desarrollado por <a 
                  href="https://naiam.studio" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-amber-300 hover:underline"
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
        className="text-slate-400 hover:text-amber-300 transition-colors"
      >
        {children}
      </a>
    </li>
  );
};

export default Footer;