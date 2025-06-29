// Configuração do Supabase
// Para usar esta funcionalidade, você precisa:

// 1. Criar uma conta gratuita em: https://supabase.com
// 2. Criar um novo projeto
// 3. Ir em Settings > API
// 4. Copiar a URL e a anon key
// 5. Criar um arquivo .env.local na raiz do projeto com:

/*
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
*/

// 6. Criar a tabela 'products' no Supabase com a seguinte estrutura SQL:

/*
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price VARCHAR(50) NOT NULL,
  image VARCHAR(500),
  category VARCHAR(100),
  in_stock BOOLEAN DEFAULT true,
  rating DECIMAL(3,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
*/

// 7. Inserir os produtos iniciais:

/*
INSERT INTO products (name, description, price, image, category, in_stock) VALUES
('Lip Gloss Shine+', 'Hidratação intensa com brilho radiante.', 'R$ 39,90', '/icons/download.jpg', 'lips', true),
('Base HD Skin', 'Cobertura leve com efeito natural.', 'R$ 89,90', '/icons/img1.jpeg', 'face', true),
('Paleta Sunset Eyes', '12 cores vibrantes inspiradas no pôr do sol.', 'R$ 129,90', '/icons/img2.jpeg', 'eyes', true),
('Máscara de Cílios Volume+', 'Volume e alongamento intensos para cílios deslumbrantes.', 'R$ 59,90', '/icons/img3.jpeg', 'eyes', true),
('Batom Matte Longa Duração', 'Cor intensa que dura até 8 horas sem manchar.', 'R$ 79,90', '/icons/Card.svg', 'lips', true),
('Corretivo Camuflagem Pro', 'Cobertura profissional para imperfeições.', 'R$ 45,90', '/icons/Card.svg', 'face', true),
('Hidratante Facial 24h', 'Hidratação profunda que dura 24 horas com vitamina C.', 'R$ 69,90', '/icons/Card.svg', 'skincare', true);
*/

export const SUPABASE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
}; 