import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

interface RecipeIngredientAttributes {
  recipeId: number;
  ingredientId: number;
  quantity: number;
}

export type RecipeIngredientInput = RecipeIngredientAttributes;

@Table({
  schema: "weird_salads",
  tableName: "recipe_ingredients",
  timestamps: false,
  underscored: true,
})
export class RecipeIngredient extends Model<
  RecipeIngredientAttributes,
  RecipeIngredientInput
> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare recipeId: number;

  @PrimaryKey
  @Column(DataType.INTEGER)
  declare ingredientId: number;

  @Column(DataType.FLOAT)
  declare quantity: number;
}
