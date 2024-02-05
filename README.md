<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
# intsall ni
$ npm install ni -g

# run ni to install dependencies
$ ni
```

## Running the app in docker

```bash
# start the app
$ nr docker:up

# prisma migrate
$ docker exec -it app npx prisma migrate dev
```

## License

Nest is [MIT licensed](LICENSE).
