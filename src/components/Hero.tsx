import React from 'react';
import { Sparkles, Percent, Truck, Headphones, ArrowRight, Tag } from 'lucide-react';

const features = [
  { title: 'Personalizados', icon: Sparkles },
  { title: 'Descuentos x Cantidad', icon: Percent },
  { title: 'Envíos en Ciudad de Córdoba', icon: Truck },
  { title: 'ATENCIÓN AL CLIENTE', icon: Headphones }
];

const Hero: React.FC = () => {
  return (
    <section 
      className="relative bg-[#0A0A0A] pt-16 pb-0 overflow-hidden min-h-[55vh] lg:min-h-[70vh] flex flex-col bg-cover bg-[center_top_25%] bg-no-repeat"
      style={{ backgroundImage: "url('/backgroundhero.png')" }}
    >
      {/* Overlay para asegurar legibilidad si la imagen es clara */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      <div className="container mx-auto px-4 flex-grow flex items-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full py-4">
          {/* Left Content */}
          <div className="z-10">
            <div className="flex items-center gap-2 mb-2">
              <Tag size={14} className="text-[#B8860B]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B8860B]">Promoción Especial</span>
            </div>
            
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-white mb-1">
              Día del Padre
            </h1>
            <h2 className="font-playfair text-xl md:text-3xl font-medium text-[#B8860B] mb-3">
              Celebra a quienes siempre están.
            </h2>
            
            <p className="text-sm md:text-base text-white/90 max-w-md mb-6 leading-relaxed">
              Sorprende a tus colaboradores con un regalo significativo que reconoce su esfuerzo y dedicación.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#combos"
                className="flex items-center gap-2 rounded-md bg-[#B8860B] px-6 py-3 text-xs md:text-sm font-bold text-white transition hover:bg-[#966d09]"
              >
                Ver combos destacados
                <ArrowRight size={18} />
              </a>
            </div>
          </div>

          {/* Right Column - Empty as requested to show background */}
          <div className="hidden lg:block"></div>
        </div>
      </div>

      {/* Compact Features Bar */}
      <div className="bg-black/50 backdrop-blur-sm border-t border-white/10 py-3 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex items-center gap-3">
                  <Icon size={16} className="text-[#B8860B] shrink-0" />
                  <span className="text-[10px] md:text-[11px] font-bold text-white/80 uppercase tracking-wider">{feature.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;