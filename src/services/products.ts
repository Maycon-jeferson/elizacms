import { supabase } from '@/lib/supabase';
import { Product, CreateProductData } from '@/types/product';

export const productsService = {
  // Buscar todos os produtos
  async getAllProducts(): Promise<Product[]> {
    if (!supabase) {
      console.warn('Supabase não está configurado');
      throw new Error('Supabase não está configurado. Verifique as variáveis de ambiente.');
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar produtos:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  },

  // Buscar produtos por categoria
  async getProductsByCategory(category: string): Promise<Product[]> {
    if (!supabase) {
      console.warn('Supabase não está configurado');
      throw new Error('Supabase não está configurado. Verifique as variáveis de ambiente.');
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar produtos por categoria:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Erro ao buscar produtos por categoria:', error);
      throw error;
    }
  },

  // Buscar produto por ID
  async getProductById(id: number): Promise<Product | null> {
    if (!supabase) {
      console.warn('Supabase não está configurado');
      throw new Error('Supabase não está configurado. Verifique as variáveis de ambiente.');
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Erro ao buscar produto:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      throw error;
    }
  },

  // Criar novo produto
  async createProduct(productData: CreateProductData): Promise<Product | null> {
    if (!supabase) {
      console.warn('Supabase não está configurado');
      throw new Error('Supabase não está configurado. Verifique as variáveis de ambiente.');
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single();

      if (error) {
        console.error('Erro ao criar produto:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw error;
    }
  },

  // Atualizar produto
  async updateProduct(id: number, productData: Partial<CreateProductData>): Promise<Product | null> {
    if (!supabase) {
      console.warn('Supabase não está configurado');
      throw new Error('Supabase não está configurado. Verifique as variáveis de ambiente.');
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Erro ao atualizar produto:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw error;
    }
  },

  // Deletar produto
  async deleteProduct(id: number): Promise<boolean> {
    if (!supabase) {
      console.warn('Supabase não está configurado');
      throw new Error('Supabase não está configurado. Verifique as variáveis de ambiente.');
    }

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erro ao deletar produto:', error);
        throw error;
      }

      return true;
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      throw error;
    }
  },

  // Buscar produtos com filtro de texto
  async searchProducts(searchTerm: string): Promise<Product[]> {
    if (!supabase) {
      console.warn('Supabase não está configurado');
      throw new Error('Supabase não está configurado. Verifique as variáveis de ambiente.');
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar produtos:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  }
}; 