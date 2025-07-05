"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Button } from "../button/Button";
import { FormInput } from "../input/FormInput";
import { CATEGORIES } from "@/constants/products";
import { Product } from "@/types/product";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Omit<Product, 'id'>) => Promise<void>;
}

export const AddProductModal = ({ isOpen, onClose, onAddProduct }: AddProductModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "face",
    inStock: true,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
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
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome do produto é obrigatório";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Descrição é obrigatória";
    } else if (formData.description.length < 10) {
      newErrors.description = "Descrição deve ter pelo menos 10 caracteres";
    }

    if (!formData.price.trim()) {
      newErrors.price = "Preço é obrigatório";
    } else if (!/^R\$ \d+,\d{2}$/.test(formData.price)) {
      newErrors.price = "Preço deve estar no formato R$ XX,XX";
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
      await onAddProduct({
        ...formData,
        price: Number(formData.price),
      });
      // Limpar formulário após sucesso
      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "face",
        inStock: true,
      });
      setErrors({});
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      setErrors({ general: error instanceof Error ? error.message : "Erro ao adicionar produto" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
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
                  type="text"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="R$ 39,90"
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
                        checked={formData.inStock === true}
                        onChange={() => handleInputChange("inStock", true)}
                        className="mr-2 text-pink-600 focus:ring-pink-500"
                        disabled={isLoading}
                      />
                      Em estoque
                    </label>
                    <label className="flex items-center text-sm text-pink-600 cursor-pointer">
                      <input
                        type="radio"
                        name="inStock"
                        checked={formData.inStock === false}
                        onChange={() => handleInputChange("inStock", false)}
                        className="mr-2 text-pink-600 focus:ring-pink-500"
                        disabled={isLoading}
                      />
                      Fora de estoque
                    </label>
                  </div>
                </div>
              </div>

              {/* Botões */}
              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? "Adicionando..." : "Adicionar Produto"}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 