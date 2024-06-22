import { QueryInterface } from "sequelize";
import { MigrationParams } from "umzug";

export const up = async ({ context }: MigrationParams<QueryInterface>) => {
  const { sequelize } = context;

  await sequelize.transaction(async (transaction) => {
    await sequelize.query(
      `
      create table weird_salads.deliveries (
        id text default uuid_generate_v4(),
        created_at timestamp default (timezone('utc', now())),
        updated_at timestamp default (timezone('utc', now())),
        primary key (id)
      )
    `,
      { transaction }
    );

    await sequelize.query(
      "comment on column weird_salads.deliveries.id is E'@omit create'",
      { transaction }
    );

    await sequelize.query(
      `
      create table weird_salads.delivery_ingredients (
        delivery_id text references weird_salads.deliveries(id),
        ingredient_id text references weird_salads.ingredients(id),
        quantity float,
        primary key (delivery_id, ingredient_id)
      )
    `,
      { transaction }
    );

    await sequelize.query(
      `
      create or replace function weird_salads_ingredients_accept_delivery() returns trigger as
        $$
          begin
            update weird_salads.ingredients set available_quantity = coalesce(available_quantity, 0) + new.quantity
            where id = new.ingredient_id;
            return new;
          end;
        $$ language plpgsql;
    `,
      { transaction }
    );

    await sequelize.query(
      `
      create trigger weird_salads_accept_delivery_trigger
        after insert on weird_salads.delivery_ingredients
        for each row
        execute procedure weird_salads_ingredients_accept_delivery();
    `,
      { transaction }
    );
  });
};

export const down = async ({ context }: MigrationParams<QueryInterface>) => {
  const { sequelize } = context;

  await sequelize.transaction(async (transaction) => {
    await context.dropTable(
      { tableName: "deliveries", schema: "weird_salads" },
      { transaction }
    );

    await context.dropTable(
      { tableName: "delivery_ingredients", schema: "weird_salads" },
      { transaction }
    );
  });
};
