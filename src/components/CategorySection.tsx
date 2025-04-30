
import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryProps {
  title: string;
  description: string;
  image: string;
  path: string;
}

const categories: CategoryProps[] = [
  {
    title: 'Delantales Bachero',
    description: 'Resistentes y funcionales para chefs y cocineros profesionales.',
    image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=1974&auto=format&fit=crop',
    path: '/delantales-bachero'
  },
  {
    title: 'Delantales de Tela',
    description: 'Elegantes y cómodos para uso diario en el hogar.',
    image: 'https://images.unsplash.com/photo-1556911073-38141963c9e0?q=80&w=1974&auto=format&fit=crop',
    path: '/delantales-tela'
  },
  {
    title: 'Delantales Peluquería',
    description: 'Diseñados para estilistas y profesionales de la belleza.',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1969&auto=format&fit=crop',
    path: '/delantales-peluqueria'
  },
  {
    title: 'Delantales Veterinaria',
    description: 'Especializados para médicos y asistentes veterinarios.',
    image: 'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?q=80&w=1974&auto=format&fit=crop',
    path: '/delantales-veterinaria'
  }
];

const CategorySection: React.FC = () => {
  return (
    <section id="all-products" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-3xl font-medium text-gray-800 text-center mb-3">Nuestras Categorías</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Explora nuestra amplia gama de delantales diseñados para diferentes profesiones y necesidades.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CategoryCard: React.FC<CategoryProps> = ({ title, description, image, path }) => {
  return (
    <Link to={path} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
        <div className="relative h-60 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
            <h3 className="text-white font-playfair text-xl font-medium p-4">
              {title}
            </h3>
          </div>
        </div>
        <div className="p-4">
          <p className="text-gray-600 text-sm">{description}</p>
          <div className="mt-3 flex justify-end">
            <span className="text-mandarina group-hover:text-mandarina-dark font-medium text-sm flex items-center">
              Ver productos
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategorySection;
