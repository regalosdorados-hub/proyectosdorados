import React from 'react';
import { Sparkles, Percent, Truck, UserCheck } from 'lucide-react';

const features = [
  {
    title: 'Regalos personalizados',
    description: 'Incluimos nombre, logo y mensaje especial para cada colaborador.',
    icon: Sparkles,
  },
  {
    title: 'Descuentos por cantidad',
    description: 'Planes pensados para empresas con envíos por volumen y entregas seguras.',
    icon: Percent,
  },
  {
    title: 'Envíos en Ciudad de Córdoba',
    description: 'Logística confiable para que tu regalo llegue puntual a cualquier sede.',
    icon: Truck,
  },
  {
    title: 'Atención personalizada',
    description: 'Asesoría completa para elegir el regalo ideal según tu presupuesto.',
    icon: UserCheck,
  }
];

const CategorySection: React.FC = () => {
  return (
    <section id="categorias" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-400">Regalos Dorados</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-playfair font-semibold text-slate-950">
            Combos destacados y experiencias de agradecimiento
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Un catálogo cerrado de alta calidad para evitar la parálisis por análisis y acelerar tu proceso de compras corporativas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article key={feature.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-amber-300 mb-6">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-950 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-7">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;