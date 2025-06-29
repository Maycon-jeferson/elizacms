"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCardProps } from "@/types/product";

export const ProductCard = ({ product }: ProductCardProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleWhatsApp = () => {
    const message = `Olá! Gostaria de saber mais sobre o produto: ${product.name} - ${product.price}`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="transition-transform"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative cursor-pointer" onClick={() => setShowModal(true)}>
          <div className="relative w-full h-[280px] sm:h-[320px] md:h-[360px] overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.image}
              alt={`Card de ${product.name}`}
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          <div className="absolute top-40 sm:top-48 md:top-52 left-0 w-full px-2 sm:px-3 md:px-4 pb-20 sm:pb-20">
            <div className="bg-pink-50/70 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-md text-center h-[100px] sm:h-[120px] flex flex-col border border-pink-100/50">
              <div className="flex-1 flex flex-col justify-start">
                <h2 className="text-sm sm:text-base font-semibold text-pink-800 mb-1 line-clamp-1">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm text-pink-600 line-clamp-2 flex-1">
                  {product.description}
                </p>
              </div>
              
              <div className="mt-2">
                <p className="text-sm sm:text-base font-bold text-pink-700">
                  {product.price}
                </p>
                {product.inStock === false && (
                  <span className="text-red-500 text-xs font-medium">
                    Fora de estoque
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl max-w-xs w-full p-6 relative flex flex-col items-center"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={product.image}
                alt={`Card de ${product.name}`}
                className="w-40 h-40 object-cover object-center rounded-xl mb-4"
              />
              <h2 className="text-lg font-bold text-pink-800 mb-2 text-center">{product.name}</h2>
              <p className="text-sm text-pink-600 mb-2 text-center">{product.description}</p>
              <p className="text-base font-bold text-pink-700 mb-4">{product.price}</p>
              {product.inStock === false && (
                <span className="text-red-500 text-xs font-medium mb-2">Fora de estoque</span>
              )}
              <button
                onClick={handleWhatsApp}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-2 flex items-center gap-2 font-semibold text-base shadow-md transition-colors duration-200 mt-2"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                WhatsApp
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-pink-400 hover:text-pink-700 text-xl font-bold px-2 py-1 rounded-full focus:outline-none"
                aria-label="Fechar"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}; 