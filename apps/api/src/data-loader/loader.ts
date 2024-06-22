import "reflect-metadata";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import { Sequelize } from "sequelize-typescript";
import { groupBy } from "lodash";
import { Ingredient, Recipe, RecipeIngredient } from "./models";

async function init() {
  dotenv.config();
  const sequelize = new Sequelize({
    dialect: "postgres",
    database: "weird_salads",
    username: process.env.PG_USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: parseInt(process.env.PG_PORT || "5432"),
    schema: "weird_salads",
    models: [Ingredient, Recipe, RecipeIngredient],
  });
  await sequelize.sync({ alter: false });
}

async function loadIngredients() {
  await init();
  const ingredientData = await fs.readFile(
    path.resolve(__dirname, "data", "ingredients.csv"),
    "utf-8"
  );
  const ingredients = ingredientData
    .split("\n")
    .slice(1)
    .map((line) => {
      const [id, name, unit, cost] = line.split(",");
      return {
        id: parseInt(id),
        name,
        unit,
        cost: parseFloat(cost),
      };
    });

  await Ingredient.bulkCreate(ingredients, {
    updateOnDuplicate: ["id", "name", "unit", "cost"],
  });
}

async function loadRecipes(locationId: number) {
  const recipeIngredientData = await fs.readFile(
    path.resolve(__dirname, "data", "recipe_ingredients.csv"),
    "utf-8"
  );
  const recipeIngredients = recipeIngredientData
    .split("\n")
    .slice(1)
    .map((line) => {
      const [recipeId, name, quantity, ingredientId] = line.split(",");
      return {
        recipeId: parseInt(recipeId),
        name,
        quantity: parseFloat(quantity),
        ingredientId: parseInt(ingredientId),
      };
    });

  const menuData = await fs.readFile(
    path.resolve(__dirname, "data", "menu.csv"),
    "utf-8"
  );

  const recipeIngredientsByRecipeId = groupBy(recipeIngredients, "recipeId");
  const recipes = menuData
    .split("\n")
    .slice(1)
    .map((line) => {
      const [recipeId, locationId, price] = line.split(",");
      const ingredients = recipeIngredientsByRecipeId[parseInt(recipeId)];
      const name = ingredients.length ? ingredients[0].name : "";
      return {
        id: parseInt(recipeId),
        price: parseFloat(price),
        locationId: parseInt(locationId),
        name,
      };
    })
    .filter((recipe) => recipe.locationId === locationId);

  await Recipe.bulkCreate(recipes, {
    updateOnDuplicate: ["id", "price", "name"],
  });

  const mappedRecipeIngredients = recipeIngredients
    .map((recipeIngredient) => {
      return {
        recipeId: recipeIngredient.recipeId,
        ingredientId: recipeIngredient.ingredientId,
        quantity: recipeIngredient.quantity,
      };
    })
    .filter((recipeIngredient) =>
      recipes.some((recipe) => recipe.id === recipeIngredient.recipeId)
    );

  await RecipeIngredient.bulkCreate(mappedRecipeIngredients, {
    updateOnDuplicate: ["recipeId", "ingredientId", "quantity"],
  });
}

const locationId = 13;
async function loadData() {
  await init();
  await loadIngredients();
  await loadRecipes(locationId);
}

loadData();
