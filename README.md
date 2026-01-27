# Estância Menin - CMS Admin

Sistema de gerenciamento de conteúdo para o site da Estância Menin.

## 🚀 Tecnologias

- **Next.js 16** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Supabase** - Banco de dados e autenticação

## 📋 Pré-requisitos

1. Node.js 18+
2. Conta no [Supabase](https://supabase.com)
3. Conta no [Vercel](https://vercel.com) (para deploy)

## 🔧 Configuração

### 1. Criar projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta
2. Clique em "New Project"
3. Escolha um nome e senha para o banco de dados
4. Anote a **URL** e **anon key** nas configurações do projeto

### 2. Executar o script SQL

1. No painel do Supabase, vá em **SQL Editor**
2. Copie o conteúdo do arquivo `supabase-schema.sql`
3. Execute o script para criar as tabelas

### 3. Criar bucket de storage

1. Vá em **Storage** no painel do Supabase
2. Clique em **Create bucket**
3. Nome: `galeria`
4. Marque como **Public**

### 4. Criar usuário admin

1. Vá em **Authentication > Users**
2. Clique em **Add user**
3. Email: `meninagenda@gmail.com`
4. Defina uma senha
5. Marque **Auto confirm user**

### 5. Configurar variáveis de ambiente

1. Copie `.env.local.example` para `.env.local`
2. Preencha com suas credenciais:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
```

### 6. Instalar dependências e rodar

```bash
npm install
npm run dev
```

Acesse: http://localhost:3000/admin

## 📁 Estrutura

```
src/
├── app/
│   ├── admin/           # Painel administrativo
│   │   ├── page.tsx     # Dashboard
│   │   ├── login/       # Login
│   │   ├── calendario/  # Gestão de calendário
│   │   ├── pacotes/     # Gestão de pacotes
│   │   ├── galeria/     # Gestão de fotos
│   │   ├── avisos/      # Gestão de avisos
│   │   └── configuracoes/ # Configurações
│   └── layout.tsx
├── lib/
│   └── supabase/        # Clientes Supabase
├── types/
│   └── database.ts      # Tipos TypeScript
└── proxy.ts             # Proteção de rotas (antigo middleware)
```

## 🚀 Deploy no Vercel

1. Push o código para o GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Importe o repositório
4. Adicione as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy!

## 📝 Funcionalidades

- ✅ Login com autenticação Supabase
- ✅ Dashboard com estatísticas
- ✅ Calendário de reservas
- ✅ Gestão de pacotes de preços
- ✅ Galeria de fotos com upload
- ✅ Sistema de avisos/promoções
- ✅ Configurações gerais
