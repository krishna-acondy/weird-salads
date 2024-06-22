import { QueryInterface, Sequelize } from "sequelize";
import { SequelizeOptions } from "sequelize-typescript";
import { LogFn, SequelizeStorage, Umzug } from "umzug";

interface MigratorOptions extends SequelizeOptions {
  logger?: Record<"info" | "warn" | "error" | "debug", LogFn> | undefined;
}

export class Migrator {
  private umzug: Umzug<QueryInterface>;
  private sequelize: Sequelize;

  constructor(options: MigratorOptions = {}) {
    const { DATABASE, PG_USER, PASSWORD, HOST, PG_PORT } = process.env;
    this.sequelize = new Sequelize({
      dialect: "postgres",
      schema: "weird_salads",
      database: DATABASE,
      logging: true,
      host: HOST,
      port: parseInt(PG_PORT || "5432"),
      username: PG_USER,
      password: PASSWORD,
      ...options,
    });

    this.umzug = new Umzug({
      migrations: {
        glob: ["migrations/*.{js,ts}", { cwd: __dirname }],
      },
      context: this.sequelize.getQueryInterface(),
      storage: new SequelizeStorage({
        sequelize: this.sequelize,
        schema: "public",
      }),
      logger: options.logger,
    });
  }

  public async up() {
    await this.umzug.up();
  }

  public async down() {
    await this.umzug.down();
  }
}
