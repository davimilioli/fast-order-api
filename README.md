# Fast Order API v0.2
Sistema de pedidos para delivery sendo desenvolvido em Node.js com TypeScript e Express. Permite o gerenciamento de pedidos e usuários.

## Tecnologias Utilizadas
* Node.js
* Express
* Sqlite
* Sequelize

## Funcionalidades principais

### Autenticação
* Permite acesso seguro aos usuários atráves de login.
* Autenticação usando email e senha.
* Utilização do JWT (JSON Web Tokens).,

**Métodos:**
* `POST /login:` Recebe credenciais e retorna um token JWT.
* `POST /logout:` Realiza a desautenticação do usuário.

### Gerenciamento de Produto
* Permite adicão, remoção e atualização de produtos no sistema.

**Métodos:**
* `POST /products:` Cria um novo produto.
* `GET /products:` Lista todos os produtos disponíveis.
* `GET /products/:id:` Obtém detalhes de um produto específico.
* `PUT /products/:id:` Atualiza um produto existente.
* `DELETE /products/:id:` Remove um produto da lista.

## Iniciar projeto

### Pré-requisitos globais:
`npm i -g nodemon typescript ts-node`

### Instalação
`npm install`

### Rodar o projeto
`npm run start-dev`

## Sugestões, Dúvidas ou Erros
Entre em contato comigo:
[Email](mailto:davimilioli2108@gmail.com)
