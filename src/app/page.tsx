"use client";

import { Navbar, SearchInput, ProductGrid, FilterControls } from "@/components/ui";
import { Header } from "@/components/layout";
import { useProducts } from "@/hooks/useProducts";
import { motion } from "framer-motion";

export default function Home() {
  const {
    products,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    totalProducts,
    filteredCount,
  } = useProducts();

  if (isLoading) {
    return (
      <main className="min-h-screen bg-pink-50">
        <Navbar />
        <Header />
        <div className="flex items-center justify-center py-20">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
            <p className="text-pink-600">Carregando produtos...</p>
          </motion.div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-pink-50">
        <Navbar />
        <Header />
        <div className="flex items-center justify-center py-20">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-600 mb-2">Erro ao carregar produtos</h3>
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
            >
              Tentar novamente
            </button>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-pink-50">
      <Navbar />
      <Header />
      
      <SearchInput 
        value={searchTerm}
        onChange={setSearchTerm}
      />
      
      <FilterControls
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalProducts={totalProducts}
        filteredCount={filteredCount}
      />
      
      <ProductGrid 
        products={products}
      />
    </main>
  );
}
