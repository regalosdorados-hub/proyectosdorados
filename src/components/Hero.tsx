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
    <section className="relative bg-[#0A0A0A] pt-20 pb-0 overflow-hidden min-h-[55vh] lg:min-h-[60vh] flex flex-col">
      <div className="container mx-auto px-4 flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center w-full py-4">
          {/* Left Content */}
          <div className="z-10">
            <div className="flex items-center gap-2 mb-1">
              <Tag size={10} className="text-[#B8860B]" />
              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#B8860B]">Promoción Especial</span>
            </div>
            
            <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-white mb-1">
              Día del Padre
            </h1>
            <h2 className="font-playfair text-xl md:text-3xl font-medium text-[#B8860B] mb-2">
              Celebra a quienes siempre están.
            </h2>
            
            <p className="text-xs md:text-sm text-white/70 max-w-md mb-4 leading-relaxed">
              Sorprende a tus colaboradores con un regalo significativo que reconoce su esfuerzo y dedicación.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#combos"
                className="flex items-center gap-2 rounded-md bg-[#B8860B] px-5 py-2.5 text-[10px] font-bold text-white transition hover:bg-[#966d09]"
              >
                Ver combos destacados
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[180px] lg:h-[280px] w-full">
            <img
              src="/Hero_RegalosDorados.png"
              alt="Caja de regalo premium"
              className="w-full h-full object-contain lg:object-right"
            />
          </div>
        </div>
      </div>

      {/* Compact Features Bar */}
      <div className="bg-black/50 backdrop-blur-sm border-t border-white/10 py-2">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex items-center gap-2">
                  <Icon size={12} className="text-[#B8860B] shrink-0" />
                  <span className="text-[8px] md:text-[9px] font-bold text-white/80 uppercase tracking-wider">{feature.title}</span>
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