import React from 'react';

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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-playfair text-gray-800 font-medium mb-3">Categorías</h3>
                <ul className="space-y-2">
                  <FooterLink to="/delantales-bachero">Delantales Bachero</FooterLink>
                  <FooterLink to="/delantales-tela">Delantales de Tela</FooterLink>
                  <FooterLink to="/delantales-peluqueria">Delantales Peluquería</FooterLink>
                  <FooterLink to="/delantales-veterinaria">Delantales Veterinaria</FooterLink>
                </ul>
              </div>
              
              <div className="col-span-1 md:col-span-2 mt-6 md:mt-0">
                <h3 className="font-playfair text-gray-800 font-medium mb-3">Síguenos</h3>
                <div className="flex space-x-4">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-mandarina">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.272.636 1.772 1.136.5.5.886 1.104 1.136 1.772.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427.466.668.25 1.272.636 1.772 1.136.5.5 1.104.886 1.772 1.136.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.9 2 12.33 2h-.015zm-.667 1.8h.752c2.673 0 2.99.01 4.045.058.976.045 1.505.207 1.858.344.466.182.8.398 1.15.748.35.35.566.684.748 1.15.137.353.3.882.344 1.857.048 1.055.058 1.37.058 4.041 0 2.67-.01 2.986-.058 4.041-.045.976-.207 1.505-.344 1.858a3.1 3.1 0 01-.748 1.15c-.35.35-.683.566-1.15.748-.353.137-.882.3-1.857.344-1.054.048-1.37-.058-4.042.058-2.67 0-2.987-.01-4.04-.058-.977-.045-1.505-.207-1.858-.344a3.098 3.098 0 01-1.15-.748 3.098 3.098 0 01-.748-1.15c-.137-.353-.3-.882-.344-1.857-.048-1.056-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.045-.977.207-1.505.344-1.858.182-.466.398-.8.748-1.15.35-.35.683-.566 1.15-.748.353-.137.882-.3 1.857-.344 1.054-.048 1.37-.058 4.041-.058zm-.747 3.06a6.14 6.14 0 100 12.28 6.14 6.14 0 000-12.28zm0 10.12a3.98 3.98 0 110-7.96 3.98 3.98 0 010 7.96zM16.5 6.96a1.44 1.44 0 100-2.88 1.44 1.44 0 000 2.88z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-mandarina">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-mandarina">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="font-playfair text-gray-800 font-medium mb-3">Contacto</h3>
                <p className="text-gray-600 mb-1">Buenos Aires, Argentina</p>
                <a href="mailto:info@mandarinadelantales.com" className="text-gray-600 hover:text-mandarina transition-colors break-all">
                  info@mandarinadelantales.com
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
