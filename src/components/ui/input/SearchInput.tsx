"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (term: string) => void;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
}

export const SearchInput = ({ 
  value, 
  onChange, 
  onSearch,
  placeholder = "Buscar produto...",
  className = "",
  debounceMs = 500
}: SearchInputProps) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [value, debounceMs]);

  // Trigger search when debounced value changes
  useEffect(() => {
    if (onSearch && debouncedValue !== value) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch, value]);

  const handleChange = useCallback((newValue: string) => {
    onChange(newValue);
  }, [onChange]);

  return (
    <motion.div 
      className={`flex justify-center mb-6 sm:mb-8 px-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full max-w-[300px] h-[40px] overflow-hidden">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-pink-400">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </span>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full h-full pl-12 pr-4 rounded-md bg-white text-pink-800 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all border border-pink-200 shadow-sm text-sm sm:text-base"
        />
      </div>
    </motion.div>
  );
}; 