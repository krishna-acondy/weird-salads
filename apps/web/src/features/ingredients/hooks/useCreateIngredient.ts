import { useMutation } from "urql";
import { CreateIngredientMutation } from "../graphql";
import { Ingredient } from "../../../types";

type CreateIngredientInput = {
  name: string;
  unit: string;
  cost: number;
};

interface CreateIngredientVariables {
  input: {
    clientMutationId?: string;
    ingredient: CreateIngredientInput;
  };
}

export function useCreateDashboard() {
  return useMutation<Ingredient, CreateIngredientVariables>(
    CreateIngredientMutation
  );
}
