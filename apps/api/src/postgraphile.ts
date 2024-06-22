import { postgraphile } from "postgraphile";
import PostGraphileConnectionFilterPlugin from "postgraphile-plugin-connection-filter";
import PostGraphileBulkCreatePlugin from "postgraphile-plugin-many-create-update-delete";

type ConnectionInfo = {
  database: string;
  user: string;
  password: string;
  host: string;
  port: number;
};

export default (connectionInfo: ConnectionInfo) =>
  postgraphile(
    {
      ...connectionInfo,
    },
    "weird_salads",
    {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
      appendPlugins: [
        PostGraphileConnectionFilterPlugin,
        PostGraphileBulkCreatePlugin,
      ],
    }
  );
