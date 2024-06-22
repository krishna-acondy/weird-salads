import { QueryInterface } from "sequelize";
import { MigrationParams } from "umzug";

export const up = async ({ context }: MigrationParams<QueryInterface>) => {
  const { sequelize } = context;

  await sequelize.transaction(async (transaction) => {
    await sequelize.query('create extension if not exists "uuid-ossp"', {
      transaction,
    });

    await context.createSchema("weird_salads", { transaction });

    await sequelize.query(
      `
      create table weird_salads.ingredients (
        id text default uuid_generate_v4(),
        name text,
        unit text,
        cost float,
        available_quantity float,
        created_at timestamp default (timezone('utc', now())),
        updated_at timestamp default (timezone('utc', now())),
        primary key (id)
      )
    `,
      { transaction }
    );

    await sequelize.query(
      "comment on column weird_salads.ingredients.id is E'@omit create'",
      { transaction }
    );
  });
};

export const down = async ({ context }: MigrationParams<QueryInterface>) => {
  const { sequelize } = context;

  await sequelize.transaction(async (transaction) => {
    await context.dropTable(
      { tableName: "ingredients", schema: "weird_salads" },
      { transaction }
    );
    await context.dropSchema("weird_salads", { transaction });
  });
};
