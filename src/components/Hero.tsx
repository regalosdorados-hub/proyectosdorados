import React from 'react';
import { Sparkles, Percent, Truck, Headphones, ArrowRight, Tag } from 'lucide-react';

const features = [
  {
    title: 'Regalos personalizados',
    description: 'Con tu logo y tarjeta dedicada',
    icon: Sparkles,
  },
  {
    title: 'Descuentos por cantidad',
    description: 'Mejores precios para tu empresa',
    icon: Percent,
  },
  {
    title: 'Envíos a todo el país',
    description: 'Entregas puntuales y seguras',
    icon: Truck,
  },
  {
    title: 'Atención personalizada',
    description: 'Te asesoramos en todo el proceso',
    icon: Headphones,
  }
];

const Hero: React.FC = () => {
  return (
    <section className="relative bg-[#0A0A0A] pt-32 pb-0 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="z-10 pb-12 lg:pb-24">
            <div className="flex items-center gap-2 mb-6">
              <Tag size={16} className="text-[#B8860B]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8860B]">Promoción Especial</span>
            </div>
            
            <h1 className="font-playfair text-5xl md:text-7xl font-medium leading-tight text-white mb-2">
              Día del Padre
            </h1>
            <h2 className="font-playfair text-4xl md:text-6xl font-medium text-[#B8860B] mb-8">
              Celebra a quienes siempre están.
            </h2>
            
            <p className="text-lg text-white/70 max-w-lg mb-10 leading-relaxed">
              Sorprende a tus colaboradores con un regalo significativo que reconoce su esfuerzo y dedicación.
            </p>
            
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="#combos"
                className="flex items-center gap-2 rounded-md bg-[#B8860B] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#966d09]"
              >
                Ver combos del Día del Padre
                <ArrowRight size={18} />
              </a>
              <a
                href="https://wa.me/5492901464534"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-bold text-white/90 hover:text-[#B8860B] transition-colors"
              >
                <Percent size={18} className="text-[#B8860B]" />
                Descuentos por cantidad
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-1/2">
            <img
              src="/Hero_RegalosDorados.png"
              alt="Caja de regalo premium"
              className="w-full h-full object-cover object-center lg:object-left"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-transparent lg:block hidden"></div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="bg-[#1A1A1A] border-t border-white/5 py-8 mt-12 lg:mt-0">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent">
                    <Icon size={24} className="text-[#B8860B]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{feature.title}</h3>
                    <p className="text-xs text-white/50">{feature.description}</p>
                  </div>
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