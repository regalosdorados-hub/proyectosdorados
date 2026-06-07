import React from 'react';
import { Sparkles, Percent, Truck, Headphones, ArrowRight, Tag } from 'lucide-react';

const features = [
  { title: 'Personalizados', icon: Sparkles },
  { title: 'Descuentos x Cantidad', icon: Percent },
  { title: 'Envíos a todo el país', icon: Truck },
  { title: 'Atención VIP', icon: Headphones }
];

const Hero: React.FC = () => {
  return (
    <section className="relative bg-[#0A0A0A] pt-24 pb-0 overflow-hidden min-h-[65vh] lg:min-h-[75vh] flex flex-col">
      <div className="container mx-auto px-4 flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full py-6">
          {/* Left Content */}
          <div className="z-10">
            <div className="flex items-center gap-2 mb-3">
              <Tag size={14} className="text-[#B8860B]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B8860B]">Promoción Especial</span>
            </div>
            
            <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-medium leading-tight text-white mb-2">
              Día del Padre
            </h1>
            <h2 className="font-playfair text-2xl md:text-4xl font-medium text-[#B8860B] mb-4">
              Celebra a quienes siempre están.
            </h2>
            
            <p className="text-sm md:text-base text-white/70 max-w-md mb-8 leading-relaxed">
              Sorprende a tus colaboradores con un regalo significativo que reconoce su esfuerzo y dedicación.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#combos"
                className="flex items-center gap-2 rounded-md bg-[#B8860B] px-6 py-3.5 text-xs md:text-sm font-bold text-white transition hover:bg-[#966d09]"
              >
                Ver combos destacados
                <ArrowRight size={18} />
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[300px] lg:h-[450px] w-full">
            <img
              src="/Hero_RegalosDorados.png"
              alt="Caja de regalo premium"
              className="w-full h-full object-contain lg:object-right"
            />
          </div>
        </div>
      </div>

      {/* Compact Features Bar */}
      <div className="bg-black/50 backdrop-blur-sm border-t border-white/10 py-4">
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