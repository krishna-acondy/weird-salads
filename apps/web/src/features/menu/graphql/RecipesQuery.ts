import { gql } from "urql";

export const RecipesQuery = gql`
  query (
    $first: Int
    $last: Int
    $offset: Int
    $after: Cursor
    $before: Cursor
    $orderBy: [RecipesOrderBy!]
    $filter: RecipeFilter
  ) {
    allRecipes(
      first: $first
      last: $last
      offset: $offset
      after: $after
      before: $before
      orderBy: $orderBy
      filter: $filter
    ) {
      nodes {
        id
        name
        description
        maxAvailable
        price
      }
    }
  }
`;
