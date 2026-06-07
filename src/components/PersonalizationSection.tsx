import React from 'react';
import { Mail, CreditCard, PenTool } from 'lucide-react';

const PersonalizationSection: React.FC = () => {
  return (
    <section id="personalizacion" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-slate-900 mb-4">Tu marca, tu mensaje</h2>
          <p className="text-slate-600 text-lg">Hacemos que cada regalo sea único y transmita la esencia de tu empresa.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard className="text-[#B8860B]" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Tarjetas Personalizadas</h3>
            <p className="text-slate-600">Incluimos tarjetas de alta calidad con tu logo y el diseño que prefieras para cada ocasión.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="text-[#B8860B]" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Mensajes Dedicados</h3>
            <p className="text-slate-600">Podemos incluir mensajes individuales para cada destinatario, haciendo el reconocimiento más personal.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <PenTool className="text-[#B8860B]" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Branding de Producto</h3>
            <p className="text-slate-600">Consultanos por opciones de grabado o impresión de logo directamente en los productos del combo.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalizationSection;