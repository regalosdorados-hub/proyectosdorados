
import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ message = "Hola! Me comunico desde su sitio web" }) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/5492901464534?text=${encodedMessage}`;
  
  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float right-6 left-auto"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  );
};

export default WhatsAppButton;
