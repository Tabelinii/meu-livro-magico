# 🚀 Meu Livro Mágico - Backend NestJS

Backend moderno e escalável para a plataforma de livros personalizados com IA.

## 📋 **Sobre o Projeto**

Este é o backend NestJS que substitui o backend Flask original, oferecendo:

-   **Arquitetura moderna** com TypeScript
-   **API RESTful** completa e documentada
-   **Autenticação JWT** segura
-   **Integração com IA** para geração de imagens
-   **Geração de PDFs** profissionais
-   **Banco de dados** SQLite com TypeORM
-   **Documentação automática** com Swagger

## 🛠️ **Tecnologias Utilizadas**

### **Core:**

-   **NestJS** - Framework Node.js moderno
-   **TypeScript** - Tipagem estática
-   **TypeORM** - ORM para banco de dados
-   **SQLite** - Banco de dados leve

### **Autenticação:**

-   **JWT** - JSON Web Tokens
-   **Passport** - Estratégias de autenticação
-   **bcryptjs** - Hash de senhas

### **IA e Processamento:**

-   **Replicate** - API de IA para geração de imagens
-   **Puppeteer** - Geração de PDFs
-   **Axios** - Cliente HTTP

### **Documentação:**

-   **Swagger/OpenAPI** - Documentação automática da API
-   **Class Validator** - Validação de dados
-   **Class Transformer** - Transformação de objetos

## 📁 **Estrutura do Projeto**

```
backend-nestjs/
├── src/
│   ├── auth/                 # Módulo de autenticação
│   │   ├── dto/             # DTOs de login
│   │   ├── guards/          # Guards JWT
│   │   ├── strategies/      # Estratégias Passport
│   │   └── auth.service.ts  # Serviço de autenticação
│   ├── users/               # Módulo de usuários
│   │   ├── dto/             # DTOs de usuário
│   │   ├── entities/        # Entidade User
│   │   └── users.service.ts # Serviço de usuários
│   ├── books/               # Módulo de livros
│   │   ├── dto/             # DTOs de livro
│   │   ├── entities/        # Entidade Book
│   │   └── books.service.ts # Serviço de livros
│   ├── stories/             # Módulo de histórias
│   │   ├── dto/             # DTOs de história
│   │   ├── entities/        # Entidade Story
│   │   └── stories.service.ts # Serviço de histórias
│   ├── ai/                  # Módulo de IA
│   │   └── ai.service.ts    # Integração com Replicate
│   ├── pdf/                 # Módulo de PDF
│   │   └── pdf.service.ts   # Geração de PDFs
│   ├── processing/          # Módulo de processamento
│   │   └── processing.service.ts # Orquestração de livros
│   ├── config/              # Configurações
│   │   └── database.config.ts # Config do banco
│   ├── database/            # Scripts de banco
│   │   ├── seeds.ts         # Seeds iniciais
│   │   └── seed-runner.ts   # Executor de seeds
│   ├── app.module.ts        # Módulo principal
│   └── main.ts              # Arquivo de entrada
├── database/                # Banco de dados SQLite
├── uploads/                 # Arquivos gerados
│   ├── pdfs/               # PDFs dos livros
│   └── images/             # Imagens geradas
├── .env                     # Variáveis de ambiente
├── package.json             # Dependências
└── README.md               # Esta documentação
```

## 🚀 **Como Executar**

### **1. Pré-requisitos:**

```bash
# Node.js 18+ e npm
node --version
npm --version
```

### **2. Instalação:**

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas configurações
```

### **3. Banco de Dados:**

```bash
# Executar seeds (criar histórias iniciais)
npm run seed

# Resetar banco (opcional)
npm run db:reset
```

### **4. Desenvolvimento:**

```bash
# Modo desenvolvimento (hot reload)
npm run start:dev

# Modo debug
npm run start:debug
```

### **5. Produção:**

```bash
# Build
npm run build

# Executar em produção
npm run start:prod
```

## 🌐 **Endpoints da API**

### **Autenticação:**

-   `POST /api/auth/register` - Registrar usuário
-   `POST /api/auth/login` - Fazer login
-   `GET /api/auth/profile` - Obter perfil (autenticado)

### **Usuários:**

-   `GET /api/users` - Listar usuários (autenticado)
-   `GET /api/users/:id` - Buscar usuário (autenticado)
-   `PATCH /api/users/:id` - Atualizar usuário (autenticado)
-   `DELETE /api/users/:id` - Deletar usuário (autenticado)

### **Histórias:**

-   `GET /api/stories` - Listar histórias
-   `GET /api/stories/featured` - Histórias em destaque
-   `GET /api/stories/popular` - Histórias populares
-   `GET /api/stories/by-gender` - Agrupar por gênero
-   `GET /api/stories/:id` - Buscar história por ID
-   `GET /api/stories/slug/:slug` - Buscar por slug

### **Livros:**

-   `POST /api/books` - Criar livro (autenticado)
-   `GET /api/books` - Listar livros do usuário (autenticado)
-   `GET /api/books/:id` - Buscar livro (autenticado)
-   `GET /api/books/:id/content` - Conteúdo personalizado (autenticado)
-   `PATCH /api/books/:id` - Atualizar livro (autenticado)
-   `DELETE /api/books/:id` - Deletar livro (autenticado)

### **Processamento:**

-   `POST /api/processing/books/:id/process` - Processar livro (autenticado)
-   `GET /api/processing/books/:id/status` - Status do processamento (autenticado)
-   `GET /api/processing/books/:id/preview` - Preview do livro (autenticado)
-   `POST /api/processing/books/:id/retry` - Reprocessar livro (autenticado)

## 📚 **Documentação da API**

Acesse a documentação interativa em:

```
http://localhost:3000/api/docs
```

A documentação Swagger inclui:

-   **Todos os endpoints** com exemplos
-   **Esquemas de dados** detalhados
-   **Códigos de resposta** e erros
-   **Autenticação** via Bearer Token
-   **Teste interativo** dos endpoints

## ⚙️ **Configuração**

### **Variáveis de Ambiente (.env):**

```env
# Banco de Dados
DATABASE_PATH=database/meu-livro-magico.db

# JWT
JWT_SECRET=seu-jwt-secret-super-seguro
JWT_EXPIRES_IN=24h

# Replicate (IA) - Opcional
REPLICATE_API_TOKEN=seu-token-replicate

# Servidor
PORT=3000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:5173

# Uploads
UPLOADS_DIR=./uploads
```

### **Configuração da IA (Opcional):**

Para habilitar a geração de imagens com IA:

1. **Criar conta** no [Replicate](https://replicate.com)
2. **Obter API token** no dashboard
3. **Configurar** `REPLICATE_API_TOKEN` no `.env`

Sem o token, o sistema usará imagens placeholder.

## 🗄️ **Banco de Dados**

### **Entidades:**

#### **User (Usuário):**

```typescript
{
  id: number
  phone: string
  email: string
  password: string (hash)
  firstName?: string
  lastName?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
```

#### **Story (História):**

```typescript
{
  id: number
  slug: string
  title: string
  description: string
  category: StoryCategory
  gender: StoryGender
  ageRange: string
  pages: PageData[]
  coverImageUrl?: string
  isActive: boolean
  isFeatured: boolean
  usageCount: number
}
```

#### **Book (Livro):**

```typescript
{
  id: number
  title: string
  childName: string
  childAge: string
  status: BookStatus
  coverImageUrl?: string
  pdfUrl?: string
  personalizedContent?: string
  generationProgress?: number
  userId: number
  storyId: number
}
```

### **Seeds Iniciais:**

O sistema inclui 3 histórias pré-configuradas:

-   **A Grande Aventura do Penico** (Desenvolvimento Infantil)
-   **O Despertar dos Poderes** (Super-Herói para Meninos)
-   **A Princesa Corajosa** (Princesa para Meninas)

## 🔄 **Fluxo de Processamento**

### **Criação de Livro:**

1. **Usuário cria** livro via API
2. **Sistema personaliza** conteúdo da história
3. **IA gera** imagem de capa
4. **IA gera** imagens das páginas
5. **Sistema cria** PDF profissional
6. **Livro finalizado** disponível para download

### **Status do Livro:**

-   `draft` - Rascunho criado
-   `generating` - Processando com IA
-   `completed` - Finalizado com sucesso
-   `error` - Erro no processamento

## 🧪 **Testes**

```bash
# Testes unitários
npm run test

# Testes com watch
npm run test:watch

# Coverage
npm run test:cov

# Testes E2E
npm run test:e2e
```

## 🚀 **Deploy**

### **Preparação:**

```bash
# Build de produção
npm run build

# Configurar .env para produção
NODE_ENV=production
JWT_SECRET=jwt-secret-super-seguro-producao
```

### **Opções de Deploy:**

-   **Railway** - Deploy automático via Git
-   **Heroku** - Platform as a Service
-   **DigitalOcean** - VPS com Docker
-   **AWS/GCP** - Cloud providers

## 🔧 **Scripts Disponíveis**

```bash
npm run build          # Compilar TypeScript
npm run start          # Iniciar em produção
npm run start:dev      # Desenvolvimento com hot reload
npm run start:debug    # Modo debug
npm run seed           # Executar seeds
npm run db:reset       # Resetar banco e seeds
npm run lint           # Linter ESLint
npm run test           # Testes unitários
```

## 📈 **Melhorias Implementadas**

### **Em relação ao Flask:**

✅ **Tipagem estática** com TypeScript  
✅ **Arquitetura modular** bem estruturada  
✅ **Validação automática** de dados  
✅ **Documentação automática** com Swagger  
✅ **Injeção de dependência** nativa  
✅ **Middleware** e guards avançados  
✅ **Tratamento de erros** robusto  
✅ **Logs estruturados** por módulo  
✅ **Configuração** centralizada  
✅ **Testes** integrados

### **Funcionalidades Novas:**

🆕 **Sistema de processamento** assíncrono  
🆕 **Preview de livros** antes da geração  
🆕 **Estatísticas** detalhadas  
🆕 **Retry automático** em caso de erro  
🆕 **Progresso em tempo real** da geração  
🆕 **Categorização avançada** de histórias  
🆕 **Sistema de featured** stories  
🆕 **Contador de uso** das histórias

## 🤝 **Contribuição**

1. **Fork** o projeto
2. **Crie** uma branch para sua feature
3. **Commit** suas mudanças
4. **Push** para a branch
5. **Abra** um Pull Request

## 📄 **Licença**

Este projeto está sob a licença MIT.

## 🆘 **Suporte**

Para dúvidas ou problemas:

-   **Email:** contato@meulivromagico.com.br
-   **Issues:** GitHub Issues
-   **Documentação:** `/api/docs`

---

**Desenvolvido com ❤️ pela equipe Meu Livro Mágico**
