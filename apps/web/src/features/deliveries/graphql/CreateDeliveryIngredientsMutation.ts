import { gql } from "urql";

export const CreateDeliveryIngredientsMutation = gql`
  mutation ($input: mnCreateDeliveryIngredientInput!) {
    mnCreateDeliveryIngredient(input: $input) {
      deliveryIngredient {
        deliveryId
        ingredientId
        quantity
      }
    }
  }
`;
