import { useState, useEffect, useCallback } from 'react';
import { User, AuthState } from '@/types/auth';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Verificar se há um usuário logado no localStorage ao inicializar
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('eliza_user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<void> => {
    // Login apenas para administrador
    if (email === 'admin@eliza.com' && password === '123456') {
      const user: User = {
        id: '1',
        email: email,
        name: 'Administrador',
      };

      // Salvar no localStorage
      localStorage.setItem('eliza_user', JSON.stringify(user));
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      throw new Error('Credenciais inválidas. Apenas o administrador pode fazer login.');
    }
  }, []);

  const logout = useCallback(() => {
    // Remover do localStorage
    localStorage.removeItem('eliza_user');
    
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  const register = useCallback(async (email: string, password: string, name: string): Promise<void> => {
    // Simular registro
    return new Promise((resolve) => {
      setTimeout(() => {
        // Em produção, isso seria uma chamada para a API
        const user: User = {
          id: Date.now().toString(),
          email,
          name,
        };

        localStorage.setItem('eliza_user', JSON.stringify(user));
        
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });

        resolve();
      }, 1000);
    });
  }, []);

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    login,
    logout,
    register,
  };
}; 