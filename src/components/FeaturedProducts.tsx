import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ProductView from './ProductView';
import { useFeaturedProducts, DbProduct } from '../hooks/useProducts';
import { Building2, ArrowRight } from 'lucide-react';

const FeaturedProducts: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<DbProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { data: featuredProducts, isLoading } = useFeaturedProducts();
  
  const openProductModal = (product: DbProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeProductModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const adaptProduct = (p: DbProduct) => ({
    ...p,
    price: p.prices?.[0]?.price || 0,
    mainImage: p.variants?.[0]?.images?.[0] || p.images?.[0] || '',
    thumbnails: p.images || [],
    formats: p.variants?.map(v => ({ id: v.color, name: v.color, available: true, prices: v.prices })) || [],
    refCode: p.ref_code
  });
  
  return (
    <section id="combos" className="py-8 md:py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-playfair font-medium text-slate-900 mb-1">
            Combos destacados
          </h2>
          <p className="text-slate-500 text-sm">
            Opciones seleccionadas para reconocer y motivar a tu equipo.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[300px] rounded-xl bg-slate-50 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts?.map((product) => (
              <ProductCard 
                key={product.id}
                product={adaptProduct(product)}
                onClick={() => openProductModal(product)}
              />
            ))}
          </div>
        )}

        {/* Company Banner - Removed duplicate ID 'empresas' */}
        <div className="mt-12 rounded-xl bg-[#F5F2EB] p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-sm">
                <Building2 size={24} className="text-[#B8860B]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-0.5">¿Eres una empresa?</h3>
                <p className="text-sm text-slate-600">
                  Cotiza tus regalos corporativos y obtiene beneficios exclusivos por volumen.
                </p>
              </div>
            </div>
            <a
              href="https://wa.me/5493516420000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md bg-[#B8860B] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#966d09] whitespace-nowrap"
            >
              Solicitar cotización
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
        
        {selectedProduct && (
          <ProductView 
            product={adaptProduct(selectedProduct)} 
            isOpen={isModalOpen}
            onClose={closeProductModal}
          />
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;