import { useQuery } from "urql";
import { Connection, ConnectionVariables, Ingredient } from "../../../types";
import { IngredientsQuery } from "../graphql";

export type IngredientsQueryResult = {
  allIngredients: Connection<Ingredient>;
};

export function useIngredients(
  variables: ConnectionVariables<Ingredient> = {}
) {
  return useQuery<IngredientsQueryResult>({
    query: IngredientsQuery,
    variables,
  });
}
