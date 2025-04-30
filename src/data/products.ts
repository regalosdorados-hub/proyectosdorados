
export interface ProductFormat {
  id: string;
  name: string;
  available: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  mainImage: string;
  thumbnails: string[];
  formats: ProductFormat[];
  category: string;
  featured?: boolean;
}

export const products: Product[] = [
  // Delantales Gastronomía (Gastronómico)
  {
    id: 'bachero-bagun-80cm',
    name: 'Delantal Gastronómico (Bagún de 0,80cm de largo)',
    description: 'Delantal tipo gastronómico confeccionado en material Bagún resistente con 0,80cm de largo. Ideal para chefs y cocineros profesionales que buscan durabilidad y estilo.',
    price: 10000,
    mainImage: 'delantales-gastronomico/Delantales de tela para panaderia.jpg',
    thumbnails: [
      'delantales-gastronomico/Delantal tela lisa (1).jpg'
    ],
    formats: [
      { id: 'blanco', name: 'Blanco', available: true },
      { id: 'negro', name: 'Negro', available: true },
      { id: 'rosa', name: 'Rosa', available: true },
      { id: 'violeta', name: 'Violeta', available: true },
      { id: 'rojo', name: 'Rojo', available: true }
    ],
    category: 'Delantales Gastronomía',
    featured: true
  },
  {
    id: 'bachero-bagun-120cm',
    name: 'Delantal Gastronómico (Bagún de 1,20cm de largo)',
    description: 'Delantal de tipo gastronómico confeccionado en material Bagún premium con 1,20cm de largo, ofreciendo mayor cobertura. Perfecto para trabajo intenso en cocina profesional.',
    price: 12000,
    mainImage: 'delantales-gastronomico/Delantal de PVC ideal para trabajos en empresas metalurgicas do nde se requiere alta proteccion a l calor, a las sustancias quimicas, etc..jpg',
    thumbnails: [
      'delantales-gastronomico/Delantales de tela para panaderia.jpg'
    ],
    formats: [
      { id: 'blanco', name: 'Blanco', available: true },
      { id: 'negro', name: 'Negro', available: true },
      { id: 'rosa', name: 'Rosa', available: true },
      { id: 'violeta', name: 'Violeta', available: true },
      { id: 'rojo', name: 'Rojo', available: true }
    ],
    category: 'Delantales Gastronomía'
  },
  {
    id: 'delantal-algodon-80cm',
    name: 'Delantal de Algodón (0,80cm de largo)',
    description: 'Delantal confeccionado en algodón 100% de alta calidad con 0,80cm de largo. Liviano, confortable y elegante, ideal para uso doméstico o en pequeños emprendimientos gastronómicos.',
    price: 10000,
    mainImage: 'delantales-gastronomico/Delantal tela lisa (1).jpg',
    thumbnails: [
      'delantales-gastronomico/Delantal de PVC ideal para trabajos en empresas metalurgicas do nde se requiere alta proteccion a l calor, a las sustancias quimicas, etc..jpg'
    ],
    formats: [
      { id: 'liso', name: 'Liso', available: true },
      { id: 'estampado', name: 'Estampado', available: true }
    ],
    category: 'Delantales Gastronomía',
    featured: true
  },

  // Delantales de Peluquería
  {
    id: 'peluqueria-tafeta',
    name: 'Delantal para Peluquería (Tafeta, Silver, Traker, Dracon)',
    description: 'Delantal especializado para peluquería confeccionado en variedad de telas: Tafeta, Silver, Traker o Dracon. Material resistente a productos químicos y fácil de limpiar.',
    price: 5000,
    mainImage: 'delantales-peluqueria/Delantal con bolsillo 3.jpg',
    thumbnails: [
      'delantales-peluqueria/Cartucheras con bolsillos para peluquero (1).png',
      'delantales-peluqueria/Delantal con bolsillos (2).jpg'
    ],
    formats: [
      { id: 'liso', name: 'Liso', available: true },
      { id: 'estampado', name: 'Estampado', available: true }
    ],
    category: 'Delantales Peluquería',
    featured: true
  },
  {
    id: 'peluqueria-con-bolsillos',
    name: 'Delantal para Peluquería con Bolsillos (0,80cm de largo)',
    description: 'Delantal profesional para peluquería con múltiples bolsillos para tijeras y accesorios. Confeccionado con 0,80cm de largo, ofrece la protección perfecta para el trabajo diario.',
    price: 7000,
    mainImage: 'delantales-peluqueria/Cartucheras con bolsillos para peluquero (1).png',
    thumbnails: [
      'delantales-peluqueria/Delantal de tela con bolsillos.jpg',
      'delantales-peluqueria/Delantal impermeable estampado 0,75cm X 1,20) (2).jpg'
    ],
    formats: [
      { id: 'liso', name: 'Liso', available: true },
      { id: 'estampado', name: 'Estampado', available: true }
    ],
    category: 'Delantales Peluquería'
  },
  {
    id: 'peluqueria-capa',
    name: 'Capa para Peluquería (Estampada y Lisa)',
    description: 'Capa profesional para peluquería disponible en variados diseños estampados y lisos. Material impermeable que protege al cliente durante el corte o tratamiento capilar.',
    price: 8000,
    mainImage: 'delantales-peluqueria/Capa Clara estampada (1).webp',
    thumbnails: [
      'delantales-peluqueria/Capa negra con estampas (1).jpg',
      'delantales-peluqueria/Capa para peluquería (2).webp'
    ],
    formats: [
      { id: 'estampado', name: 'Estampado', available: true },
      { id: 'liso', name: 'Liso', available: true }
    ],
    category: 'Delantales Peluquería',
    featured: true
  },

  // Delantales Veterinaria
  {
    id: 'veterinaria-tela-bolsillo',
    name: 'Delantal para Veterinaria de Tela con Bolsillo (0,80cm)',
    description: 'Delantal especializado para veterinarios confeccionado en tela resistente, con bolsillo para mayor funcionalidad. Ideal para procedimientos clínicos y trabajo diario con mascotas.',
    price: 11000,
    mainImage: 'delantales-veterinaria/Delantal de Tela  Veterinaria.jpg',
    thumbnails: [
      'delantales-veterinaria/Delantal de Tela para Veterinaria.jpg',
      'delantales-veterinaria/Delantal de Tela  Veterinaria (1).jpg'
    ],
    formats: [
      { id: 'liso', name: 'Liso', available: true },
      { id: 'estampado', name: 'Estampado', available: true }
    ],
    category: 'Delantales Veterinaria',
    featured: true
  },
  {
    id: 'veterinaria-impermeable-bolsillo',
    name: 'Delantal para Veterinaria Impermeable con bolsillo (0,80cm)',
    description: 'Delantal impermeable para veterinarios con bolsillo y 0,80cm de largo. Material especialmente diseñado para protección completa durante baños de mascotas y procedimientos que involucren líquidos.',
    price: 10000,
    mainImage: 'delantales-veterinaria/Delantal de Bagún color  con bolsillo transparente(0,75cm X0,80cm).jpg',
    thumbnails: [
      'delantales-veterinaria/Delantal de Bagún color (0,75cm X1,20cm) (2).jpg',
      'delantales-veterinaria/Delantal de bagun con dibujos.jpg'
    ],
    formats: [
      { id: 'liso', name: 'Liso', available: true },
      { id: 'estampado', name: 'Estampado', available: true }
    ],
    category: 'Delantales Veterinaria'
  },
  {
    id: 'veterinaria-cristal',
    name: 'Delantal para Veterinaria de Plástico Cristal (Transparente)',
    description: 'Delantal de plástico cristal transparente, ideal para procedimientos veterinarios que requieren alta visibilidad y máxima protección contra líquidos y sustancias.',
    price: 9000,
    mainImage: 'delantales-veterinaria/de plastico  cristal ahumado.bmp',
    thumbnails: [
      'delantales-veterinaria/d6.jpg'
    ],
    formats: [
      { id: 'transparente', name: 'Transparente', available: true },
      { id: 'ahumado', name: 'Ahumado', available: true }
    ],
    category: 'Delantales Veterinaria',
    featured: true
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category.toLowerCase().includes(category.toLowerCase()));
};
