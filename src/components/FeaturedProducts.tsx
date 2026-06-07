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
    formats: p.variants?.map(v => ({ id: v.color, name: v.color, available: true })) || [],
    refCode: p.ref_code
  });
  
  return (
    <section id="combos" className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-playfair font-medium text-slate-900 mb-2">
            Combos destacados
          </h2>
          <p className="text-slate-500 text-base">
            Opciones seleccionadas para reconocer y motivar a tu equipo.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[350px] rounded-xl bg-slate-50 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts?.map((product) => (
              <ProductCard 
                key={product.id}
                product={adaptProduct(product)}
                onClick={() => openProductModal(product)}
              />
            ))}
          </div>
        )}

        {/* Company Banner */}
        <div id="empresas" className="mt-16 rounded-xl bg-[#F5F2EB] p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow-sm">
                <Building2 size={32} className="text-[#B8860B]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">¿Eres una empresa?</h3>
                <p className="text-slate-600">
                  Cotiza tus regalos corporativos y obtiene beneficios exclusivos por volumen.
                </p>
              </div>
            </div>
            <a
              href="https://wa.me/5492901464534"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md bg-[#B8860B] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#966d09] whitespace-nowrap"
            >
              Solicitar cotización
              <ArrowRight size={18} />
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