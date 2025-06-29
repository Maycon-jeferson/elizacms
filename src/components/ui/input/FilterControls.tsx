"use client";

import { motion } from "framer-motion";
import { CATEGORIES } from "@/constants/products";

interface FilterControlsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: 'name' | 'price' | 'rating';
  onSortChange: (sort: 'name' | 'price' | 'rating') => void;
  totalProducts: number;
  filteredCount: number;
}

export const FilterControls = ({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  totalProducts,
  filteredCount,
}: FilterControlsProps) => {
  return (
    <motion.div
      className="flex flex-col gap-4 mb-6 sm:mb-8 px-4 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Categorias */}
      <div className="flex flex-wrap gap-2 justify-center">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-pink-600 text-white'
                : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Controles de ordenação e contador */}
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center sm:justify-between">
        <div className="flex items-center gap-2">
          <label className="text-xs sm:text-sm text-pink-700 font-medium">Ordenar por:</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'name' | 'price' | 'rating')}
            className="px-2 py-1 sm:px-3 sm:py-1 rounded-md border border-pink-300 text-pink-700 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 text-xs sm:text-sm"
          >
            <option value="name">Nome</option>
            <option value="price">Preço</option>
            <option value="rating">Avaliação</option>
          </select>
        </div>

        <div className="text-xs sm:text-sm text-pink-600">
          {filteredCount} de {totalProducts} produtos
        </div>
      </div>
    </motion.div>
  );
}; 