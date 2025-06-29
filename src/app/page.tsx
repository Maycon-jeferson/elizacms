"use client";

import { Navbar, SearchInput, ProductGrid, FilterControls } from "@/components/ui";
import { Header } from "@/components/layout";
import { useProducts } from "@/hooks/useProducts";

export default function Home() {
  const {
    products,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    totalProducts,
    filteredCount,
  } = useProducts();

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
