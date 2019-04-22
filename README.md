# Setup
Please note this isn't a final build ready for distribution. This project is to exemplify and prove basic knowledge of connecting to GraphQL and MongoDB databases through a simple front-end.
## Booting up Prisma Server
```
cd backend_graphql
npm install
npm run dockerStart
npm run deploy
npm run start
```

## Seed Data to Prisma Server
```
npm run load
```
Runs a script that loads data from [KuroganeHammer's Smash Bros 4 API](https://github.com/Frannsoft/FrannHammer/wiki)

## Booting up NodeJS
```
cd backend_nodejs
npm install
npm run start
```
## Booting up Vue Front-end
```
npm install
npm run serve
```