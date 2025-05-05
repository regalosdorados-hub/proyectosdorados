
import React, { useState, useEffect } from 'react';
import { X, Share2, Instagram } from 'lucide-react';
import { AspectRatio } from './ui/aspect-ratio';

interface ProductFormat {
  id: string;
  name: string;
  available: boolean;
}

interface ProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  priceDiscount1?: number | null; // For 5+ units
  priceDiscount2?: number | null; // For 10+ units
  mainImage: string;
  thumbnails: string[];
  formats: ProductFormat[];
  category: string;
  refCode?: string;
}

interface ProductViewProps {
  product: ProductProps;
  isOpen: boolean;
  onClose: () => void;
}

const ProductView: React.FC<ProductViewProps> = ({ product, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<string>(product.mainImage);
  const [loadedThumbnails, setLoadedThumbnails] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(
    product.formats.length > 0 ? product.formats[0].id : null
  );
  
  useEffect(() => {
    if (isOpen && loadedThumbnails.length === 0) {
      setLoadedThumbnails(product.thumbnails);
    }
  }, [isOpen, product.thumbnails, loadedThumbnails.length]);

  const getCurrentPrice = () => {
    if (quantity >= 10 && product.priceDiscount2) {
      return product.priceDiscount2;
    } else if (quantity >= 5 && product.priceDiscount1) {
      return product.priceDiscount1;
    }
    return product.price;
  };

  const getTotalPrice = () => {
    return getCurrentPrice() * quantity;
  };

  const getDiscountPercentage = () => {
    const currentPrice = getCurrentPrice();
    if (currentPrice === product.price) return 0;
    return Math.round((1 - currentPrice / product.price) * 100);
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleFormatChange = (formatId: string) => {
    setSelectedFormat(formatId);
  };

  const getWhatsAppLink = () => {
    const selectedFormatName = product.formats.find(format => format.id === selectedFormat)?.name || '';
    const currentPrice = getCurrentPrice();
    const totalPrice = getTotalPrice();
    
    const message = encodeURIComponent(
      `Hola! Estoy interesado en comprar el producto "${product.name}" (Ref: ${product.refCode || ''}) con las siguientes características:\n` +
      `- Cantidad: ${quantity}\n` +
      `- Formato: ${selectedFormatName}\n` +
      `- Precio unitario: $${currentPrice.toFixed(2)}\n` +
      `- Precio total: $${totalPrice.toFixed(2)}\n\n` +
      `¿Podrían brindarme más información sobre disponibilidad y envío?`
    );
    
    return `https://wa.me/5492901464534?text=${message}`;
  };

  const getFacebookShareLink = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}`;
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(
      `¡Mira este increíble delantal "${product.name}" (Ref: ${product.refCode || ''}) de Mandarina Delantales!\n\n${product.description}\n\nVisita nuestra web para adquirirlo.`
    )}`;
  };

  if (!isOpen) return null;

  const discountPercentage = getDiscountPercentage();
  const currentPrice = getCurrentPrice();

  return (
    <div className="product-modal" onClick={onClose}>
      <div 
        className="product-modal-content fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-800 transition-colors"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <div className="space-y-4">
            <div className="rounded-lg overflow-hidden border border-gray-200 bg-white">
              <AspectRatio ratio={4/3} className="w-full">
                <img 
                  src={selectedImage} 
                  alt={product.name} 
                  className="h-full w-full object-contain" 
                />
              </AspectRatio>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div 
                className={`w-16 h-16 rounded border-2 cursor-pointer overflow-hidden bg-white ${
                  selectedImage === product.mainImage ? 'border-mandarina' : 'border-gray-200'
                }`}
                onClick={() => handleImageClick(product.mainImage)}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <img 
                    src={product.mainImage} 
                    alt={`${product.name} thumbnail`} 
                    className="max-h-full max-w-full object-contain" 
                  />
                </div>
              </div>
              
              {loadedThumbnails.map((thumb, idx) => (
                <div 
                  key={idx}
                  className={`w-16 h-16 rounded border-2 cursor-pointer overflow-hidden bg-white ${
                    selectedImage === thumb ? 'border-mandarina' : 'border-gray-200'
                  }`}
                  onClick={() => handleImageClick(thumb)}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <img 
                      src={thumb} 
                      alt={`${product.name} thumbnail ${idx + 1}`} 
                      className="max-h-full max-w-full object-contain" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Categoría: {product.category}</p>
                  <h1 className="text-2xl md:text-3xl font-playfair font-medium">{product.name}</h1>
                  {product.refCode && (
                    <p className="text-sm text-mandarina mt-1">Ref: {product.refCode}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <a
                    href="https://instagram.com/mandarina.delantales"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 hover:text-mandarina transition-colors"
                    title="Síguenos en Instagram"
                  >
                    <Instagram size={24} />
                  </a>
                  <a
                    href={getFacebookShareLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                    title="Compartir en Facebook"
                  >
                    <Share2 size={24} />
                  </a>
                </div>
              </div>
              
              <div className="mt-4 mb-6">
                <div className="flex flex-col gap-1">
                  <p className="text-xl font-medium text-mandarina">
                    Precio unitario: ${currentPrice.toFixed(2)}
                    {discountPercentage > 0 && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </p>
                  <p className="text-lg font-medium text-gray-700">
                    Precio total: ${getTotalPrice().toFixed(2)}
                  </p>
                  {discountPercentage > 0 && (
                    <p className="text-sm text-green-600 font-medium">
                      ¡{discountPercentage}% de descuento aplicado!
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <p className="text-gray-600">{product.description}</p>
            
            <div className="space-y-4">
              {product.formats.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Formato</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.formats.map(format => (
                      <button
                        key={format.id}
                        className={`px-3 py-1.5 rounded-full border ${
                          selectedFormat === format.id 
                            ? 'border-mandarina bg-mandarina/10 text-mandarina-dark' 
                            : 'border-gray-200 text-gray-700 hover:border-gray-300'
                        } ${!format.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => format.available && handleFormatChange(format.id)}
                        disabled={!format.available}
                      >
                        {format.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="font-medium mb-2">Cantidad</h3>
                <div className="flex flex-wrap gap-2">
                  <QuantityButton
                    label="1 unidad" 
                    isSelected={quantity === 1}
                    onClick={() => handleQuantityChange(1)}
                  />
                  {product.priceDiscount1 && (
                    <QuantityButton
                      label="5 unidades" 
                      isSelected={quantity === 5}
                      onClick={() => handleQuantityChange(5)}
                      discount={product.priceDiscount1 < product.price ? `${Math.round((1 - product.priceDiscount1/product.price) * 100)}% OFF` : undefined}
                    />
                  )}
                  {product.priceDiscount2 && (
                    <QuantityButton
                      label="10 unidades" 
                      isSelected={quantity === 10}
                      onClick={() => handleQuantityChange(10)}
                      discount={product.priceDiscount2 < product.price ? `${Math.round((1 - product.priceDiscount2/product.price) * 100)}% OFF` : undefined}
                    />
                  )}
                </div>
              </div>
              
              <div className="pt-4">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-green-600 text-white font-medium py-3 px-4 rounded-lg text-center hover:bg-green-700 transition-colors"
                >
                  Consultar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface QuantityButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  discount?: string;
}

const QuantityButton: React.FC<QuantityButtonProps> = ({ label, isSelected, onClick, discount }) => {
  return (
    <div className="relative">
      <button
        className={`px-3 py-1.5 rounded-full border ${
          isSelected 
            ? 'border-mandarina bg-mandarina/10 text-mandarina-dark' 
            : 'border-gray-200 text-gray-700 hover:border-gray-300'
        }`}
        onClick={onClick}
      >
        {label}
      </button>
      {discount && (
        <span className="absolute -top-2 -right-2 bg-mandarina text-white text-xs px-1.5 py-0.5 rounded-full">
          {discount}
        </span>
      )}
    </div>
  );
};

export default ProductView;
