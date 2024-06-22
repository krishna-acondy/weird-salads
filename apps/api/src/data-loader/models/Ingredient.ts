import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Optional } from "sequelize";

export interface IngredientAttributes {
  id: number;
  name: string;
  unit: string;
  cost: number;
}

export type IngredientInput = Optional<IngredientAttributes, "id">;

@Table({
  schema: "weird_salads",
  tableName: "ingredients",
  timestamps: false,
  underscored: true,
})
export class Ingredient extends Model<IngredientAttributes, IngredientInput> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.STRING)
  declare name: string;

  @Column(DataType.STRING)
  declare unit: string;

  @Column(DataType.FLOAT)
  declare cost: number;
}
