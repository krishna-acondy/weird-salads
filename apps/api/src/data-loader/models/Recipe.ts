import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Optional } from "sequelize";

interface RecipeAttributes {
  id: number;
  name: string;
  price: number;
}

export type RecipeInput = Optional<RecipeAttributes, "id">;

@Table({
  schema: "weird_salads",
  tableName: "recipes",
  timestamps: false,
  underscored: true,
})
export class Recipe extends Model<RecipeAttributes, RecipeInput> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.STRING)
  declare name: string;

  @Column(DataType.STRING)
  declare description?: string;

  @Column(DataType.FLOAT)
  declare price: number;
}
