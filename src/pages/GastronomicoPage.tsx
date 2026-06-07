import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ProductCard from '../components/ProductCard';
import ProductView from '../components/ProductView';
import { useProducts, DbProduct } from '../hooks/useProducts';

const GastronomicoPage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { data: products, isLoading } = useProducts('Gastronomía');
  
  const adaptProduct = (p: DbProduct) => ({
    ...p,
    price: p.prices?.[0]?.price || 0,
    mainImage: p.variants?.[0]?.images?.[0] || p.images?.[0] || '',
    thumbnails: p.images || [],
    formats: p.variants?.map(v => ({ id: v.color, name: v.color, available: true })) || [],
    refCode: p.ref_code
  });

  const openProductModal = (product: DbProduct) => {
    setSelectedProduct(adaptProduct(product));
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeProductModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-playfair text-3xl md:text-4xl font-medium text-gray-800 mb-4">Delantales para Gastronomía</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Nuestra colección de delantales gastronómicos para chefs y cocineros profesionales. Diseñados con materiales de alta calidad 
                y atención al detalle para brindar la mejor comodidad y funcionalidad en la cocina.
              </p>
            </div>
            
            {isLoading ? (
              <div className="text-center py-12 text-slate-500">Cargando productos...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products?.map((product) => (
                  <ProductCard 
                    key={product.id}
                    product={adaptProduct(product)}
                    onClick={() => openProductModal(product)}
                  />
                ))}
              </div>
            )}
            
            {!isLoading && products?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No se encontraron productos en esta categoría.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      
      {selectedProduct && (
        <ProductView 
          product={selectedProduct} 
          isOpen={isModalOpen}
          onClose={closeProductModal}
        />
      )}
    </div>
  );
};

export default GastronomicoPage;