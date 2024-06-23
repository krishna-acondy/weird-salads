import { gql } from "urql";

export const IngredientsQuery = gql`
  query (
    $first: Int
    $last: Int
    $offset: Int
    $after: Cursor
    $before: Cursor
    $orderBy: [IngredientsOrderBy!]
    $filter: IngredientFilter
  ) {
    allIngredients(
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
        unit
        cost
        availableQuantity
        updatedAt
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;
