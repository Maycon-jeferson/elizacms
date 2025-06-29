"use client";

import { motion } from "framer-motion";
import { InputHTMLAttributes, forwardRef } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, icon, className = "", ...props }, ref) => {
    return (
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {label && (
          <label className="block text-sm font-medium text-pink-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="h-5 w-5 text-pink-400">
                {icon}
              </div>
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full px-3 py-2 border rounded-lg text-sm transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300
              ${icon ? 'pl-10' : ''}
              ${error 
                ? 'border-red-300 bg-red-50 text-red-900' 
                : 'border-pink-200 bg-white text-pink-900 placeholder-pink-400'
              }
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <motion.p
            className="mt-1 text-sm text-red-600"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    );
  }
);

FormInput.displayName = "FormInput"; 