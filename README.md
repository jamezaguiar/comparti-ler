<div align="center" style="margin-bottom: 20px;">
<img alt="compartiler" src="https://raw.githubusercontent.com/jamezaguiar/web-compartiler/master/src/assets/compartiler.png" width="auto" heigth="auto"/>
</div>

<div align="center" style="margin: 20px;">

[![The MIT License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](https://github.com/jamezaguiar/comparti-ler/blob/master/LICENSE)
![GitHub last commit](https://img.shields.io/github/last-commit/jamezaguiar/comparti-ler?color=green&style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/jamezaguiar/comparti-ler?style=flat-square)

<p align="center" >
  <a href="#book-o-projeto"> :book: O projeto</a> |
  <a href="#rocket-tecnologias-usadas"> :rocket: Tecnologias Usadas</a> |
  <a href="#thinking-como-contribuir"> :thinking: Como Contribuir?</a> |
  <a href="#zap-executando-o-projeto"> :zap: Executando o Projeto </a>
</p>

</div>

## :book: O projeto

API REST da aplicação [Compartiler](https://github.com/jamezaguiar/web-compartiler).

Aplicação que visa conectar pessoas que querem emprestar e/ou pegar livros emprestados.

### :rocket: Tecnologias Usadas

O projeto foi feito com as seguintes tecnologias:

- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/pt-br/)
- [JWT](https://jwt.io/)
  {...}

## :thinking: Como Contribuir?

**Faça um fork deste repositório**

```bash
# Clone o seu fork
$ git clone url-do-seu-fork && cd api-compartiler

# Crie uma branch com sua feature ou correção de bugs
$ git checkout -b minha-branch

# Faça o commit das suas alterações
$ git commit -m 'feature/bugfix: minhas alterações'

# Faça o push para a sua branch
$ git push origin minha-branch
```

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

## :zap: Executando o Projeto

#### Clonando o projeto

```sh
$ git clone https://github.com/jamezaguiar/api-compartiler.git
$ cd api-compartiler
```

#### Iniciando servidor

```sh
$ cd api-compartiler

# Criando a imagem Docker do banco de dados:
# Dentro do projeto, existe um arquivo docker-compose.yml que possui o
# PostgreSQL como banco de dados, basta ter o Docker instalado em sua máquina.
$ docker-compose up -d # Iniciará em background e não irá bloquear o shell

# Rodando as migrations para o banco de dados e iniciando o projeto
$ yarn && yarn typeorm migration:run && yarn dev:server
```

### :memo: Licença

Este projeto é desenvolvido sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para saber mais detalhes.

<p align="center" style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">Feito com :purple_heart: by <strong> Jamerson Aguiar</strong> </p>
