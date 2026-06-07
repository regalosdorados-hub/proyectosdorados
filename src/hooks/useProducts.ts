import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

export interface ProductPrice {
  min_qty: number;
  price: number;
}

export interface ProductVariant {
  color: string;
  images: string[];
}

export interface DbProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  variants: ProductVariant[];
  prices: ProductPrice[];
  images: string[];
  featured: boolean;
  ref_code?: string;
  created_at: string;
}

export const useProducts = (category?: string) => {
  return useQuery({
    queryKey: ['products', category],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (category) {
        query = query.ilike('category', `%${category}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as DbProduct[];
    },
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as DbProduct[];
    },
  });
};