import { useMutation } from "urql";
import { CreateOrderRecipesMutation } from "../graphql";
import { OrderRecipe } from "../../../types";

type CreateOrderRecipesInput = {
  orderId: number;
  recipeId: number;
  quantity: number;
};

interface CreateOrderRecipesVariables {
  input: {
    clientMutationId?: string;
    mnOrderRecipe: CreateOrderRecipesInput[];
  };
}

export function useCreateOrderRecipes() {
  return useMutation<OrderRecipe[], CreateOrderRecipesVariables>(
    CreateOrderRecipesMutation
  );
}
