import { useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  format: string;
  category: string;
}

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('regalos_dorados_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('regalos_dorados_cart', JSON.stringify(newCart));
  };

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newCart = [...cart, { ...item, id }];
    saveCart(newCart);
  };

  const removeFromCart = (id: string) => {
    const newCart = cart.filter((item) => item.id !== id);
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return { cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice };
};