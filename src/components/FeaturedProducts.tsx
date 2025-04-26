
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ProductView from './ProductView';
import { Product, getFeaturedProducts } from '../data/products';

const FeaturedProducts: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const featuredProducts = getFeaturedProducts();
  
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-playfair text-3xl font-medium text-gray-800">Productos Destacados</h2>
          <div className="hidden md:block h-px bg-gray-300 flex-grow mx-8"></div>
          <a href="#all-products" className="text-mandarina hover:text-mandarina-dark font-medium transition-colors">
            Ver más
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
              onClick={() => openProductModal(product)}
            />
          ))}
        </div>
        
        {selectedProduct && (
          <ProductView 
            product={selectedProduct} 
            isOpen={isModalOpen}
            onClose={closeProductModal}
          />
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
