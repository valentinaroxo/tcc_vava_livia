# IFEsporte

Aplicação IFEsporte para gerenciamento de modalidades, alunos, cronogramas e análises esportivas.

---

Este projeto é uma adaptação do tutorial original para um sistema de coordenação esportiva, com foco em professores e treinadores do Instituto Federal Catarinense.

![Diagrama de entidades do sistema IFEsporte](https://raw.githubusercontent.com/mdn/express-locallibrary-tutorial/main/public/images/Library%20Website%20-%20Mongoose_Express.png)

> **Nota**: o sistema foi convertido a partir do tutorial MDN de catálogo local, mas agora exibe telas e termos em português para uso esportivo.

## Quick Start

To get this project up and running locally on your computer:

1. Set up a [Node.js](https://wiki.developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment) development environment.
2. Once you have node setup install the project in the root of your clone of this repo:

   ```bash
   npm install
   ```

3. Run the tutorial server, using the appropriate command line shell for your environment:

   ```bash
   # Linux terminal
   DEBUG=ifesporte:* npm run devstart

   # Windows Powershell
   $ENV:DEBUG = "ifesporte:*"; npm start
   ```

4. Open a browser to <http://localhost:3000/> to open the library site.

> [!NOTE]
> The library uses a default MongoDB database hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
> You should use a different database for your own code experiments.

## Contributing

The project is the result of carefully running through all the steps in the [tutorial on MDN](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Tutorial_local_library_website).
Any changes to either MDN or this project must be synchronized.
Generally it is better to implement changes here before submitting them to MDN.

Before submitting a PR, make sure that the tests pass:

```bash
npm test
```
