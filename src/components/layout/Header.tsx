"use client";

import { motion } from "framer-motion";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header = ({ 
  title = "Catálogo de Cosméticos",
  subtitle = "Beleza que encanta. Qualidade que transforma."
}: HeaderProps) => {
  return (
    <section className="text-center mb-8 sm:mb-12 p-4 sm:p-6">
      <motion.h1
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-800 mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h1>
      <motion.p 
        className="text-sm sm:text-base text-pink-600 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {subtitle}
      </motion.p>
    </section>
  );
}; 