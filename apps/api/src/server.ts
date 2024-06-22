import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import postgraphile from "./postgraphile";

export const createServer = (): Express => {
  dotenv.config();
  const { DATABASE, PG_USER, PASSWORD, HOST, PG_PORT } = process.env;

  const app = express();
  app
    .disable("x-powered-by")
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use(
      postgraphile({
        database: DATABASE!,
        user: PG_USER!,
        password: PASSWORD!,
        host: HOST!,
        port: parseInt(PG_PORT || "5432"),
      })
    );

  return app;
};
