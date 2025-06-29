"use client";

import { ProductGridProps } from "@/types/product";
import { ProductCard } from "./ProductCard";

export const ProductGrid = ({ products }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 px-4">
        <p className="text-pink-600 text-base sm:text-lg">
          Nenhum produto encontrado.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-7xl mx-auto px-4 pb-8 sm:pb-12">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}; 