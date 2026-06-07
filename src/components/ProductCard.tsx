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
  mainImage: string;
  featured?: boolean;
  refCode?: string;
}

interface ProductCardProps {
  product: ProductProps;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      className="group cursor-pointer overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <AspectRatio ratio={4/3} className="w-full bg-slate-50">
          <img 
            src={product.mainImage} 
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        </AspectRatio>
        {product.featured && (
          <span className="absolute left-3 top-3 rounded bg-[#B8860B] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            MÁS VENDIDO
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-playfair text-lg font-bold text-slate-900 mb-2">{product.name}</h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Desde</span>
            <span className="text-lg font-bold text-slate-900">${product.price.toLocaleString()} <span className="text-xs font-normal text-slate-500">+ IVA</span></span>
          </div>
          <button 
            className="rounded border border-[#B8860B] px-4 py-2 text-xs font-bold text-[#B8860B] transition hover:bg-[#B8860B] hover:text-white"
          >
            Ver detalles
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;