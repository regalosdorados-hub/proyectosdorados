import React from 'react';
import { MapPin, Building, Users } from 'lucide-react';

const CompaniesSection: React.FC = () => {
  return (
    <section id="empresas" className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6 text-amber-400">
              Soluciones para Empresas en Córdoba
            </h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Somos especialistas en regalos corporativos con base en la ciudad de **Córdoba, Argentina**. 
              Entendemos la dinámica local y ofrecemos una logística ágil para empresas de la zona.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-amber-500/20 p-2 rounded-lg">
                  <MapPin className="text-amber-500" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Presencia Local</h4>
                  <p className="text-slate-400 text-sm">Entregas rápidas en Córdoba Capital y alrededores.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-amber-500/20 p-2 rounded-lg">
                  <Building className="text-amber-500" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Facturación A</h4>
                  <p className="text-slate-400 text-sm">Emitimos comprobantes fiscales para tu empresa sin complicaciones.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-amber-500/20 p-2 rounded-lg">
                  <Users className="text-amber-500" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Gestión de Grandes Volúmenes</h4>
                  <p className="text-slate-400 text-sm">Capacidad para abastecer eventos corporativos y fechas especiales.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-playfair font-bold mb-6">Solicitá tu presupuesto</h3>
            <p className="text-slate-400 mb-8">Dejanos tus datos y un asesor se pondrá en contacto para armar una propuesta a medida.</p>
            <a 
              href="https://wa.me/5492901464534" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 rounded-xl text-center transition-colors"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;