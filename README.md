# Desafio B2W

[![N|Solid](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaRD4whXvduIJ3F7jl2ZV-wPDYo4fW26vSrSh5t3tOxH-OxfEMtw)](https://nodesource.com/products/nsolid)

# Requisitos:

- A API deve ser REST
- Cada planeta, os seguintes dados devem ser obtidos do banco de dados da aplicação, sendo inserido manualmente:
Nome
Clima
Terreno
- Para cada planeta também devemos ter a quantidade de aparições em filmes, que podem ser obtidas pela API pública do Star Wars: https://swapi.co/

# Funcionalidades desejadas: 

- Adicionar um planeta (com nome, clima e terreno)
- Listar Planetas
- Buscar por nome
- Buscar por ID
- Remover planeta

Linguagem utilizada: NodeJs
Bancos Utilizado: MongoDB
Teste Unitário: Mocha e Supertest
  
### Rodando o sistema

```sh
$ npm install -- Instalar as dependências.
$ npm start -- Rodar o sistema.
$ npm run test -- Executar os testes do sistema.
```
