# Weird Salads
Monorepo containing source code for Weird Salads inventory app and API

## Tech
### Tooling
* [Turbo](https://turbo.build/)
* Docker
* TypeScript
* Prettier/ESLint

### Web app
* [Vite](https://vitejs.dev/)
* [React](https://react.dev/)
* nginx

### API
* [Express](https://expressjs.com/)
* [Postgraphile](https://www.graphile.org/postgraphile/)
* [Sequelize](https://sequelize.org/)/[Umzug](https://github.com/sequelize/umzug)

### Database
* PostgreSQL

## On-location deployment
![Deployment](./doc/deployment.png)

## Local development
Start by running `yarn` to install dependencies in all workspace projects.

## Web app
Run `yarn dev` to start the web app.

## Database
Create a `.env` file based on the `.env.sample` file with your desired postgres configuration.
Run `docker-compose -f docker-compose.dev.yml up -d` to start the database.

