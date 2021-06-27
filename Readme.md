<h1 align="center">
  <img alt="letmeask" title="letmeask" src=".github/logo.png" width="300px" />


</h1>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-novidades">Novidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-executar">Como executar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licença">Licença</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://letmeask-eta.vercel.app">Visite o Site</a>
</p>

<hr><br>
<p align="center">
<img src="https://img.shields.io/static/v1?label=NLW&message=05&color=8257E5&labelColor=000000" alt="NLW 2021" />

  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=8257E5&labelColor=000000">

</br>

<br><br>

<p align="center">
  <img alt="home" src=".github/home.png" width="70%">
</p>

<p align="center">
  <img alt="admin" src=".github/admin.png" width="70%">
</p>

<p align="center">

  <img alt="mobile" src=".github/mobile.png" width="50%">
</p>

## ✨ Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [React](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase](https://firebase.google.com/)
- [Sass](https://sass-lang.com/)

## 💻 Projeto

O letmeask permite você criar salas de perguntas para tirar as dúvidas da sua audiência. Os usuários podem votar nas perguntas mais interessantes e você como admin pode destacar, excluir e responder as dúvidas mais votadas em lives ou vídeos, por exemplo.

Use agora mesmo:

1. acesse o site https://letmeask-eta.vercel.app
2. faça o login e crie uma sala com o assunto desejado
3. compartilhe o link para seus público e aguarde as perguntas e responda em vídeos ou lives as mais votadas

Se preferir acesse uma sala já criada: https://letmeask-eta.vercel.app/rooms/-Md8slKExuwO6v7rVbWQ

## 📝 Novidades

    Procurei manter o projeto original mas deixá-lo o mais funcional possível. Segue as novidades que implementei em relação ao projeto original.

  - LAYOUT
    - Adicionei Responsividade que era primordial e que aprendi no vídeo do Maikão
    - Testei em chrome e opera e todos os dispositivos em qualquer tamanho
    - Adicionei styles na pasta respectivo componente (facilitar manutenção)
    - Adicionei Componente Loading
    - Adicionei Favicon
    - Adicionei Page NotFound404 customizada Rocketseat
    - Adaptei para TSX e SCSS
    - Adicionei MetaTags na index para exibir logo e breve descrição no compartilhamento
    - Alterei Cor do Layout e utilizei Variavel de cores (Primary e Secundary, Link)

  - PWA
    - Adicionei Manifest
    - Adicionei Logos varios tamanhos
    - Adicionei ServiceWork para opção de Instalar APP

  - ROOMS
    - Compartilhei o componente ROOMS com ADMIN (aproveitamento de código)
    - Rota ROOMS mesma rota Admin/ROOMS (sem necessidade de redirecionamento)
    - Adicionei quando Admin Encerra a sala - usuários são redirecionados automaticamente
    - Adicionei nome e avatar do author da sala
    - Adicionei instruções para compartilhar o link da sala
    - Adicionei opção de compartilhar (no win10 e celular abre compartilhamento padrão)
    - Adicionei opção de usuário fazer login direto na sala (pra quem acessa via link)
    - Adicionei like 👍 para Admin, porque não? =)
    - Usuários podem acessar por código da sala ou inserindo o link no campo ou apenas acessando o link do admin que é o mesmo

  - QUESTIONS
    - Isolei mais ainda o componente QUESTIONS de ROOMS
    - Altura máxima definida para cada question (pra evitar spammers)
    - Scrool customizado quando ultrapassa altura máxima da question
    - Icones de Opções ampliam e mudam de cor com mouse
    - Limite de 1000 caracteres com contador para novas questões (pra evitar spammers) e receber perguntas mais objetivas

  - OUTROS
    - Adicionei editorconfig
    - Adicionei Prettierrc
    - Adicionei componente ASIDE para Home e NewRoom
    - Adicionei na Hospedagem Vercel

## 🔖 Layout

Você pode visualizar o layout do projeto através [desse link](https://www.figma.com/file/u0BQK8rCf2KgzcukdRRCWh/Letmeask/duplicate) É necessário ter conta no [Figma](http://figma.com/) para acessá-lo.


## 🚀 Como executar

- Instale o Node.js
- Instale o Yarn
- Clone o repositório `git`
- Instale as dependências com `yarn`
- Crie um projeto no `Firebase`
- Adicione as credenciais do seu firebase em `.env.example`
- Altere `.env.example` para `.env.local`
- Ative o firebase authentication com a autenticação do google
- Inicie o servidor com `yarn start` no terminal

Agora você pode acessar [`localhost:3000`](http://localhost:3000) do seu navegador.

## 📄 Licença

Esse projeto está sob a licença MITVeja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Feito com ♥ by DevMaicon 👋🏻 [Projeto da semana NLW da Rocketseat](https://nextlevelweek.com/)
