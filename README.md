# API de Troca de Livros

API para gerenciar usuários e livros, permitindo cadastro, login e troca de livros.

## Tecnologias

- Node.js
- TypeScript
- Express
- Prisma (com MongoDB)
- Bcrypt (para hash de senha)
- JWT (autenticação)
- dotenv (variáveis de ambiente)




## Instalação

1. Clone o repositório:

```bash
git clone <URL_DO_REPO>
cd API-troca-de-livros



yarn install
# ou
npm install

Configure as variáveis de ambiente (.env):
DATABASE_URL=<sua_url_mongodb>
JWT_SECRET=<sua_chave_secreta>


Gere o client do Prisma:
npx prisma generate


Rodando a API
yarn dev
# ou
npm run dev



