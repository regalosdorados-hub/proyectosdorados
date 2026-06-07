import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ProductView from './ProductView';
import { useFeaturedProducts, DbProduct } from '../hooks/useProducts';

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

  // Adaptador para que el componente ProductCard y ProductView sigan funcionando
  const adaptProduct = (p: DbProduct) => ({
    ...p,
    price: p.prices?.[0]?.price || 0,
    mainImage: p.variants?.[0]?.images?.[0] || p.images?.[0] || '',
    thumbnails: p.images || [],
    formats: p.variants?.map(v => ({ id: v.color, name: v.color, available: true })) || [],
    refCode: p.ref_code
  });
  
  return (
    <section id="combos" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-400">Combos destacados</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-playfair font-semibold text-slate-950">
            Opciones seleccionadas para reconocer y motivar a tu equipo.
          </h2>
        </div>
        
        {isLoading ? (
          <div className="text-center py-10 text-slate-500">Cargando productos...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {featuredProducts?.map((product) => (
              <ProductCard 
                key={product.id}
                product={adaptProduct(product)}
                onClick={() => openProductModal(product)}
              />
            ))}
          </div>
        )}

        <div id="empresas" className="mt-16 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-400">¿Eres una empresa?</p>
              <h3 className="mt-3 text-2xl md:text-3xl font-semibold text-slate-950">
                Cotiza tus regalos corporativos y obtené beneficios exclusivos por volumen.
              </h3>
            </div>
            <div>
              <a
                href="https://wa.me/5492901464534?text=Hola!%20Necesito%20una%20cotización%20para%20regalos%20corporativos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-amber-300 px-8 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-300/20 transition-all duration-300 hover:bg-amber-200"
              >
                Solicitar cotización
              </a>
            </div>
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