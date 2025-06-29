# 🚀 Configuração do Supabase para ElizaCMS

## 📋 Pré-requisitos

1. Conta no GitHub (para deploy)
2. Conta no Supabase (gratuita)
3. Conta no Vercel (gratuita, opcional)

## 🔧 Passo a Passo

### 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Faça login com GitHub
4. Clique em "New Project"
5. Escolha sua organização
6. Digite um nome: `elizacms`
7. Digite uma senha forte para o banco
8. Escolha uma região próxima (ex: São Paulo)
9. Clique em "Create new project"

### 2. Configurar Banco de Dados

1. No dashboard do Supabase, vá em **SQL Editor**
2. Execute o seguinte SQL para criar a tabela:

```sql
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
```

3. Execute o SQL para inserir produtos iniciais:

```sql
INSERT INTO products (name, description, price, image, category, in_stock) VALUES
('Lip Gloss Shine+', 'Hidratação intensa com brilho radiante.', 'R$ 39,90', '/icons/download.jpg', 'lips', true),
('Base HD Skin', 'Cobertura leve com efeito natural.', 'R$ 89,90', '/icons/img1.jpeg', 'face', true),
('Paleta Sunset Eyes', '12 cores vibrantes inspiradas no pôr do sol.', 'R$ 129,90', '/icons/img2.jpeg', 'eyes', true),
('Máscara de Cílios Volume+', 'Volume e alongamento intensos para cílios deslumbrantes.', 'R$ 59,90', '/icons/img3.jpeg', 'eyes', true),
('Batom Matte Longa Duração', 'Cor intensa que dura até 8 horas sem manchar.', 'R$ 79,90', '/icons/Card.svg', 'lips', true),
('Corretivo Camuflagem Pro', 'Cobertura profissional para imperfeições.', 'R$ 45,90', '/icons/Card.svg', 'face', true),
('Hidratante Facial 24h', 'Hidratação profunda que dura 24 horas com vitamina C.', 'R$ 69,90', '/icons/Card.svg', 'skincare', true);
```

### 3. Obter Credenciais da API

1. No dashboard do Supabase, vá em **Settings** > **API**
2. Copie a **URL** (algo como: `https://xyz.supabase.co`)
3. Copie a **anon public** key (algo como: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 4. Configurar Variáveis de Ambiente

1. Na raiz do projeto, crie um arquivo `.env.local`
2. Adicione as seguintes linhas:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

**Substitua pelos valores que você copiou no passo anterior.**

### 5. Testar Localmente

1. Execute o projeto:
```bash
npm run dev
```

2. Acesse `http://localhost:3000`
3. Faça login como administrador:
   - Email: `admin@eliza.com`
   - Senha: `123456`
4. Clique em "+ Produto" e teste adicionar um produto

### 6. Deploy no Vercel (Opcional)

1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Conecte com GitHub
4. Importe o repositório
5. Em **Environment Variables**, adicione:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Clique em **Deploy**

## 🔒 Configurações de Segurança

### Row Level Security (RLS)

Para maior segurança, você pode ativar RLS:

```sql
-- Ativar RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura pública
CREATE POLICY "Allow public read access" ON products
FOR SELECT USING (true);

-- Política para permitir inserção apenas de usuários autenticados
CREATE POLICY "Allow authenticated insert" ON products
FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

## 📊 Monitoramento

- **Dashboard Supabase**: Visualize dados em tempo real
- **Logs**: Monitore queries e erros
- **Analytics**: Acompanhe uso da API

## 🆓 Limites Gratuitos

- **500MB** de dados
- **50MB** de transferência
- **2GB** de bandwidth
- **50,000** requests/mês

## 🆘 Troubleshooting

### Erro: "Invalid API key"
- Verifique se as variáveis de ambiente estão corretas
- Reinicie o servidor após adicionar `.env.local`

### Erro: "Table does not exist"
- Execute o SQL para criar a tabela
- Verifique se está no projeto correto

### Erro: "Network error"
- Verifique sua conexão com a internet
- Verifique se a URL do Supabase está correta

## 🎉 Pronto!

Agora seus produtos são salvos permanentemente no banco de dados e podem ser acessados de qualquer lugar! 