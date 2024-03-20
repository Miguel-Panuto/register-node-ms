# Backend endpoint de registro

Projeto consiste em um endpoint para registro de uma pessoa Fisica ou Juridica.

## Como rodar o projeto

Primeiramente, é necessário instalar as dependências do projeto. Para isso, execute o comando abaixo:

```bash
npm install
```

Após a instalação é necessário fazer o build do projeto e para isso é necessário ter as tipagens do banco de dados, e para isso:

```bash
npx prisma generate
```

Agora é fazer o build do projeto:

```bash
npm run build
```

Mas ainda falta ter como variável de ambiente o banco de dados, para isso crie um arquivo .env na raiz do projeto e adicione a variável DATABASE_URL com a url do banco de dados.

É necessário ter o banco de dados criado, para isso execute o comando abaixo:

```bash
docker-compose up -d
```

Com isso é criado o banco MySQL e o banco de dados wefit.


☢️  Um ponto importante é ter o arquivo .env.dev na raiz do projeto com a seguinte configuração: <br>
```env
MYSQLDB_PASSWORD=senha_root_123
MYSQLDB_PORT=3306
MYSQLDB_DATABASE=wefit
```

```env
DATABASE_URL="mysql://root:senha_root_123@localhost:3306/wefit"
```

E finalmente rodar o projeto:

```bash
npm start
```

## Roda em ambiente de desenvolvimento

Para rodar o projeto em ambiente de desenvolvimento, execute o comando abaixo:

```bash
npm run dev
```

Obs: é necessário ter preparado o banco com todo o ponto do prisma migrate.

## Como rodar os testes

Para rodar os testes, execute o comando abaixo:

```bash
npm run test
```

## Endpoints

### POST /api/register

Esse endpoint é responsável por registrar uma pessoa Fisica ou Juridica.
Header: Content-Type: application/json
Body:
```json
{
    "name": "Miguel",
    "type": "legal or natural",
    "cpf": "123.321.123-21",
    "cnpj": "XXXXXXXX0001XX",
    "address": {
        "street": "Rua Principal",
        "number": "11a",
        "city": "Campinas",
        "state": "SP",
        "neighborhood": "Jd Das Pedras",
        "zipCode": "081532238"
    },
    "contact": {
        "cellphone": "11999999999",
        "telephone": "11999999999",
        "email": "email@email.com",
        "confirmEmail": "email@email.com"
    }
}
```

Obs: CPF e CNPJ aceita com caracteres especiais e sem caracteres especiais. Ex: 123.321.123-21 ou 12332112321.

### GET /docs

Esse endpoint é responsável por mostrar a documentação da API com Swagger.

## Tecnologias utilizadas

- Node.js
    - Inversify
    - TypeScript
    - Prisma
    - Chai
    - Mocha
    - Express
    - Joi
    - Winston
- Docker
    - MySQL
- Swagger

