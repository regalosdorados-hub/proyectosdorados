
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
  // Delantales Bachero
  {
    id: 'bachero-denim-1',
    name: 'Delantal Bachero Premium Denim',
    description: 'Delantal tipo bachero confeccionado en denim resistente con compartimentos y bolsillos para mayor funcionalidad. Ideal para chefs y cocineros profesionales que buscan durabilidad y estilo.',
    price: 8500,
    mainImage: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=1974&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1541533848490-bc8115cd6522?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556911073-38141963c9e0?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608877907149-a95a8f26ed31?q=80&w=1974&auto=format&fit=crop'
    ],
    formats: [
      { id: 'negro', name: 'Negro', available: true },
      { id: 'azul', name: 'Azul Marino', available: true },
      { id: 'gris', name: 'Gris', available: true }
    ],
    category: 'Delantales Bachero',
    featured: true
  },
  {
    id: 'bachero-cuero-1',
    name: 'Delantal Bachero de Cuero',
    description: 'Delantal de cuero genuino con tirantes ajustables y bolsillos frontales. Excelente protección contra salpicaduras y manchas. Ideal para barbacoas y cocina de alto fuego.',
    price: 12500,
    mainImage: 'https://images.unsplash.com/photo-1590374504314-295cb3e4bc1d?q=80&w=1974&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1614892135443-efddc5762664?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607296795652-3735ce36b312?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559447591-cc9664ea7c65?q=80&w=1974&auto=format&fit=crop'
    ],
    formats: [
      { id: 'marron', name: 'Marrón', available: true },
      { id: 'negro', name: 'Negro', available: true },
      { id: 'camel', name: 'Camel', available: false }
    ],
    category: 'Delantales Bachero'
  },
  {
    id: 'bachero-mezclilla-1',
    name: 'Delantal Bachero Mezclilla Lavada',
    description: 'Delantal de mezclilla con tratamiento de lavado especial para mayor suavidad y comodidad. Diseño ergonómico con múltiples bolsillos y tira ajustable al cuello.',
    price: 7800,
    mainImage: 'https://images.unsplash.com/photo-1559671216-beda6e16face?q=80&w=1974&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1611534531383-826e13dd517c?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1495546968767-f0573cca821e?q=80&w=1974&auto=format&fit=crop'
    ],
    formats: [
      { id: 'azulclaro', name: 'Azul Claro', available: true },
      { id: 'azuloscuro', name: 'Azul Oscuro', available: true }
    ],
    category: 'Delantales Bachero'
  },

  // Delantales de Tela
  {
    id: 'tela-flores-1',
    name: 'Delantal de Tela Estampado Floral',
    description: 'Delantal de algodón 100% con hermoso estampado floral. Diseño femenino y cómodo para cocinar en casa o para pequeños emprendimientos gastronómicos.',
    price: 5500,
    mainImage: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1968&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?q=80&w=1974&auto=format&fit=crop'
    ],
    formats: [
      { id: 'rosas', name: 'Rosas', available: true },
      { id: 'lavanda', name: 'Lavanda', available: true },
      { id: 'girasoles', name: 'Girasoles', available: true }
    ],
    category: 'Delantales de Tela',
    featured: true
  },
  {
    id: 'tela-lino-1',
    name: 'Delantal de Lino Premium',
    description: 'Delantal de lino puro de alta calidad con acabado rústico. Liviano, fresco y elegante, perfecto para servicio de mesa en restaurantes o eventos.',
    price: 6200,
    mainImage: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1974&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1557332374-269d06ed96ee?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607877999405-bd2c27817f9a?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1527324688281-f3a20fea3fb8?q=80&w=1974&auto=format&fit=crop'
    ],
    formats: [
      { id: 'natural', name: 'Natural', available: true },
      { id: 'blanco', name: 'Blanco', available: true },
      { id: 'terracota', name: 'Terracota', available: true }
    ],
    category: 'Delantales de Tela'
  },
  {
    id: 'tela-infantil-1',
    name: 'Delantal Infantil de Tela',
    description: 'Delantal de tela para niños con diseños alegres y coloridos. Ideal para actividades de cocina, manualidades o pintura con los pequeños de la casa.',
    price: 4200,
    mainImage: 'https://images.unsplash.com/photo-1537631604762-bb679e6252fa?q=80&w=1974&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1582169296194-e4d644c48063?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513063778558-12ffdacf41f8?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1554844453-7ea2a562a6c8?q=80&w=1974&auto=format&fit=crop'
    ],
    formats: [
      { id: 'animales', name: 'Animales', available: true },
      { id: 'espacio', name: 'Espacio', available: true },
      { id: 'dinosaurios', name: 'Dinosaurios', available: true },
      { id: 'hadas', name: 'Hadas', available: true }
    ],
    category: 'Delantales de Tela'
  },

  // Delantales Peluquería
  {
    id: 'peluqueria-profesional-1',
    name: 'Delantal Profesional para Peluquería',
    description: 'Delantal impermeable especial para peluquerías con múltiples bolsillos para tijeras y accesorios. Resistente a productos químicos y fácil de limpiar.',
    price: 7800,
    mainImage: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1969&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559599189-fe84dea4eb79?q=80&w=1974&auto=format&fit=crop'
    ],
    formats: [
      { id: 'negro', name: 'Negro', available: true },
      { id: 'gris', name: 'Gris', available: true },
      { id: 'azul', name: 'Azul', available: true }
    ],
    category: 'Delantales Peluquería',
    featured: true
  },
  {
    id: 'peluqueria-corte-1',
    name: 'Delantal de Corte Premium',
    description: 'Delantal especializado para estilistas con superficie repelente de cabello. Diseño ergonómico con cintas ajustables y bolsillos especiales para herramientas de corte.',
    price: 8200,
    mainImage: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1974&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1508004522741-138a04d43b8e?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559599076-9c61d8e1b77c?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1638779913573-cca73771245d?q=80&w=1974&auto=format&fit=crop'
    ],
    formats: [
      { id: 'negro', name: 'Negro', available: true },
      { id: 'rosa', name: 'Rosa', available: true },
      { id: 'bordo', name: 'Bordó', available: true }
    ],
    category: 'Delantales Peluquería'
  },
  {
    id: 'peluqueria-tinte-1',
    name: 'Delantal Antitinte Profesional',
    description: 'Delantal especializado con tratamiento antimanchas para protección durante procesos de coloración. Material de alta resistencia a químicos capilares.',
    price: 9500,
    mainImage: 'https://images.unsplash.com/photo-1580618864482-298bf907c078?q=80&w=1974&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1562338733-13dea75f843f?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599351431093-1aaee8a6f386?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=1974&auto=format&fit=crop'
    ],
    formats: [
      { id: 'negro', name: 'Negro', available: true },
      { id: 'gris', name: 'Gris', available: true }
    ],
    category: 'Delantales Peluquería'
  },

  // Delantales Veterinaria
  {
    id: 'veterinaria-impermeable-1',
    name: 'Delantal Veterinario Impermeable',
    description: 'Delantal especializado para veterinarios con material impermeable y resistente a líquidos. Protección completa para procedimientos clínicos y baños de mascotas.',
    price: 9800,
    mainImage: 'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?q=80&w=1974&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518288774672-b94e808873ff?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1567752881298-894bb81f9379?q=80&w=1974&auto=format&fit=crop'
    ],
    formats: [
      { id: 'azul', name: 'Azul Médico', available: true },
      { id: 'verde', name: 'Verde Quirúrgico', available: true },
      { id: 'blanco', name: 'Blanco', available: true }
    ],
    category: 'Delantales Veterinaria',
    featured: true
  },
  {
    id: 'veterinaria-grooming-1',
    name: 'Delantal para Grooming Profesional',
    description: 'Delantal especializado para peluqueros caninos con bolsillos para accesorios y herramientas. Material resistente a pelos y fácil de limpiar.',
    price: 8500,
    mainImage: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=1974&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605125207267-f27feb22899d?q=80&w=1974&auto=format&fit=crop'
    ],
    formats: [
      { id: 'negro', name: 'Negro', available: true },
      { id: 'gris', name: 'Gris', available: true },
      { id: 'morado', name: 'Morado', available: true }
    ],
    category: 'Delantales Veterinaria'
  },
  {
    id: 'veterinaria-asistente-1',
    name: 'Delantal para Asistente Veterinario',
    description: 'Delantal liviano y funcional para asistentes de veterinaria con múltiples bolsillos para instrumentos. Diseño cómodo para jornadas largas de trabajo.',
    price: 7200,
    mainImage: 'https://images.unsplash.com/photo-1587500024307-4e8d76118623?q=80&w=1974&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1566847438217-76e82d383f84?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583336663277-620dc1996580?q=80&w=1974&auto=format&fit=crop'
    ],
    formats: [
      { id: 'celeste', name: 'Celeste', available: true },
      { id: 'verde', name: 'Verde', available: true },
      { id: 'rosa', name: 'Rosa', available: true }
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
