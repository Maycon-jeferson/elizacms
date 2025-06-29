# Estrutura do Projeto ElizaCMS

## 📁 Organização das Pastas

### `/src/app`
- **layout.tsx**: Layout principal da aplicação
- **page.tsx**: Página inicial (Home)
- **globals.css**: Estilos globais
- **favicon.ico**: Ícone da aplicação

### `/src/components`
Componentes reutilizáveis organizados por categoria:

#### `/components/ui`
- **navbar/**: Componentes de navegação
  - `Navbar.tsx`: Barra de navegação principal
- **input/**: Componentes de entrada
  - `SearchInput.tsx`: Campo de busca
  - `FilterControls.tsx`: Controles de filtro e ordenação
- **card/**: Componentes de cards
  - `ProductCard.tsx`: Card individual de produto
  - `ProductGrid.tsx`: Grid de produtos

#### `/components/layout`
- **Header.tsx**: Cabeçalho da página

### `/src/types`
Definições de tipos TypeScript:
- **product.ts**: Tipos relacionados a produtos

### `/src/constants`
Dados estáticos e constantes:
- **products.ts**: Lista de produtos e categorias

### `/src/hooks`
Hooks personalizados:
- **useProducts.ts**: Hook para gerenciar produtos, filtros e ordenação

### `/src/utils`
Funções utilitárias:
- **filters.ts**: Funções de filtro e ordenação de produtos

### `/src/lib`
Bibliotecas e configurações externas

### `/src/services`
Serviços e APIs

### `/src/features`
Funcionalidades específicas da aplicação

### `/src/styles`
Estilos adicionais

## 🚀 Como Usar

### Importando Componentes
```typescript
// Importar componentes UI
import { Navbar, SearchInput, ProductGrid } from "@/components/ui";

// Importar componentes de layout
import { Header } from "@/components/layout";

// Importar hooks
import { useProducts } from "@/hooks/useProducts";

// Importar tipos
import { Product } from "@/types/product";

// Importar constantes
import { PRODUCTS, CATEGORIES } from "@/constants/products";

// Importar utilitários
import { filterProductsByName } from "@/utils/filters";
```

### Adicionando Novos Produtos
Edite o arquivo `src/constants/products.ts` para adicionar novos produtos:

```typescript
export const PRODUCTS: Product[] = [
  {
    id: 7,
    name: "Novo Produto",
    description: "Descrição do produto",
    price: "R$ 99,90",
    image: "/icons/Card.svg",
    category: "face",
    inStock: true,
    rating: 4.5,
  },
  // ... mais produtos
];
```

### Criando Novos Componentes
1. Crie o componente na pasta apropriada
2. Adicione a exportação no arquivo `index.ts` correspondente
3. Importe e use no componente desejado

## 🎨 Padrões de Design

- **TypeScript**: Tipagem forte em todo o projeto
- **Tailwind CSS**: Estilização utilitária
- **Framer Motion**: Animações suaves
- **Componentes Reutilizáveis**: Estrutura modular
- **Hooks Personalizados**: Lógica reutilizável
- **Separação de Responsabilidades**: Cada arquivo tem uma função específica

## 📝 Próximos Passos

- [ ] Implementar carrinho de compras
- [ ] Adicionar sistema de autenticação
- [ ] Criar páginas de detalhes do produto
- [ ] Implementar sistema de avaliações
- [ ] Adicionar testes unitários
- [ ] Configurar PWA 