<h1 align="center">
  <img
    src=".github/dt-money-logo.svg"
    title="DT Money"
    alt="DT Money"
  />
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/pabloxt14/dt-money-rn">

  <img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/pabloxt14/dt-money-rn" />

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/pabloxt14/dt-money-rn">
  
  <a href="https://github.com/pabloxt14/dt-money-rn/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/pabloxt14/dt-money-rn">
  </a>
    
   <img alt="License" src="https://img.shields.io/badge/license-MIT-blue">

   <a href="https://github.com/pabloxt14/dt-money-rn/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/pabloxt14/dt-money-rn?style=social">
  </a>
</p>

<p>
  <img src=".github/cover.png" alt="Capa do projeto" />
</p>

<p align="center">
 <a href="#-about">About</a> | 
 <a href="#-layout">Layout</a> | 
 <a href="#-setup">Setup</a> | 
 <a href="#-technologies">Technologies</a> | 
 <a href="#-license">License</a>
</p>


## 💻 About

Esta aplicação de nome **DT Money** consiste basicamente em um aplicativo mobile de gerenciamento de finanças pessoais, que permite o cadastro, edição e exclusão de transações, classificação de transações por categorias e tipos de transações (entrada ou saída), além de apresentação de um resumo das transações (entradas, saídas e total).

Os principais conhecimentos aplicados nesta aplicação foram:
- Consumo de `APIs` no React Native;
- Utilização do `Context API` para gerenciamento de estados globais na aplicação;
- Utilização do `NativeWind`(biblioteca de estilização baseada no TailwindCSS) para estilização de componentes;

<!-- ## 🔗 Deploy

O deploy da aplicação pode ser acessada através da seguinte URL base: https://pabloxt14-nlw-expert-notes.vercel.app/ -->


## 🎨 Layout

Você pode visualizar o layout do projeto através [desse link](https://www.figma.com/community/file/1529159456475378262/dt-money-responsivo). É necessário ter conta no [Figma](https://www.figma.com/) para acessá-lo.

A seguir, veja uma demonstração das principais telas da aplicação:

### Sign In

<p align="center">
  <img
    src=".github/screens/sign-in.png"
    alt="Sign In Screen"
    title="Sign In Screen"
  />
</p>

### Sign Up

<p align="center">
  <img
    src=".github/screens/sign-up.png"
    alt="Sign Up Screen"
    title="Sign Up Screen"
  />
</p>

### Home

<p align="center">
  <img
    src=".github/screens/home.png"
    alt="Home Screen"
    title="Home Screen"
  />
</p>

### New Transaction

<p align="center">
  <img
    src=".github/screens/new-transaction.png"
    alt="New Transaction Screen"
    title="New Transaction Screen"
  />
</p>

### Swipeable Delete

<p align="center">
  <img
    src=".github/screens/swipeable-delete.png"
    alt="Swipeable Delete Screen"
    title="Swipeable Delete Screen"
  />
</p>

### Delete Transaction

<p align="center">
  <img
    src=".github/screens/delete-transaction.png"
    alt="Delete Transaction Screen"
    title="Delete Transaction Screen"
  />
</p>

### Swipeable Edit

<p align="center">
  <img
    src=".github/screens/swipeable-edit.png"
    alt="Swipeable Edit Screen"
    title="Swipeable Edit Screen"
  />
</p>

### Edit Transaction

<p align="center">
  <img
    src=".github/screens/edit-transaction.png"
    alt="Edit Transaction Screen"
    title="Edit Transaction Screen"
  />
</p>

### Filter Transactions

<p align="center">
  <img
    src=".github/screens/filter-transactions.png"
    alt="Filter Transactions Screen"
    title="Filter Transactions Screen"
  />
</p>


## ⚙ Setup

### 📝 Requisites

Antes de baixar o projeto você vai precisar ter instalado na sua máquina as seguintes ferramentas:

* [Git](https://git-scm.com)
* [NodeJS](https://nodejs.org/en/)
* [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### Cloning and Running

Passo a passo para clonar e executar a aplicação na sua máquina:

```bash
# Clone este repositório
$ git clone git@github.com:pabloxt14/dt-money-rn.git

# Configure a API back-end
$ cd dt-money-rn/api
$ npm install # Instala as dependências
$ npm run dev # Executa a API back-end

# Acesse a pasta do projeto mobile no terminal
$ cd ../mobile

# Instale as dependências
$ npm install

# Em src/shared/api/dt-money.ts, altere a BASE_URL para a sua API back-end (de acordo com o endereço da sua máquina)
# Exemplo: BASE_URL = "http://192.168.2.123:3001"

# Execute a aplicação em modo de build de desenvolvimento
$ npx expo prebuild # Faz o build da aplicação (necessário para o expo run:android e expo run:ios)
$ npx expo run:android # Para Android
$ npx expo run:ios # Para iOS
```


## 🛠 Technologies

As seguintes principais ferramentas foram usadas na construção do projeto:

- **[React Native](https://reactnative.dev/)**
- **[Expo](https://expo.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Nativewind](https://www.nativewind.dev/)**
- **[Expo Vector Icons](https://docs.expo.dev/guides/icons/)**
- **[Axios](https://axios-http.com/ptbr/docs/intro)**
- **[Bottom Sheet](https://github.com/gorhom/react-native-bottom-sheet)**
- **[Async Storage](https://docs.expo.dev/versions/latest/sdk/async-storage/)**
- **[React Hook Form](https://react-hook-form.com/)**
- **[Zod](https://zod.dev/)**
- **[Date Fns](https://date-fns.org/)**

> Para mais detalhes das dependências gerais da aplicação mobile veja o arquivo [package.json](./mobile/package.json)

> Para mais detalhes das dependências da API back-end veja o arquivo [package.json](./api/package.json)


## 📝 License

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais informações

<p align="center">
  Feito com 💜 por Pablo Alan 👋🏽 <a href="https://www.linkedin.com/in/pabloalan/" target="_blank">Entre em contato!</a>  
</p>