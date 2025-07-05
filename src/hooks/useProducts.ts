import { useState, useEffect, useCallback } from 'react';
import { Product, CreateProductData } from '@/types/product';
import { productsService } from '@/services/products';

const LOADING_TIMEOUT = 10000; // 10 segundos de timeout

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeoutError, setTimeoutError] = useState(false);

  // Função para criar timeout
  const createTimeout = (timeoutMs: number): Promise<never> => {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Timeout: Carregamento demorou muito tempo'));
      }, timeoutMs);
    });
  };

  // Função para carregar produtos com timeout
  const loadProductsWithTimeout = useCallback(async (timeoutMs: number = LOADING_TIMEOUT) => {
    try {
      setLoading(true);
      setError(null);
      setTimeoutError(false);
      
      // Criar promise com timeout
      const timeoutPromise = createTimeout(timeoutMs);
      const dataPromise = productsService.getAllProducts();
      
      // Competição entre timeout e carregamento
      const data = await Promise.race([dataPromise, timeoutPromise]);
      setProducts(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar produtos';
      setError(errorMessage);
      
      // Verificar se é erro de timeout
      if (errorMessage.includes('Timeout')) {
        setTimeoutError(true);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Carregar todos os produtos
  const loadProducts = useCallback(async () => {
    await loadProductsWithTimeout();
  }, [loadProductsWithTimeout]);

  // Carregar produtos por categoria
  const loadProductsByCategory = useCallback(async (category: string) => {
    try {
      setLoading(true);
      setError(null);
      setTimeoutError(false);
      
      const timeoutPromise = createTimeout(LOADING_TIMEOUT);
      const dataPromise = productsService.getProductsByCategory(category);
      
      const data = await Promise.race([dataPromise, timeoutPromise]);
      setProducts(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar produtos';
      setError(errorMessage);
      
      if (errorMessage.includes('Timeout')) {
        setTimeoutError(true);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar produtos
  const searchProducts = useCallback(async (searchTerm: string) => {
    try {
      setLoading(true);
      setError(null);
      setTimeoutError(false);
      
      const timeoutPromise = createTimeout(LOADING_TIMEOUT);
      const dataPromise = productsService.searchProducts(searchTerm);
      
      const data = await Promise.race([dataPromise, timeoutPromise]);
      setProducts(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar produtos';
      setError(errorMessage);
      
      if (errorMessage.includes('Timeout')) {
        setTimeoutError(true);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Função de retry
  const retryLoad = useCallback(async () => {
    await loadProductsWithTimeout();
  }, [loadProductsWithTimeout]);

  // Adicionar produto
  const addProduct = useCallback(async (productData: CreateProductData) => {
    try {
      setError(null);
      const newProduct = await productsService.createProduct(productData);
      if (newProduct) {
        setProducts(prev => [newProduct, ...prev]);
      }
      return newProduct;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao adicionar produto');
      throw err;
    }
  }, []);

  // Atualizar produto
  const updateProduct = useCallback(async (id: number, productData: Partial<CreateProductData>) => {
    try {
      setError(null);
      const updatedProduct = await productsService.updateProduct(id, productData);
      if (updatedProduct) {
        setProducts(prev => 
          prev.map(product => 
            product.id === id ? updatedProduct : product
          )
        );
      }
      return updatedProduct;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar produto');
      throw err;
    }
  }, []);

  // Deletar produto
  const deleteProduct = useCallback(async (id: number) => {
    try {
      setError(null);
      await productsService.deleteProduct(id);
      setProducts(prev => prev.filter(product => product.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar produto');
      throw err;
    }
  }, []);

  // Carregar produtos na inicialização - sem dependências para evitar loops
  useEffect(() => {
    const initializeProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        setTimeoutError(false);
        
        const timeoutPromise = createTimeout(LOADING_TIMEOUT);
        const dataPromise = productsService.getAllProducts();
        
        const data = await Promise.race([dataPromise, timeoutPromise]);
        setProducts(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar produtos';
        setError(errorMessage);
        
        if (errorMessage.includes('Timeout')) {
          setTimeoutError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    initializeProducts();
  }, []); // Array vazio para executar apenas uma vez

  return {
    products,
    loading,
    error,
    timeoutError,
    loadProducts,
    loadProductsByCategory,
    searchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    retryLoad,
  };
}; 