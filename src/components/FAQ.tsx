import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ: React.FC = () => {
  return (
    <section id="como-funciona" className="py-20 bg-slate-950 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/40">
          <h2 className="text-3xl font-playfair text-center mb-10 text-amber-200">Preguntas Frecuentes</h2>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="rounded-[1.5rem] border border-white/10 bg-slate-950/80">
              <AccordionTrigger className="text-left px-5 text-white">¿Cuáles son los métodos de pago disponibles?</AccordionTrigger>
              <AccordionContent className="px-5 text-slate-300">
                Aceptamos transferencias bancarias, efectivo y pagos a través de aplicaciones móviles como Mercado Pago.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="rounded-[1.5rem] border border-white/10 bg-slate-950/80">
              <AccordionTrigger className="text-left px-5 text-white">¿Hacen envíos en Ciudad de Córdoba?</AccordionTrigger>
              <AccordionContent className="px-5 text-slate-300">
                Sí, realizamos envíos en toda la Ciudad de Córdoba y alrededores con logística propia o servicios locales de confianza.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="rounded-[1.5rem] border border-white/10 bg-slate-950/80">
              <AccordionTrigger className="text-left px-5 text-white">¿Qué materiales utilizan en sus regalos corporativos?</AccordionTrigger>
              <AccordionContent className="px-5 text-slate-300">
                Trabajamos con proveedores premium que garantizan calidad, presentaciones sofisticadas y productos listos para personalizar.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="rounded-[1.5rem] border border-white/10 bg-slate-950/80">
              <AccordionTrigger className="text-left px-5 text-white">¿Hacen regalos corporativos personalizados?</AccordionTrigger>
              <AccordionContent className="px-5 text-slate-300">
                Sí, ofrecemos personalización con nombres, logos y tarjetas de agradecimiento. Consultá por opciones de branding a escala.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="rounded-[1.5rem] border border-white/10 bg-slate-950/80">
              <AccordionTrigger className="text-left px-5 text-white">¿Cuál es el tiempo de producción?</AccordionTrigger>
              <AccordionContent className="px-5 text-slate-300">
                El tiempo estándar de producción es de 3-5 días hábiles. Para pedidos personalizados o grandes cantidades, el tiempo puede variar.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;