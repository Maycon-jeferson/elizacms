"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormInput } from '@/components/ui/input/FormInput';
import { CATEGORIES } from "@/constants/products";
import { CreateProductData } from '@/types/product';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: CreateProductData) => Promise<void>;
}

export const AddProductModal = ({ isOpen, onClose, onAddProduct }: AddProductModalProps) => {
  const [formData, setFormData] = useState<CreateProductData>({
    name: "",
    description: "",
    price: 0,
    image: "",
    category: "face",
    inStock: true,
    stock: 0,
    rating: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Fechar modal com ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Fechar modal ao clicar fora
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Descrição é obrigatória";
    } else if (formData.description.length < 10) {
      newErrors.description = "Descrição deve ter pelo menos 10 caracteres";
    }

    if (formData.price <= 0) {
      newErrors.price = "Preço deve ser maior que zero";
    }

    if (!formData.image.trim()) {
      newErrors.image = "URL da imagem é obrigatória";
    } else if (!/^https?:\/\/.+/.test(formData.image) && !formData.image.startsWith('/')) {
      newErrors.image = "URL da imagem deve ser válida";
    }

    if (!formData.category) {
      newErrors.category = "Categoria é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    
    try {
      await onAddProduct(formData);
      // Limpar formulário após sucesso
      setFormData({
        name: "",
        description: "",
        price: 0,
        image: "",
        category: "face",
        inStock: true,
        stock: 0,
        rating: 0,
      });
      setErrors({});
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      setErrors({ general: error instanceof Error ? error.message : "Erro ao adicionar produto" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Botão fechar */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Fechar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <motion.h2
                className="text-2xl font-bold text-pink-800 mb-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Adicionar Novo Produto
              </motion.h2>
              <motion.p
                className="text-sm text-pink-600"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Preencha as informações do produto
              </motion.p>
            </div>

            {/* Erro geral */}
            {errors.general && (
              <motion.div
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-sm text-red-600">{errors.general}</p>
              </motion.div>
            )}

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Nome do Produto"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Ex: Lip Gloss Shine+"
                  error={errors.name}
                  icon={
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  }
                  disabled={isLoading}
                />

                <FormInput
                  label="Preço"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", Number(e.target.value))}
                  placeholder="39.90"
                  error={errors.price}
                  icon={
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  }
                  disabled={isLoading}
                />
              </div>

              <FormInput
                label="Descrição"
                type="text"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Descreva o produto..."
                error={errors.description}
                icon={
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
                disabled={isLoading}
              />

              <FormInput
                label="URL da Imagem"
                type="text"
                value={formData.image}
                onChange={(e) => handleInputChange("image", e.target.value)}
                placeholder="/icons/imagem.jpg ou https://..."
                error={errors.image}
                icon={
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                }
                disabled={isLoading}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Categoria */}
                <div>
                  <label className="block text-sm font-medium text-pink-700 mb-2">
                    Categoria
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 ${
                      errors.category 
                        ? 'border-red-300 bg-red-50 text-red-900' 
                        : 'border-pink-200 bg-white text-pink-900'
                    }`}
                    disabled={isLoading}
                  >
                    {CATEGORIES.filter(cat => cat.id !== 'all').map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                  )}
                </div>

                {/* Status do Estoque */}
                <div>
                  <label className="block text-sm font-medium text-pink-700 mb-2">
                    Status do Estoque
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center text-sm text-pink-600 cursor-pointer">
                      <input
                        type="radio"
                        name="inStock"
                        checked={formData.inStock}
                        onChange={() => handleInputChange("inStock", true)}
                        className="mr-2 text-pink-600 focus:ring-pink-500"
                        disabled={isLoading}
                      />
                      Em Estoque
                    </label>
                    <label className="flex items-center text-sm text-pink-600 cursor-pointer">
                      <input
                        type="radio"
                        name="inStock"
                        checked={!formData.inStock}
                        onChange={() => handleInputChange("inStock", false)}
                        className="mr-2 text-pink-600 focus:ring-pink-500"
                        disabled={isLoading}
                      />
                      Sem Estoque
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Quantidade em Estoque */}
                <FormInput
                  label="Quantidade em Estoque"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => handleInputChange("stock", Number(e.target.value))}
                  placeholder="0"
                  error={errors.stock}
                  icon={
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  }
                  disabled={isLoading}
                />

                {/* Rating */}
                <FormInput
                  label="Avaliação (0-5)"
                  type="number"
                  value={formData.rating}
                  onChange={(e) => handleInputChange("rating", Number(e.target.value))}
                  placeholder="4.5"
                  error={errors.rating}
                  icon={
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  }
                  disabled={isLoading}
                />
              </div>

              {/* Botões */}
              <div className="flex justify-end space-x-3 pt-4">
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 text-sm font-medium text-pink-600 bg-white border border-pink-200 rounded-lg hover:bg-pink-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                >
                  Cancelar
                </motion.button>
                <motion.button
                  type="submit"
                  className="px-6 py-2 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adicionando...
                    </div>
                  ) : (
                    'Adicionar Produto'
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 