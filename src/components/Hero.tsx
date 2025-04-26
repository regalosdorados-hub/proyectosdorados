
import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-white pt-24 md:pt-32 pb-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-800 leading-tight">
              Elegancia y<br />
              <span className="text-mandarina">función</span> en<br />
              cada detalle.
            </h1>
            
            <p className="mt-6 text-lg text-gray-600 max-w-md">
              Descubre nuestra colección de delantales artesanales diseñados 
              para profesionales que valoran la calidad y la estética.
            </p>
            
            <div className="mt-10 space-x-4">
              <Link 
                to="/delantales-bachero" 
                className="px-6 py-3 bg-mandarina text-white rounded-lg font-medium hover:bg-mandarina-dark transition-colors duration-300"
              >
                Ver colección
              </Link>
              <a
                href="https://wa.me/5491100000000?text=Hola!%20Me%20interesa%20conocer%20más%20sobre%20sus%20delantales"
                target="_blank"
                rel="noopener noreferrer" 
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-300"
              >
                Contactar
              </a>
            </div>
          </div>
          
          <div className="order-1 md:order-2 relative">
            <div className="relative z-10 animate-float">
              <img 
                src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=1974&auto=format&fit=crop" 
                alt="Delantal Premium" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
              
              <div className="absolute -bottom-8 -left-8 w-24 h-24 md:w-32 md:h-32 bg-mandarina/10 rounded-full"></div>
              <div className="absolute -top-8 -right-8 w-16 h-16 md:w-24 md:h-24 bg-mandarina/20 rounded-full"></div>
            </div>
            
            {/* Sketch illustrations */}
            <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-32 md:h-32 opacity-30 pencil-sketch">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" stroke="currentColor" strokeWidth="2"
                  d="M39.2,-65.8C50,-60,57.9,-47.8,65.9,-34.9C73.9,-22,82.1,-8.5,82.3,5.4C82.5,19.3,74.8,33.5,65.1,45.8C55.4,58.1,43.8,68.4,30.3,73.4C16.9,78.4,1.5,78.2,-14.2,76.4C-29.9,74.6,-46,71.2,-56.8,61.6C-67.6,52.1,-73.2,36.5,-77.7,20.7C-82.2,4.8,-85.7,-11.2,-81.7,-25.2C-77.6,-39.1,-66.1,-51.1,-52.9,-56C-39.6,-60.9,-24.7,-58.8,-10.4,-57.6C3.9,-56.3,28.3,-71.7,39.2,-65.8Z">
                </path>
              </svg>
            </div>
            <div className="absolute bottom-1/3 -left-12 w-24 h-24 md:w-36 md:h-36 opacity-20 pencil-sketch">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" stroke="currentColor" strokeWidth="2"
                  d="M42.1,-72.5C53.9,-67,62.7,-54.2,69.9,-40.8C77.1,-27.5,82.7,-13.7,83.3,0.3C83.8,14.4,79.2,28.8,71.2,40.5C63.2,52.3,51.8,61.4,39.1,69.9C26.5,78.3,13.2,86.1,-0.5,86.9C-14.2,87.8,-28.4,81.7,-40.7,73C-53,64.3,-63.3,52.9,-71.3,39.8C-79.3,26.8,-85,13.4,-86,0.8C-86,-11.8,-80.8,-23.6,-73.6,-34C-66.5,-44.3,-57.3,-53.2,-46,-59.4C-34.7,-65.6,-21.3,-68.9,-7.2,-67.9C6.9,-66.9,30.3,-78,42.1,-72.5Z">
                </path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
