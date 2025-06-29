import { Product } from '@/types/product';

export const filterProductsByName = (products: Product[], searchTerm: string): Product[] => {
  if (!searchTerm.trim()) return products;
  
  return products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const filterProductsByCategory = (products: Product[], category: string): Product[] => {
  if (category === 'all') return products;
  
  return products.filter((product) => product.category === category);
};

export const sortProducts = (products: Product[], sortBy: 'name' | 'price' | 'rating' = 'name'): Product[] => {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        const priceA = parseFloat(a.price.replace('R$ ', '').replace(',', '.'));
        const priceB = parseFloat(b.price.replace('R$ ', '').replace(',', '.'));
        return priceA - priceB;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });
}; 