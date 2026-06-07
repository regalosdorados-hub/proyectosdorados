import React from 'react';
import { Sparkles, Percent, Truck, Headphones, ArrowRight, Tag } from 'lucide-react';
import { useFeaturedProducts } from '../hooks/useProducts';

const features = [
  { title: 'Personalizados', icon: Sparkles },
  { title: 'Descuentos x Cantidad', icon: Percent },
  { title: 'Envíos a todo el país', icon: Truck },
  { title: 'Atención VIP', icon: Headphones }
];

const Hero: React.FC = () => {
  const { data: featuredProducts } = useFeaturedProducts();
  const previewProducts = featuredProducts?.slice(0, 2) || [];

  return (
    <section className="relative bg-[#0A0A0A] pt-24 pb-8 overflow-hidden min-h-[90vh] flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="z-10 py-4">
            <div className="flex items-center gap-2 mb-4">
              <Tag size={14} className="text-[#B8860B]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B8860B]">Promoción Especial</span>
            </div>
            
            <h1 className="font-playfair text-4xl md:text-6xl font-medium leading-tight text-white mb-1">
              Día del Padre
            </h1>
            <h2 className="font-playfair text-3xl md:text-5xl font-medium text-[#B8860B] mb-6">
              Celebra a quienes siempre están.
            </h2>
            
            <p className="text-base text-white/70 max-w-md mb-8 leading-relaxed">
              Sorprende a tus colaboradores con un regalo significativo que reconoce su esfuerzo y dedicación.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href="#combos"
                className="flex items-center gap-2 rounded-md bg-[#B8860B] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#966d09]"
              >
                Ver combos destacados
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Mini Preview of Products to ensure visibility without scroll */}
            <div className="hidden md:grid grid-cols-2 gap-4 max-w-md">
              {previewProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-3 bg-white/5 p-2 rounded-lg border border-white/10">
                  <img 
                    src={product.variants?.[0]?.images?.[0] || product.images?.[0]} 
                    className="w-12 h-12 object-cover rounded" 
                    alt={product.name}
                  />
                  <div className="overflow-hidden">
                    <p className="text-[10px] font-bold text-white truncate">{product.name}</p>
                    <p className="text-[10px] text-amber-500">${(product.prices?.[0]?.price || 0).toLocaleString()}</p>
                  </div>
                </div>
              ))}
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
      <div className="mt-auto pt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 border-t border-white/5 pt-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex items-center gap-3">
                  <Icon size={18} className="text-[#B8860B] shrink-0" />
                  <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">{feature.title}</span>
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