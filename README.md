# Weird Salads
![CI](https://github.com/krishna-acondy/weird-salads/actions/workflows/ci.yml/badge.svg)


Monorepo containing source code for Weird Salads inventory app and API

## Tech

### Tooling

- [Turbo](https://turbo.build/)
- Docker
- TypeScript
- Prettier/ESLint

### Web app

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- nginx

### API

- [Express](https://expressjs.com/)
- [Postgraphile](https://www.graphile.org/postgraphile/)
- [Sequelize](https://sequelize.org/)/[Umzug](https://github.com/sequelize/umzug)

### Database

- PostgreSQL

## On-location deployment

![Deployment](./doc/deployment.png)

## Local development

Start by running `yarn` to install dependencies in all workspace projects.

### Web app

Run `yarn dev` to start the web app. The app will be available at http://localhost:5173.

### Database

Create a `.env` file based on the `.env.sample` file with your desired postgres configuration.
Run `docker-compose -f docker-compose.dev.yml up -d` to start the database.

### API

Create a `.env` file based on the `.env.sample` file with your desired postgres configuration.
Run `yarn dev` after starting the database to run migrations and start up the API on port 3001.
You can use a GraphQL client like [Altair](https://chromewebstore.google.com/detail/altair-graphql-client/flnheeellpciglgpaodhkhmapeljopja?pli=1) to browse the schema and try out queries and mutations.

## Loading data from spreadsheets

The data loading mechanism takes CSVs and loads them into the on-premise database.
It expects 3 CSVs - `ingredients`, `recipe_ingredients` and `menu` which correspond to the sheets in the spreadsheet.
The `apps/api/src/data-loader` folder contains the code and data.
The migration mechanism can be run for a given location ID and loads all the data for that location.
You can use `tsx` to run it from the `apps/api` folder like so:

```
    npx tsx@latest ./src/data-loader/loader.ts
```

## Feature overview
I've prioritised features that will help the restaurant to start using the new system ASAP.
There's enough to enable day-to-day functioning with better tracking compared to a spreadsheet.
We can eventually build out more reporting and analytics as we go along.

Creating ingredients hasn't been implement in the app due to time constraints - it is however possible to import ingredients from a CSV file.

**Feature**|**App**|**API**
:-----:|:-----:|:-----:
Create deliveries|✅|✅
Accept ingredients in delivery|✅|✅
Create ingredients|❌|✅
Automatically update stock|✅|✅
View all deliveries and costs|✅|✅
Sell items|✅|✅
View available stock on menu|✅|✅
Stock taking/waste recording|❌|✅
Reporting|❌|🟡
Data migration|❌|✅

## To do
### Hygiene
- [ ] i18n
- [ ] Better responsiveness for smaller screens
- [ ] Unit tests
- [ ] One script to start up the dev environment
### Features
- [ ] Create ingredients
- [ ] Charts for orders and stock over time
