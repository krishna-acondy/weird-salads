import { gql } from "urql";

export const RecipesQuery = gql`
  query {
    recipes {
      id
      name
      description
      maxAvailable
      price
    }
  }
`;
