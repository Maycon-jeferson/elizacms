import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Product } from '@/types/product';
import { PRODUCTS } from '@/constants/products';

// Fallback para dados locais quando Supabase não estiver configurado
let localProducts: Product[] = [...PRODUCTS];

export const productsService = {
  // Buscar todos os produtos
  async getAllProducts(): Promise<Product[]> {
    if (!isSupabaseConfigured) {
      // Fallback para dados locais
      return localProducts;
    }

    try {
      const { data, error } = await supabase!
        .from('products')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.error('Erro ao buscar produtos:', error);
        throw new Error('Falha ao carregar produtos');
      }

      return data || [];
    } catch (error) {
      console.error('Erro de conexão com Supabase:', error);
      // Fallback para dados locais em caso de erro
      return localProducts;
    }
  },

  // Adicionar novo produto
  async addProduct(product: Omit<Product, 'id'>): Promise<Product> {
    if (!isSupabaseConfigured) {
      // Fallback para dados locais
      const maxId = Math.max(...localProducts.map(p => p.id), 0);
      const newProduct: Product = {
        ...product,
        id: maxId + 1,
      };
      localProducts.push(newProduct);
      return newProduct;
    }

    try {
      const { data, error } = await supabase!
        .from('products')
        .insert([product])
        .select()
        .single();

      if (error) {
        console.error('Erro ao adicionar produto:', error);
        throw new Error('Falha ao adicionar produto');
      }

      return data;
    } catch (error) {
      console.error('Erro de conexão com Supabase:', error);
      // Fallback para dados locais
      const maxId = Math.max(...localProducts.map(p => p.id), 0);
      const newProduct: Product = {
        ...product,
        id: maxId + 1,
      };
      localProducts.push(newProduct);
      return newProduct;
    }
  },

  // Atualizar produto
  async updateProduct(id: number, updates: Partial<Product>): Promise<Product> {
    if (!isSupabaseConfigured) {
      // Fallback para dados locais
      const index = localProducts.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Produto não encontrado');
      
      localProducts[index] = { ...localProducts[index], ...updates };
      return localProducts[index];
    }

    try {
      const { data, error } = await supabase!
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Erro ao atualizar produto:', error);
        throw new Error('Falha ao atualizar produto');
      }

      return data;
    } catch (error) {
      console.error('Erro de conexão com Supabase:', error);
      // Fallback para dados locais
      const index = localProducts.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Produto não encontrado');
      
      localProducts[index] = { ...localProducts[index], ...updates };
      return localProducts[index];
    }
  },

  // Remover produto
  async deleteProduct(id: number): Promise<void> {
    if (!isSupabaseConfigured) {
      // Fallback para dados locais
      localProducts = localProducts.filter(p => p.id !== id);
      return;
    }

    try {
      const { error } = await supabase!
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erro ao remover produto:', error);
        throw new Error('Falha ao remover produto');
      }
    } catch (error) {
      console.error('Erro de conexão com Supabase:', error);
      // Fallback para dados locais
      localProducts = localProducts.filter(p => p.id !== id);
    }
  },

  // Buscar produto por ID
  async getProductById(id: number): Promise<Product | null> {
    if (!isSupabaseConfigured) {
      // Fallback para dados locais
      return localProducts.find(p => p.id === id) || null;
    }

    try {
      const { data, error } = await supabase!
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Erro ao buscar produto:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Erro de conexão com Supabase:', error);
      // Fallback para dados locais
      return localProducts.find(p => p.id === id) || null;
    }
  },
}; 