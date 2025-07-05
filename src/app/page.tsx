"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/ui";
import { Header } from "@/components/layout";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types/product";

export default function Home() {
  const {
    products,
    loading,
    error,
    timeoutError,
    retryLoad,
  } = useProducts();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Filtrar produtos localmente
  useEffect(() => {
    try {
      let filtered = [...products];
      
      // Filtrar por nome
      if (searchTerm.trim()) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Filtrar por categoria
      if (selectedCategory !== 'all') {
        filtered = filtered.filter((product) => product.category === selectedCategory);
      }
      
      setFilteredProducts(filtered);
    } catch (err) {
      console.error('Erro ao filtrar produtos:', err);
      setFilteredProducts([]);
    }
  }, [products, searchTerm, selectedCategory]);

  // Renderizar loading
  if (loading) {
    return (
      <main className="min-h-screen bg-pink-50">
        <Navbar />
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
            <p className="text-pink-600">Carregando produtos...</p>
          </div>
        </div>
      </main>
    );
  }

  // Renderizar erro
  if (error) {
    return (
      <main className="min-h-screen bg-pink-50">
        <Navbar />
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="text-red-500 mb-6">
              <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-red-600 mb-3">
              {timeoutError ? 'Tempo limite excedido' : 'Erro ao carregar produtos'}
            </h3>
            <p className="text-red-500 mb-6 text-sm">{error}</p>
            <button
              onClick={retryLoad}
              disabled={loading}
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Tentar novamente
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Renderizar conteúdo principal
  return (
    <main className="min-h-screen bg-pink-50">
      <Navbar />
      <Header />
      
      {/* Search Input */}
      <div className="flex justify-center mb-6 px-4">
        <div className="relative w-full max-w-[300px] h-[40px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-pink-400">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Buscar produto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-full pl-12 pr-4 rounded-md bg-white text-pink-800 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all border border-pink-200 shadow-sm text-sm"
          />
        </div>
      </div>
      
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-2 justify-center mb-6 px-4">
        {['all', 'face', 'eyes', 'lips', 'skincare'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-pink-600 text-white'
                : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
            }`}
          >
            {category === 'all' ? 'Todos' : 
             category === 'face' ? 'Rosto' :
             category === 'eyes' ? 'Olhos' :
             category === 'lips' ? 'Lábios' : 'Skincare'}
          </button>
        ))}
      </div>
      
      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 px-4">
          <div className="text-pink-600 text-lg font-medium">
            Nenhum produto encontrado.
          </div>
          <p className="text-pink-500 text-sm mt-2">
            Tente ajustar os filtros de busca.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-4 max-w-7xl mx-auto pb-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative w-full h-[200px] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-pink-800 mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-xs text-pink-600 line-clamp-2 mb-2">
                  {product.description}
                </p>
                <p className="text-sm font-bold text-pink-700">
                  R$ {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
