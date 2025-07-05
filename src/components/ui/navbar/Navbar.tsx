"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../button/Button";
import { LoginModal } from "../auth/LoginModal";
import { AddProductModal } from "../admin/AddProductModal";
import { useAuth } from "@/hooks/useAuth";
import { useProducts } from "@/hooks/useProducts";
import { CreateProductData } from "@/types/product";

interface NavbarProps {
  title?: string;
  menuItems?: Array<{ label: string; href: string }>;
}

export const Navbar = ({ 
  title = "CosmoStore", 
  menuItems = [
    { label: "Home", href: "/" },
    { label: "Produtos", href: "/produtos" },
    { label: "Contato", href: "/contato" },
  ] 
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const { user, isAuthenticated, login, logout } = useAuth();
  const { addProduct } = useProducts();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      setIsLoginModalOpen(false);
    } catch (error) {
      // O erro será tratado no modal
      throw error;
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleAddProduct = async (productData: CreateProductData) => {
    try {
      await addProduct(productData);
      setIsAddProductModalOpen(false);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <nav className="bg-white shadow-md py-3 px-4 sm:py-4 sm:px-6 flex justify-between items-center sticky top-0 z-50">
        <motion.h1 
          className="text-xl sm:text-2xl font-bold text-pink-700"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        
        {/* Menu Desktop */}
        <div className="hidden sm:flex items-center space-x-4">
          <ul className="flex space-x-4 text-pink-600">
            {menuItems.map((item, index) => (
              <motion.li
                key={item.label}
                className="hover:text-pink-800 cursor-pointer transition-colors"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.label}
              </motion.li>
            ))}
          </ul>

          {/* Botão de Login/Logout Desktop */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center space-x-3"
          >
            {isAuthenticated ? (
              <>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsAddProductModalOpen(true)}
                >
                  + Produto
                </Button>
                <span className="text-sm text-pink-600">
                  Olá, {user?.name}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                >
                  Sair
                </Button>
              </>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsLoginModalOpen(true)}
              >
                Entrar
              </Button>
            )}
          </motion.div>
        </div>

        {/* Menu Mobile */}
        <div className="sm:hidden flex items-center space-x-2">
          {/* Botão de Login/Logout Mobile */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsAddProductModalOpen(true)}
              >
                + Produto
              </Button>
              <span className="text-xs text-pink-600">
                {user?.name}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                Sair
              </Button>
            </div>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Entrar
            </Button>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-pink-600 hover:text-pink-800 p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Mobile Dropdown */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg sm:hidden"
          >
            <ul className="py-2">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.label}
                  className="px-4 py-2 text-pink-600 hover:text-pink-800 hover:bg-pink-50 cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item.label}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </nav>

      {/* Modal de Login */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />

      {/* Modal de Adicionar Produto */}
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </>
  );
}; 