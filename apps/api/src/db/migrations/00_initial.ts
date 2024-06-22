import { FLOAT, QueryInterface, STRING, UUID } from "sequelize";
import { MigrationParams } from "umzug";

export const up = async ({ context }: MigrationParams<QueryInterface>) => {
  const { sequelize } = context;

  await sequelize.transaction(async (transaction) => {
    await context.createSchema("weird_salads", { transaction });
    await context.createTable(
      {
        tableName: "ingredients",
        schema: "weird_salads",
      },
      {
        id: {
          type: UUID,
          primaryKey: true,
        },
        name: {
          type: STRING,
        },
        unit: {
          type: STRING,
        },
        cost: {
          type: FLOAT,
        },
        created_at: {
          type: "TIMESTAMP",
        },
        updated_at: {
          type: "TIMESTAMP",
        },
      },
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
