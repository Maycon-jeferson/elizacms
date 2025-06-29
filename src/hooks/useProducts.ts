import { useState, useMemo } from 'react';
import { PRODUCTS } from '@/constants/products';
import { filterProductsByName, filterProductsByCategory, sortProducts } from '@/utils/filters';

export const useProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = PRODUCTS;
    
    // Filtrar por nome
    filtered = filterProductsByName(filtered, searchTerm);
    
    // Filtrar por categoria
    filtered = filterProductsByCategory(filtered, selectedCategory);
    
    // Ordenar
    filtered = sortProducts(filtered, sortBy);
    
    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  return {
    products: filteredAndSortedProducts,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    totalProducts: PRODUCTS.length,
    filteredCount: filteredAndSortedProducts.length,
  };
}; 