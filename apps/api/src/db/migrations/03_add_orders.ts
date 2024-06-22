import { QueryInterface } from "sequelize";
import { MigrationParams } from "umzug";

export const up = async ({ context }: MigrationParams<QueryInterface>) => {
  const { sequelize } = context;

  await sequelize.transaction(async (transaction) => {
    await sequelize.query(
      `
      create table weird_salads.orders (
        id text default uuid_generate_v4(),
        created_at timestamp default (timezone('utc', now())),
        updated_at timestamp default (timezone('utc', now())),
        primary key (id)
      )
    `,
      { transaction }
    );

    await sequelize.query(
      "comment on column weird_salads.orders.id is E'@omit create'",
      { transaction }
    );

    await sequelize.query(
      `
      create table weird_salads.order_recipes (
        order_id text references weird_salads.orders(id),
        recipe_id text references weird_salads.recipes(id),
        primary key (order_id, recipe_id)
      )
    `,
      { transaction }
    );

    // Allow adding multiple recipes to an order at once
    await sequelize.query(
      "comment on table weird_salads.order_recipes is E'@mncud'",
      {
        transaction,
      }
    );

    await sequelize.query(
      `
    create or replace function weird_salads_recipes_accept_order()
    returns trigger as $$
    declare
    ingredient record;
    begin
        for ingredient in
            select ri.ingredient_id, ri.quantity
            from weird_salads.recipe_ingredients ri
            where ri.recipe_id = new.recipe_id
        loop
            update weird_salads.ingredients
            set available_quantity = available_quantity - ingredient.quantity
            where id = ingredient.ingredient_id;
        end loop;

        return new;
    end;
    $$ language plpgsql;
    `,
      { transaction }
    );

    await sequelize.query(
      `
      create trigger weird_salads_accept_order_trigger
        after insert on weird_salads.order_recipes
        for each row
        execute procedure weird_salads_recipes_accept_order();
      `,
      { transaction }
    );
  });
};

export const down = async ({ context }: MigrationParams<QueryInterface>) => {
  const { sequelize } = context;

  await sequelize.transaction(async (transaction) => {
    await context.dropTable(
      { tableName: "orders", schema: "weird_salads" },
      { transaction }
    );

    await context.dropTable(
      { tableName: "order_recipes", schema: "weird_salads" },
      { transaction }
    );

    await context.dropTrigger(
      "weird_salads.order_recipes",
      "weird_salads_accept_order_trigger",
      { transaction }
    );

    await context.dropFunction("weird_salads_recipes_accept_order", [], {
      transaction,
    });
  });
};
