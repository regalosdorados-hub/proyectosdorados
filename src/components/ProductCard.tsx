
import React from 'react';
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
  priceDiscount1?: number | null;
  priceDiscount2?: number | null;
  mainImage: string;
  thumbnails: string[];
  formats: ProductFormat[];
  category: string;
  refCode?: string;
}

interface ProductCardProps {
  product: ProductProps;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      className="group cursor-pointer overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_70px_-40px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <AspectRatio ratio={4/3} className="w-full bg-slate-100">
          <img 
            src={product.mainImage} 
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        </AspectRatio>
        {product.featured && (
          <span className="absolute left-4 top-4 rounded-full bg-amber-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-slate-950 shadow-md">
            Más vendido
          </span>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-playfair text-xl font-semibold text-slate-950 mb-2 line-clamp-2">{product.name}</h3>
            <p className="text-sm text-slate-500 leading-6 line-clamp-3" title={product.description}>
              {product.description}
            </p>
          </div>
          {product.refCode && (
            <span className="whitespace-nowrap rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-amber-700">
              {product.refCode}
            </span>
          )}
        </div>
        <div className="mt-6 flex items-center justify-between gap-3">
          <span className="text-lg font-semibold text-slate-950">${product.price.toFixed(2)}</span>
          <span className="text-sm text-slate-500">{product.category}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
