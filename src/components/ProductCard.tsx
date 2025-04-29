
import React from 'react';

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
  mainImage: string;
  thumbnails: string[];
  formats: ProductFormat[];
  category: string;
}

interface ProductCardProps {
  product: ProductProps;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      className="product-card cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <img 
          src={product.mainImage} 
          alt={product.name}
          className="product-image group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <span className="inline-block bg-white text-mandarina px-2 py-1 rounded-lg text-sm font-medium">
            Ver detalle
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-playfair text-lg font-medium text-gray-800 mb-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2" title={product.description}>
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-mandarina font-medium">${product.price.toFixed(2)}</span>
          <span className="text-xs text-gray-500">{product.category}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
