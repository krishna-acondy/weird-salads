import { gql } from "urql";

export const CreateOrderRecipesMutation = gql`
  mutation ($input: mnCreateOrderRecipeInput!) {
    mnCreateOrderRecipe(input: $input) {
      orderRecipe {
        recipeId
        orderId
        quantity
      }
    }
  }
`;
