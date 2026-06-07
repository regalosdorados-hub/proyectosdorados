-- Crear tabla de categorías
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar algunas categorías iniciales
INSERT INTO categories (name) VALUES 
('Día del Padre'), 
('Premium'), 
('Gastronomía'), 
('Empresariales')
ON CONFLICT (name) DO NOTHING;

-- Asegurar que la tabla de productos tenga los campos necesarios (si no existen)
-- ALTER TABLE products ADD COLUMN IF NOT EXISTS ref_code TEXT;
-- ALTER TABLE products ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;