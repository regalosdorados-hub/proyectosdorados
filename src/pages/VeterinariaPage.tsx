
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ProductCard from '../components/ProductCard';
import ProductView from '../components/ProductView';
import { getProductsByCategory, Product } from '../data/products';
import { Card, CardContent } from '@/components/ui/card';

const VeterinariaPage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const products = getProductsByCategory('Veterinaria');
  
  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
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
              <h1 className="font-playfair text-3xl md:text-4xl font-medium text-gray-800 mb-4">Delantales para Veterinaria</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Delantales especializados para profesionales de veterinaria, peluquería canina y asistentes. 
                Confeccionados con materiales impermeables y resistentes para proporcionar protección durante 
                procedimientos clínicos y baños de mascotas.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  onClick={() => openProductModal(product)}
                />
              ))}
            </div>
            
            {products.length === 0 && (
              <Card className="my-8">
                <CardContent className="text-center py-12">
                  <p className="text-gray-600">No se encontraron productos en esta categoría.</p>
                </CardContent>
              </Card>
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

export default VeterinariaPage;
