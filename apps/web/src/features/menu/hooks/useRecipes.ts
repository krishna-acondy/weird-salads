import { useQuery } from "urql";
import { Connection, ConnectionVariables, Recipe } from "../../../types";
import { RecipesQuery } from "../graphql";

export type RecipesQueryResult = {
  allRecipes: Connection<Recipe>;
};

export function useRecipes(variables: ConnectionVariables<Recipe> = {}) {
  return useQuery<RecipesQueryResult>({
    query: RecipesQuery,
    variables,
  });
}
