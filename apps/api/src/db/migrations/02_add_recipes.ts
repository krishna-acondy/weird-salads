import { QueryInterface } from "sequelize";
import { MigrationParams } from "umzug";

export const up = async ({ context }: MigrationParams<QueryInterface>) => {
  const { sequelize } = context;

  await sequelize.transaction(async (transaction) => {
    await sequelize.query(
      `
      create table weird_salads.recipes (
        id serial,
        name text,
        description text,
        price float,
        created_at timestamp default (timezone('utc', now())),
        updated_at timestamp default (timezone('utc', now())),
        primary key (id)
      )
    `,
      { transaction }
    );

    await sequelize.query(
      "comment on column weird_salads.recipes.id is E'@omit create'",
      { transaction }
    );

    await sequelize.query(
      `
      create table weird_salads.recipe_ingredients (
        recipe_id integer references weird_salads.recipes(id),
        ingredient_id integer references weird_salads.ingredients(id),
        quantity float,
        primary key (recipe_id, ingredient_id)
      )
    `,
      { transaction }
    );

    await sequelize.query(
      `create or replace function weird_salads.recipes_max_available(recipe weird_salads.recipes)
        returns int as $$
          declare
            max_orders int;
          begin
            select min(i.available_quantity / ri.quantity) into max_orders
            from weird_salads.recipe_ingredients ri
            join weird_salads.ingredients i on ri.ingredient_id = i.id
            where ri.recipe_id = recipe_id;

            if max_orders is null then
                return 0;
            else
                return max_orders;
            end if;
          end;
        $$ language plpgsql stable;
    `,
      { transaction }
    );
  });
};

export const down = async ({ context }: MigrationParams<QueryInterface>) => {
  const { sequelize } = context;

  await sequelize.transaction(async (transaction) => {
    await context.dropTable(
      { tableName: "recipes", schema: "weird_salads" },
      { transaction }
    );

    await context.dropTable(
      { tableName: "recipe_ingredients", schema: "weird_salads" },
      { transaction }
    );

    await sequelize.query(
      "drop function weird_salads.recipes_max_available(recipe weird_salads.recipes)",
      { transaction }
    );
  });
};
