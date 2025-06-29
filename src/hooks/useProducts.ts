import { useState, useMemo, useEffect } from 'react';
import { filterProductsByName, filterProductsByCategory, sortProducts } from '@/utils/filters';
import { Product } from '@/types/product';
import { productsService } from '@/services/products';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');

  // Carregar produtos do Supabase
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await productsService.getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error('Erro ao carregar produtos:', err);
        setError('Falha ao carregar produtos');
        // Fallback para produtos estáticos em caso de erro
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;
    
    // Filtrar por nome
    filtered = filterProductsByName(filtered, searchTerm);
    
    // Filtrar por categoria
    filtered = filterProductsByCategory(filtered, selectedCategory);
    
    // Ordenar
    filtered = sortProducts(filtered, sortBy);
    
    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy]);

  const addProduct = async (newProduct: Omit<Product, 'id'>) => {
    try {
      const addedProduct = await productsService.addProduct(newProduct);
      setProducts(prev => [...prev, addedProduct]);
      return addedProduct;
    } catch (err) {
      console.error('Erro ao adicionar produto:', err);
      throw new Error('Falha ao adicionar produto');
    }
  };

  const removeProduct = async (productId: number) => {
    try {
      await productsService.deleteProduct(productId);
      setProducts(prev => prev.filter(p => p.id !== productId));
    } catch (err) {
      console.error('Erro ao remover produto:', err);
      throw new Error('Falha ao remover produto');
    }
  };

  const updateProduct = async (productId: number, updates: Partial<Product>) => {
    try {
      const updatedProduct = await productsService.updateProduct(productId, updates);
      setProducts(prev => prev.map(p => 
        p.id === productId ? updatedProduct : p
      ));
      return updatedProduct;
    } catch (err) {
      console.error('Erro ao atualizar produto:', err);
      throw new Error('Falha ao atualizar produto');
    }
  };

  return {
    products: filteredAndSortedProducts,
    allProducts: products,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    totalProducts: products.length,
    filteredCount: filteredAndSortedProducts.length,
    addProduct,
    removeProduct,
    updateProduct,
  };
}; 