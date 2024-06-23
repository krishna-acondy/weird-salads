# Weird Salads GraphQL API

The Weird Salads graphQL API enables various actions for restaurant management.

The API uses the following technologies:

- `express` as a server
- `postgraphile` for automatic GraphQL schema generation
- `sequelize` as an ORM
- `umzug` for database migrations

# Local development

Create a `.env` file based on the `.env.sample` file with your desired postgres configuration.

Run `yarn dev` after starting the database to run migrations and start up the API on port 3001.
You can use a GraphQL client like [Altair](https://chromewebstore.google.com/detail/altair-graphql-client/flnheeellpciglgpaodhkhmapeljopja?pli=1) to browse the schema and try out queries and mutations.
