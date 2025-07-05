import React from 'react';
import { motion } from 'framer-motion';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
  isTimeout?: boolean;
  loading?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  error, 
  onRetry, 
  isTimeout = false,
  loading = false 
}) => {
  return (
    <motion.div
      className="flex items-center justify-center py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="text-center max-w-md mx-auto px-4">
        {/* Ícone de erro */}
        <motion.div
          className="text-red-500 mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          {isTimeout ? (
            <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          )}
        </motion.div>

        {/* Título */}
        <motion.h3
          className="text-xl font-semibold text-red-600 mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {isTimeout ? 'Tempo limite excedido' : 'Erro ao carregar produtos'}
        </motion.h3>

        {/* Mensagem de erro */}
        <motion.p
          className="text-red-500 mb-6 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {error}
        </motion.p>

        {/* Botão de retry */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={onRetry}
            disabled={loading}
            className={`
              inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-pink-600 rounded-lg 
              hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2
            `}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Tentando novamente...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Tentar novamente
              </>
            )}
          </button>
        </motion.div>

        {/* Dica adicional para timeout */}
        {isTimeout && (
          <motion.p
            className="text-gray-500 text-xs mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Verifique sua conexão com a internet e tente novamente
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}; 