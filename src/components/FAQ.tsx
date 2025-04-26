
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-playfair text-center mb-10">Preguntas Frecuentes</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">¿Cuáles son los métodos de pago disponibles?</AccordionTrigger>
              <AccordionContent>
                Aceptamos transferencias bancarias, efectivo y pagos a través de aplicaciones móviles como Mercado Pago.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">¿Hacen envíos a todo el país?</AccordionTrigger>
              <AccordionContent>
                Sí, realizamos envíos a todo Argentina a través de empresas de correo confiables. Los tiempos de entrega varían según la ubicación.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">¿Qué materiales utilizan en sus delantales?</AccordionTrigger>
              <AccordionContent>
                Utilizamos telas de alta calidad, seleccionadas específicamente para cada tipo de uso. Todos nuestros materiales son resistentes y duraderos.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">¿Hacen delantales personalizados?</AccordionTrigger>
              <AccordionContent>
                Sí, ofrecemos servicios de personalización. Puedes elegir colores, agregar bordados o logos. Contáctanos para más detalles.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">¿Cuál es el tiempo de producción?</AccordionTrigger>
              <AccordionContent>
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
