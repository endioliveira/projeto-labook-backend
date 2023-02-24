
<h1 align="center">:large_blue_diamond: Projeto Labook :large_blue_diamond:</h1>

# Índice 

* [Introdução](#introdução)
* [Conteúdos abordados no projeto](#conteúdos-abordados-no-projeto)
* [Endpoints](#endpoints)
* [Dependências](#dependências)
* [Rodando o projeto](#rodando-o-projeto)
* [Tecnologias utilizadas](#tecnologias-utilizadas)
* [Link da Documentação](#link-da-documentação)
* [Banco de Dados](#banco-de-dados)

# Introdução 
O projeto Labook é uma rede social com o objetivo de promover a conexão e interação entre pessoas. Quem se cadastrar no aplicativo poderá criar e curtir publicações.

# Conteúdos abordados no projeto

- NodeJS
- Typescript
- Express
- SQL e SQLite
- Knex
- Programação Orientada a Objetos
- Arquitetura em camadas
- Geração de UUID
- Geração de hashes
- Autenticação e autorização
- Roteamento
- Postman

# Endpoints

- [x]  Signup
- [x]  Login
- [x]  Get Posts
- [x]  Create Post
- [x]  Edit Post
- [x]  Delete Post
- [x]  Like or Dislike Post


### :dart: SIGNUP - Endpoint público para fazer um cadastro. Esse endpoint devolve um token jwt.

```
// request POST /users/signup
// body JSON
{
    "name": "Lorenzo Ferreira",
    "email": "lorenzoferreira@email.com",
    "password": "lorenfefe"
}

// response
// status 201 CREATED

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6I"
}
```

### :dart: LOGIN - Endpoint público utilizado para fazer login. Ele também devolve um token jwt.

```
// request POST /users/login
// body JSON
{
    "email": "marisantos@email.com",
    "password": "masantos22"
}

// response
// status 200 OK
{
  "token": "eyJhbGciOiJIXVCJ9.eyJpZCI6ImYyZjhjYWE4LTgzMTMb"
}
```

### :dart: GET POSTS - Esse endpoint é protegido, precisa de um token jwt para acessá-lo.
```
// request GET /posts
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFjZTQ2YmQ1LTQ5Y"

// response
// status 200 OK
[
    {
    "id": "b80ba0c4-53c3-4b6a-91d9-d022a9594cc5",
    "content": "Partiu piscina e churrasco! :D",
    "likes": 1,
    "dislikes": 0,
    "createdAt": "2023-02-17T18:32:36.089Z",
    "updatedAt": "2023-02-17T18:32:36.089Z",
    "creator": {
      "id": "9cca4c22-63f6-4b89-ad67-d07e83fbbc2d",
      "name": "Eloá Silva"
      }
    },
    {
    "id": "b71aa9a0-ba33-44b6-bcdc-6d6b4bec7fe6",
    "content": "Vou pegar uma praia em Copacabana!!!",
    "likes": 1,
    "dislikes": 0,
    "createdAt": "2023-02-17T20:37:26.144Z",
    "updatedAt": "2023-02-17T20:37:26.144Z",
    "creator": {
      "id": "1ce46bd5-49c3-4642-94ba-07c7127cc97a",
      "name": "Lorenzo Ferreira"
      }
    }
]
```

### :dart: CREATE POST - Endpoint protegido, precisa de um token jwt para poder acessá-lo.

```
// request POST /posts
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA3Nzc4Z"
// body JSON
{
    "content": "Hoje é dia de relaxar e ver um filminho!"
}

// response
// status 201 CREATED
```
### :dart: EDIT POST - Endpoint protegido, precisa de um token jwt para acessá-lo. E apenas quem criou o post pode editá-lo e somente o conteúdo pode ser editado.

```
// request PUT /posts/:id
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA3Nzc4ZWQ5LWFiN2ItNDI1NS1hYmU0L"
// body JSON
{
    "content": "Dia de relaxar e ver filmes de terror! :D"
}

// response
// status 200 OK
```

### :dart: DELETE POST - Endpoint protegido, requer um token jwt para acessá-lo. Só quem criou pode deletá-lo. E admins podem deletar o post de qualquer pessoa.
```
// request DELETE /posts/:id
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA3Nzc4ZWQ5LWFiN2ItNDI1NS1hYmU0LTdjMDFkNWQ1"

// response
// status 200 OK
```

### :dart: LIKE OR DISLIKE POST - Endpoint protegido, requer um token jwt para poder acessá-lo. 

Quem criou o post não pode dar like ou dislike no mesmo.

Caso dê um like em um post que já tenha dado like, o like é desfeito.
Caso dê um dislike em um post que já tenha dado dislike, o dislike é desfeito.

Caso dê um like em um post que tenha dado dislike, o like sobrescreve o dislike.
Caso dê um dislike em um post que tenha dado like, o dislike sobrescreve o like.


Primeira funcionalidade - Like
```
// request PUT /posts/:id/like
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYyZjhjYWE4LTgzMTMtNDMzNy04ZD"
// body JSON
{
    "like": true
}

// response
// status 200 OK
```

Segunda funcionalidade - Dislike
```
// request PUT /posts/:id/like
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYyZjhjYWE4LTgzMTMtNDMzNy04ZD"
// body JSON
{
    "like": false
}

// response
// status 200 OK
```
# Dependências

### :large_blue_circle: SCRIPTS
```
"scripts": {
    "start": "node ./build/index.js",
    "build": "tsc",
    "dev": "ts-node-dev ./src/index.ts"
  }
```

### :large_blue_circle: Dependencies
```
"dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "knex": "^2.4.2",
    "sqlite3": "^5.1.4",
    "uuid": "^9.0.0"
  }
```

### :large_blue_circle: devDependecies 
```
"devDependencies": {
    "@types/bcryptjs": "^2.4.2",
    "@types/cors": "^2.8.13",
    "@types/express": "^4.17.16",
    "@types/jsonwebtoken": "^9.0.1",
    "@types/knex": "^0.16.1",
    "@types/node": "^18.11.18",
    "@types/uuid": "^9.0.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^4.9.5"
  }
```

# Rodando o projeto 

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), o [Node.js](https://nodejs.org/en/) e o [Postman](https://www.postman.com). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

```
# Clone este repositório
$ git clone <https://github.com/endioliveira/projeto-labook-backend.git>

# Acesse a pasta do projeto no terminal
$ cd projeto-labook-backend

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor iniciará na porta:3003> 
```

# Tecnologias Utilizadas 

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=express,nodejs,postman,sqlite,ts" />
  </a>
</p>

# Link da Documentação

https://documenter.getpostman.com/view/20168491/2s93CHtZng

# Banco de dados

![Copy of projeto-labook](https://user-images.githubusercontent.com/100172961/219796055-ffeaf0bc-1373-471b-bd23-0a2647d9489b.png)

https://dbdiagram.io/d/63e7f2b3296d97641d803362

