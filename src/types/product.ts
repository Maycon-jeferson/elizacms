export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  inStock?: boolean;
  rating?: number;
  stock?: number;
  created_at?: string;
}

export interface ProductCardProps {
  product: Product;
}

export interface ProductGridProps {
  products: Product[];
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  stock?: number;
  rating?: number;
} 