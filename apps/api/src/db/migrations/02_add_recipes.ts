import { QueryInterface } from "sequelize";
import { MigrationParams } from "umzug";

export const up = async ({ context }: MigrationParams<QueryInterface>) => {
  const { sequelize } = context;

  await sequelize.transaction(async (transaction) => {
    await sequelize.query(
      `
      create table weird_salads.recipes (
        id text default uuid_generate_v4(),
        name text,
        description text,
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
        recipe_id text references weird_salads.recipes(id),
        ingredient_id text references weird_salads.ingredients(id),
        quantity float,
        primary key (recipe_id, ingredient_id)
      )
    `,
      { transaction }
    );

    await sequelize.query(
      `create or replace function weird_salads.recipes_is_available(recipe weird_salads.recipes) returns boolean as $$
        declare
          missing_ingredient_count integer;
          ingredient_count integer;
        begin
          select count(i.id)
          into ingredient_count
          from weird_salads.ingredients i join weird_salads.recipe_ingredients ri
          on i.id = ri.ingredient_id
          where ri.recipe_id = recipe.id;

          select count(i.id)
          into missing_ingredient_count
          from weird_salads.ingredients i left join weird_salads.recipe_ingredients ri
          on i.id = ri.ingredient_id
          where ri.recipe_id = recipe.id and i.available_quantity < ri.quantity;

          return missing_ingredient_count = 0 and ingredient_count > 0;
        end
      $$ language 'plpgsql' STABLE;
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
      "drop function weird_salads.recipes_is_available(recipe weird_salads.recipes)",
      { transaction }
    );
  });
};
