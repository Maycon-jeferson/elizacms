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
}

export interface ProductCardProps {
  product: Product;
}

export interface ProductGridProps {
  products: Product[];
} 