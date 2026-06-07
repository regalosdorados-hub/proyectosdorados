
import React from 'react';
import { Sparkles, Percent, Truck, Headphones } from 'lucide-react';

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
    <section id="top" className="relative overflow-hidden bg-[#020205] text-white pt-24 md:pt-32 pb-20">
      <div className="absolute inset-0 bg-black/90"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.18),_transparent_14%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.05),_transparent_22%)]"></div>
      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.8fr)] gap-12 items-center">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-5 py-2 text-xs uppercase tracking-[0.35em] text-amber-200 font-semibold">
              Promoción especial
            </span>
            <h1 className="mt-8 text-5xl md:text-6xl font-semibold tracking-tight leading-tight text-white">
              Día del Padre
              <span className="block text-amber-300">Celebra a quienes siempre están.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-300 max-w-xl leading-8">
              Sorprende a tus colaboradores con un regalo significativo que reconoce su esfuerzo y dedicación.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#combos"
                className="inline-flex items-center justify-center rounded-full bg-amber-300 px-7 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-amber-300/20 transition-all duration-300 hover:bg-amber-200"
              >
                Ver combos del Día del Padre
              </a>
              <a
                href="https://wa.me/5492901464534?text=Hola!%20Quiero%20cotizar%20regalos%20corporativos%20premium%20para%20mi%20empresa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-amber-300 hover:text-amber-300"
              >
                Descuentos por cantidad
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/80 shadow-2xl shadow-black/60">
              <img
                src="/Hero_RegalosDorados.png"
                alt="Caja corporativa de regalos premium"
                className="w-full h-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>
            </div>
            <div className="absolute -bottom-8 left-4 right-4 rounded-[1.75rem] border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Tu logo, tarjeta y mensaje incluidos</p>
              <p className="mt-3 text-xl font-semibold text-white">Crea experiencias de regalo que refuerzan la cultura y la marca.</p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex items-start gap-4 rounded-[1.75rem] border border-white/10 bg-slate-900/80 px-6 py-5 shadow-lg shadow-slate-950/30">
                <span className="flex h-12 w-12 items-center justify-center rounded-3xl bg-amber-300 text-slate-950">
                  <Icon size={20} />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white">{feature.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
