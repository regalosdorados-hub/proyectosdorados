
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
  priceDiscount1: number | null; // For 5+ units
  priceDiscount2: number | null; // For 10+ units
  mainImage: string;
  thumbnails: string[];
  formats: ProductFormat[];
  category: string;
  refCode: string; // Reference code like G1, P3, etc.
  featured?: boolean;
}

export const products: Product[] = [
  // Delantales Gastronomía
  {
    id: 'bachero-bagun-120cm',
    name: 'Bachero, Bagún de (0,75cmx 1,20cm)',
    description: 'Delantal tipo gastronómico Bachero confeccionado en material Bagún resistente con 1,20cm de largo. Ideal para chefs y cocineros profesionales que buscan durabilidad y estilo en la cocina.',
    price: 12000,
    priceDiscount1: 10000, // 5+ units
    priceDiscount2: 8000,  // 10+ units
    mainImage: 'Delantales gastronómicos Bacheros/Gastronómico Bachero (0,75cmx1,20cm.)G1.jpg',
    thumbnails: [],
    formats: [
      { id: 'blanco', name: 'Blanco', available: true }
    ],
    category: 'Delantales Gastronomía',
    refCode: 'G1',
    featured: true
  },
  {
    id: 'bachero-bagun-80cm',
    name: 'Bachero, Bagún (de 0,75cmx0,80cm)',
    description: 'Delantal tipo gastronómico Bachero confeccionado en material Bagún resistente con 0,80cm de largo. Ideal para chefs y cocineros profesionales que buscan protección y confort.',
    price: 10000,
    priceDiscount1: 12000, // Note: In CSV this appears higher than base price
    priceDiscount2: 8000,
    mainImage: 'Delantales gastronómicos Bacheros/Gastronomico  Bachero 0,75cm x0,80cm. G2.jpg',
    thumbnails: [],
    formats: [
      { id: 'blanco', name: 'Blanco', available: true }
    ],
    category: 'Delantales Gastronomía',
    refCode: 'G2'
  },
  {
    id: 'bachero-bagun-80cm-colors',
    name: 'Bachero Bagún (de 0,75cmx 0,80cm)',
    description: 'Delantal tipo gastronómico Bachero confeccionado en material Bagún con 0,80cm de largo. Disponible en variedad de colores para adaptarse a diferentes ambientes de cocina.',
    price: 12000,
    priceDiscount1: 11000,
    priceDiscount2: 10000,
    mainImage: 'Delantales gastronómicos Bacheros/Delantal de Bagún color .G3',
    thumbnails: [
      'Delantales gastronómicos Bacheros/Delantal de Bagún color (0,75cm X1,20cm).jpg. G3'
    ],
    formats: [
      { id: 'blanco', name: 'Blanco', available: true },
      { id: 'negro', name: 'Negro', available: true },
      { id: 'rosa', name: 'Rosa', available: true },
      { id: 'violeta', name: 'Violeta', available: true },
      { id: 'rojo', name: 'Rojo', available: true }
    ],
    category: 'Delantales Gastronomía',
    refCode: 'G3',
    featured: true
  },
  {
    id: 'delantal-lino-rayas',
    name: 'Lino a rallas (de 0,75cmx 0,80cm)',
    description: 'Delantal gastronómico de tela de lino con rayas, liviano y elegante. 0,80cm de largo, ideal para panadería y pastelería donde se busca un estilo distintivo.',
    price: 10000,
    priceDiscount1: 8000,
    priceDiscount2: 8000,
    mainImage: 'Delantales gastronómicos Bacheros/Delantales de lino rayado (0,75cm X0,80).jpg.G4',
    thumbnails: [],
    formats: [
      { id: 'rayas', name: 'A rayas', available: true },
      { id: 'liso', name: 'Liso', available: true },
      { id: 'estampado', name: 'Estampado', available: true }
    ],
    category: 'Delantales Gastronomía',
    refCode: 'G4'
  },
  {
    id: 'delantal-algodon-80cm',
    name: 'Algodón (0,75cmx0,80cm)',
    description: 'Delantal gastronómico confeccionado en algodón 100% de alta calidad con 0,80cm de largo. Liviano, confortable y elegante, ideal para uso doméstico o en pequeños emprendimientos.',
    price: 10000,
    priceDiscount1: 8000,
    priceDiscount2: 8000,
    mainImage: 'Delantales gastronómicos Bacheros/Delantal tela algodón, lisa con bolsillos jpg. G5',
    thumbnails: [],
    formats: [
      { id: 'liso', name: 'Liso', available: true },
      { id: 'estampado', name: 'Estampado', available: true }
    ],
    category: 'Delantales Gastronomía',
    refCode: 'G5',
    featured: true
  },
  {
    id: 'delantal-pvc-blanco',
    name: 'PVC (0,75cm X0,80cm) Blanco',
    description: 'Delantal de PVC blanco de alto rendimiento, con dimensiones de 0,75cm x 0,80cm. Resistente al agua y a productos químicos, ideal para trabajos en condiciones húmedas o con sustancias.',
    price: 10000, // Price not specified in CSV, using standard
    priceDiscount1: null,
    priceDiscount2: null,
    mainImage: 'Delantales gastronómicos Bacheros/Delantal gastronómico de PVC  . G6',
    thumbnails: [],
    formats: [
      { id: 'blanco', name: 'Blanco', available: true }
    ],
    category: 'Delantales Gastronomía',
    refCode: 'G6'
  },
  {
    id: 'delantal-pvc-negro',
    name: 'PVC (0,75cm X0,80cm) Negro',
    description: 'Delantal de PVC negro de alto rendimiento, con dimensiones de 0,75cm x 0,80cm. Resistente al agua y a productos químicos, ideal para trabajos en condiciones húmedas o con sustancias.',
    price: 10000, // Price not specified in CSV, using standard
    priceDiscount1: null,
    priceDiscount2: null,
    mainImage: 'Delantales gastronómicos Bacheros/PVC.Color negro. G7_',
    thumbnails: [],
    formats: [
      { id: 'negro', name: 'Negro', available: true }
    ],
    category: 'Delantales Gastronomía',
    refCode: 'G7'
  },

  // Delantales de Peluquería
  {
    id: 'ponchito-drakon',
    name: 'Ponchito de Drakon con bolsillo frontal',
    description: 'Ponchito de material Drakon con bolsillo frontal, diseñado específicamente para peluquería. Liviano y cómodo para todo el día de trabajo.',
    price: 5000,
    priceDiscount1: 4000,
    priceDiscount2: 4000,
    mainImage: 'Delantales Peluqueria/Delantal de tela con bolsillos.jpg P1',
    thumbnails: [],
    formats: [
      { id: 'liso', name: 'Liso', available: true },
      { id: 'estampado', name: 'Estampado', available: true }
    ],
    category: 'Delantales Peluquería',
    refCode: 'P1',
    featured: true
  },
  {
    id: 'delantal-jean-bolsillos',
    name: 'Delantal de jean Con Bolsillos (0,80cm de largo)',
    description: 'Delantal profesional para peluquería confeccionado en jean resistente con múltiples bolsillos para tijeras y accesorios. Proporciona estilo y funcionalidad con 0,80cm de largo.',
    price: 7000,
    priceDiscount1: 6000,
    priceDiscount2: 6000,
    mainImage: 'Delantales Peluqueria/Delantal de Jean. P2',
    thumbnails: [],
    formats: [
      { id: 'liso', name: 'Liso', available: true },
      { id: 'estampado', name: 'Estampado', available: true }
    ],
    category: 'Delantales Peluquería',
    refCode: 'P2'
  },
  {
    id: 'delantal-metalmecanico-bordado',
    name: 'Delantal Metal mecánico con Bolsillo Bordado',
    description: 'Delantal estilo metal mecánico para peluquería con bolsillo bordado. Material resistente y duradero, perfecto para profesionales que buscan un look industrial.',
    price: 11000,
    priceDiscount1: 10000,
    priceDiscount2: 10000,
    mainImage: 'Delantales Peluqueria/Delantal  peluqueria. Metal mecánico jpg.P3',
    thumbnails: [],
    formats: [
      { id: 'liso', name: 'Liso', available: true },
      { id: 'estampado', name: 'Estampado', available: true }
    ],
    category: 'Delantales Peluquería',
    refCode: 'P3',
    featured: true
  },
  {
    id: 'delantal-plastico-cristal',
    name: 'Delantal Plástico cristal, con bolsillo (0,75cmx 0,80cm)',
    description: 'Delantal transparente de plástico cristal con bolsillo y dimensiones de 0,75cm x 0,80cm. Perfecto para protección contra tintes y productos químicos manteniendo visibilidad.',
    price: 10000,
    priceDiscount1: 8000,
    priceDiscount2: 8000,
    mainImage: 'Delantales Peluqueria/Delantal Plastico-Cristal.jpg. P4',
    thumbnails: [],
    formats: [
      { id: 'liso', name: 'Liso', available: true },
      { id: 'estampado', name: 'Estampado', available: true }
    ],
    category: 'Delantales Peluquería',
    refCode: 'P4'
  },
  {
    id: 'cartuchera-bagun',
    name: 'Cartuchera de Bagun Con 4 divisiones',
    description: 'Cartuchera profesional para peluqueros confeccionada en material Bagún duradero, con 4 divisiones para organizar tijeras, peines y accesorios de trabajo.',
    price: 10000,
    priceDiscount1: 8000,
    priceDiscount2: 8000,
    mainImage: 'Delantales Peluqueria/Cartucheras con bolsillos para peluquero.P5_',
    thumbnails: [],
    formats: [
      { id: 'liso', name: 'Liso', available: true },
      { id: 'colores-fuertes', name: 'Colores fuertes', available: true }
    ],
    category: 'Delantales Peluquería',
    refCode: 'P5'
  },

  // Delantales Veterinaria
  {
    id: 'veterinaria-bagun-bolsillo',
    name: 'Delantal de Bagun con bolsillo',
    description: 'Delantal veterinario confeccionado en material Bagún con bolsillo frontal. Diseñado especialmente para clínicas veterinarias con colores distintivos.',
    price: 6000,
    priceDiscount1: 6000,
    priceDiscount2: 6000,
    mainImage: 'Delantales Veterinaria/Delantal de Bagun Color.jpg. V1',
    thumbnails: [
      'Delantales Veterinaria/Delantal de Bagún color (0,75cmX0,80cm)jpg V1.jpg',
      'Delantales Veterinaria/Delantal de Bagún color  con bolsillo transparente(0,75cm X0,80cm).jpg. V1'
    ],
    formats: [
      { id: 'rosa', name: 'Rosa', available: true },
      { id: 'violeta', name: 'Violeta', available: true }
    ],
    category: 'Delantales Veterinaria',
    refCode: 'V1',
    featured: true
  },
  {
    id: 'veterinaria-bagun-huellas',
    name: 'Delantal de Bagun con Huellas',
    description: 'Delantal veterinario de Bagun decorado con estampado de huellas. Material duradero ideal para el trabajo diario en clínicas y peluquerías caninas.',
    price: 6000,
    priceDiscount1: 6000,
    priceDiscount2: null,
    mainImage: 'Delantales Veterinaria/Delantal de Bagun con dibujos.jpg.V2',
    thumbnails: [],
    formats: [
      { id: 'estampado', name: 'Estampado', available: true }
    ],
    category: 'Delantales Veterinaria',
    refCode: 'V2'
  },
  {
    id: 'veterinaria-tela-panama',
    name: 'De tela Panamá y poliester',
    description: 'Delantal para veterinarios confeccionado en tela panamá y poliester, materiales frescos y resistentes. Ideal para uso diario en clínicas veterinarias.',
    price: 6000,
    priceDiscount1: 6000,
    priceDiscount2: null,
    mainImage: 'Delantales Veterinaria/Del de Tela para Veterinaria.jpg V3',
    thumbnails: [
      'Delantales Veterinaria/Delantal de Tela  Veterinaria.jpg. V3'
    ],
    formats: [
      { id: 'tela', name: 'Tela', available: true }
    ],
    category: 'Delantales Veterinaria',
    refCode: 'V3',
    featured: true
  },
  {
    id: 'veterinaria-cuerina-fantasia',
    name: 'De cuerina fantasía con dibujo de animalitos',
    description: 'Delantal veterinario confeccionado en cuerina fantasía con adorable diseño de animalitos. Material fácil de limpiar y resistente a manchas, perfecto para peluquerías caninas.',
    price: 10000, // CSV shows "$10.00" but context suggests it should be $10,000
    priceDiscount1: 9000,
    priceDiscount2: null,
    mainImage: 'Delantales Veterinaria/Delantal de Cuerina fantasia (0,75 cm X0,80cm).V4',
    thumbnails: [
      'Delantales Veterinaria/Delantal de Cuerina para peluqueria canina. V4'
    ],
    formats: [
      { id: 'fantasia', name: 'Fantasía', available: true }
    ],
    category: 'Delantales Veterinaria',
    refCode: 'V4'
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category.toLowerCase().includes(category.toLowerCase()));
};
