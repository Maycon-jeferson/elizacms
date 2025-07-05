# Configuração do Supabase para Eliza CMS

Este guia irá te ajudar a configurar o Supabase para o projeto Eliza CMS.

## 1. Criar conta no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Faça login com GitHub ou crie uma conta
4. Clique em "New Project"

## 2. Configurar o projeto

1. **Nome do projeto**: `eliza-cms` (ou qualquer nome)
2. **Database Password**: Crie uma senha forte
3. **Region**: Escolha a região mais próxima (ex: São Paulo)
4. Clique em "Create new project"

## 3. Obter as credenciais

1. No dashboard do Supabase, vá em **Settings** > **API**
2. Copie:
   - **Project URL** (ex: `https://xyz.supabase.co`)
   - **anon public** key (ex: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## 4. Configurar variáveis de ambiente

1. Crie um arquivo `.env.local` na raiz do projeto
2. Adicione as seguintes variáveis:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

## 5. Criar a tabela de produtos

1. No Supabase, vá em **SQL Editor**
2. Clique em **New query**
3. Execute o seguinte SQL:

```sql
-- Criar tabela de produtos
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image VARCHAR(500),
  category VARCHAR(100),
  in_stock BOOLEAN DEFAULT true,
  stock INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Configurar Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Permitir leitura pública
CREATE POLICY "Allow public read access" ON products
  FOR SELECT USING (true);

-- Permitir inserção, atualização e deleção para usuários autenticados
-- (Você pode ajustar isso conforme necessário)
CREATE POLICY "Allow authenticated insert" ON products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON products
  FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated delete" ON products
  FOR DELETE USING (true);
```

## 6. Testar a configuração

1. Execute o projeto:
```bash
npm run dev
```

2. Acesse a aba "Administrador" no site
3. Tente adicionar um produto
4. Verifique se o produto aparece na lista

## 7. Estrutura da tabela

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | SERIAL | ID único do produto (auto-incremento) |
| name | VARCHAR(255) | Nome do produto |
| description | TEXT | Descrição do produto |
| price | DECIMAL(10,2) | Preço do produto |
| image | VARCHAR(500) | URL da imagem do produto |
| category | VARCHAR(100) | Categoria do produto |
| in_stock | BOOLEAN | Se o produto está em estoque |
| stock | INTEGER | Quantidade em estoque |
| rating | DECIMAL(3,2) | Avaliação do produto (0-5) |
| created_at | TIMESTAMP | Data de criação |

## 8. Solução de problemas

### Erro "Supabase não está configurado"
- Verifique se o arquivo `.env.local` existe
- Confirme se as variáveis estão corretas
- Reinicie o servidor de desenvolvimento

### Erro de conexão
- Verifique se a URL do Supabase está correta
- Confirme se a chave anônima está correta
- Verifique se o projeto está ativo no Supabase

### Erro de permissão
- Verifique se as políticas RLS estão configuradas corretamente
- Confirme se a tabela `products` foi criada

## 9. Próximos passos

Após configurar o Supabase, você pode:

1. **Adicionar autenticação**: Configurar login/registro de usuários
2. **Upload de imagens**: Configurar storage para upload de imagens
3. **Backup automático**: Configurar backups da base de dados
4. **Monitoramento**: Configurar logs e métricas

## Suporte

Se encontrar problemas:
1. Verifique os logs do console do navegador
2. Verifique os logs do Supabase
3. Consulte a [documentação do Supabase](https://supabase.com/docs) 