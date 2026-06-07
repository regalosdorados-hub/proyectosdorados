import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Elegí tu Combo',
    description: 'Navegá nuestro catálogo curado y seleccioná la opción que mejor se adapte a tu equipo.'
  },
  {
    number: '02',
    title: 'Personalizalo',
    description: 'Envianos tu logo y los mensajes que quieras incluir. Nosotros nos encargamos del diseño.'
  },
  {
    number: '03',
    title: 'Recibí o Enviamos',
    description: 'Podemos enviar todo a tu oficina o realizar entregas individuales a cada colaborador.'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="como-funciona" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-slate-900 mb-4">Cómo funciona</h2>
          <p className="text-slate-600">Un proceso simple para que no tengas que preocuparte por nada.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <span className="text-8xl font-playfair font-bold text-slate-50 absolute -top-10 -left-4 z-0">
                {step.number}
              </span>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4 text-slate-900">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;