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
  // Delantales Gastronomía (Bachero)
  {
    id: 'bachero-bagun-80cm',
    name: 'Delantal Bachero (Bagún de 0,80cm de largo)',
    description: 'Delantal tipo bachero confeccionado en material Bagún resistente con 0,80cm de largo. Ideal para chefs y cocineros profesionales que buscan durabilidad y estilo.',
    price: 10000,
    mainImage: '/delantales-bachero/Delantales de tela para panaderia.jpg',
    thumbnails: [
      '/delantales-bachero/Delantales de tela para panaderia.jpg'
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
    name: 'Delantal Bachero (Bagún de 1,20cm de largo)',
    description: 'Delantal de tipo bachero confeccionado en material Bagún premium con 1,20cm de largo, ofreciendo mayor cobertura. Perfecto para trabajo intenso en cocina profesional.',
    price: 12000,
    mainImage: '/delantales-bachero/Delantales de tela para panaderia.jpg',
    thumbnails: [
      '/delantales-bachero/Delantales de tela para panaderia.jpg'
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
    mainImage: '/delantales-tela/Delantales de lino rayado (0,75cm X0,80).jpg',
    thumbnails: [
      '/delantales-tela/Delantal tela lisa.jpg',
      '/delantales-tela/Delantal en tela de jean.png',
      '/delantales-tela/verde hombre.jpg'
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
    mainImage: '/delantales-peluqueria/Delantal con bolsillo 3.jpg',
    thumbnails: [
      '/delantales-peluqueria/Cartucheras con bolsillos para peluquero (1).png',
      '/delantales-peluqueria/Delantal con bolsillo 3.jpg'
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
    mainImage: '/delantales-peluqueria/Cartucheras con bolsillos para peluquero (1).png',
    thumbnails: [
      '/delantales-peluqueria/Delantal con bolsillo 3.jpg',
      '/delantales-peluqueria/Cartucheras con bolsillos para peluquero (1).png'
    ],
    formats: [
      { id: 'liso', name: 'Liso', available: true },
      { id: 'estampado', name: 'Estampado', available: true }
    ],
    category: 'Delantales Peluquería'
  },

  // Delantales Veterinaria - Updated to ensure unique images
  {
    id: 'veterinaria-tela-bolsillo',
    name: 'Delantal para Veterinaria de Tela con Bolsillo (0,80cm)',
    description: 'Delantal especializado para veterinarios confeccionado en tela resistente, con bolsillo para mayor funcionalidad. Ideal para procedimientos clínicos y trabajo diario con mascotas.',
    price: 11000,
    mainImage: '/delantales-veterinaria/Delantal de Tela Veterinaria.jpg',
    thumbnails: [
      '/delantales-veterinaria/Delantal de Tela Veterinaria.jpg'
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
    mainImage: '/delantales-veterinaria/Delantal de Bagún color con bolsillo transparente(0,75cm X0,80cm).jpg',
    thumbnails: [
      '/delantales-veterinaria/Delantal de Bagún color con bolsillo transparente(0,75cm X0,80cm).jpg',
      '/delantales-veterinaria/Delantal de Bagún color (0,75cm X1,20cm).jpg'
    ],
    formats: [
      { id: 'liso', name: 'Liso', available: true },
      { id: 'estampado', name: 'Estampado', available: true }
    ],
    category: 'Delantales Veterinaria'
  },
  {
    id: 'veterinaria-estampado-canino',
    name: 'Delantal Bagún Estampado para Peluquería Canina',
    description: 'Delantal bagún con estampados especiales para peluquería canina. Diseñado con materiales resistentes y divertidos estampados que hacen más ameno el trabajo con mascotas.',
    price: 11000,
    mainImage: '/delantales-veterinaria/Delantal bagún estampado (0,80 cm X 0,75cm)Ideal para Peluqueria Canina.jpg',
    thumbnails: [
      '/delantales-veterinaria/Delantal bagún estampado (0,80 cm X 0,75cm)Ideal para Peluqueria Canina.jpg',
      '/delantales-veterinaria/Delantal bagún estampado 2 (0,80 cm X 0,75cm)Ideal para Peluqueria Canina.jpg'
    ],
    formats: [
      { id: 'estampado-perro', name: 'Estampado Perro', available: true },
      { id: 'estampado-hueso', name: 'Estampado Hueso', available: true }
    ],
    category: 'Delantales Veterinaria'
  },
  {
    id: 'veterinaria-plastico-transparente',
    name: 'Delantal Plástico Cristal Ahumado',
    description: 'Delantal impermeable de plástico cristal ahumado, especial para procedimientos que requieren máxima protección contra líquidos. Liviano y completamente impermeable.',
    price: 9000,
    mainImage: '/delantales-veterinaria/de plastico cristal ahumado.bmp',
    thumbnails: [
      '/delantales-veterinaria/de plastico cristal ahumado.bmp'
    ],
    formats: [
      { id: 'transparente', name: 'Transparente', available: true },
      { id: 'ahumado', name: 'Ahumado', available: true }
    ],
    category: 'Delantales Veterinaria'
  },
  {
    id: 'veterinaria-bagun-con-dibujos',
    name: 'Delantal de Bagún con Dibujos para Veterinaria',
    description: 'Delantal de bagún decorado con dibujos temáticos de veterinaria. Ideal para crear un ambiente amigable en clínicas veterinarias y centros de atención animal.',
    price: 12000,
    mainImage: '/delantales-veterinaria/Delantal de bagun con dibujos.jpg',
    thumbnails: [
      '/delantales-veterinaria/Delantal de bagun con dibujos.jpg'
    ],
    formats: [
      { id: 'con-dibujos', name: 'Con Dibujos', available: true }
    ],
    category: 'Delantales Veterinaria'
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category.toLowerCase().includes(category.toLowerCase()));
};
