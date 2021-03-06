<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Para essa API eu decidi criar uma integra????o baseada em Schedule e Events. Utilizei rotinas para criar e buscar os *deals* na API do *Pipedrive*. A cada 10 segundos o m??todo `scheduledCreateDeal`, que est?? dentro do `CreateDealUseCase` ?? disparado pela rotina do Nest e faz uma requisi????o para inserir um novo *deal*. Todos os dias ??s 17h, o m??todo `emitEventToCreateOrderDeals` que est?? dentro de `ListWonDealsUseCase`, ser?? disparado para buscar todos os *deals* no *Pipedrive*, ap??s receber a resposta, ele ir?? emitir um evento que ser?? escutado pelo m??todo `execute` que est?? dentro de `CreateOrderUseCase`. Esse evento tem como fun????o informar ao m??todo que o escuta, que ?? o momento de criar os *pedido* na API do *Bling*. Se a requisi????o de inser????o no *Bling* for realizada com sucesso, os pedidos ser??o armazenados no banco de dados, onde ser?? validado se j?? existe um registro para o dia, caso sim, o valor total ser?? atualizado e caso negativo, ser?? criado um novo.

Para realizar testes nessa API, recomendo alterar a `CronExpression` do m??todo `emitEventToCreateOrderDeals` para `EVERY_10_SECONDS`, dessa forma poder??o validar de maneira mais r??pida o fluxo.

Deixei alguns endpoints para cria????o e listagem manual de *deals* no *Pipedrive*, caso desejem validar algo.

Os testes criados, foram apenas unit??rios, para os providers compartilhados e para a rota principal.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# watch mode - dev
$ npm run start:dev
```

## Test

```bash
# unit tests
$ yarn test
```

## License

Nest is [MIT licensed](LICENSE).
