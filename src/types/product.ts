export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category?: string;
  inStock?: boolean;
  rating?: number;
}

export interface ProductCardProps {
  product: Product;
}

export interface ProductGridProps {
  products: Product[];
} 