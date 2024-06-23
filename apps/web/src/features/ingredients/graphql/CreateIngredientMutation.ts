import { gql } from "urql";

export const CreateIngredientMutation = gql`
  mutation ($input: CreateIngredientInput!) {
    createIngredient(input: $input) {
      ingredient {
        nodeId
        id
        name
        unit
        cost
        availableQuantity
        createdAt
        updatedAt
      }
    }
  }
`;
