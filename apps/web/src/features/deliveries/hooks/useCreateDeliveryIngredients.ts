import { useMutation } from "urql";
import { CreateDeliveryIngredientsMutation } from "../graphql";
import { DeliveryIngredient } from "../../../types";

type CreateDeliveryIngredientsInput = {
  deliveryId: number;
  ingredientId: number;
  quantity: number;
};

interface CreateDeliveryIngredientsVariables {
  input: {
    clientMutationId?: string;
    mnDeliveryIngredient: CreateDeliveryIngredientsInput[];
  };
}

export function useCreateDeliveryIngredients() {
  return useMutation<DeliveryIngredient[], CreateDeliveryIngredientsVariables>(
    CreateDeliveryIngredientsMutation
  );
}
