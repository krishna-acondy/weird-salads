import { gql } from "urql";

export const OrdersQuery = gql`
  query (
    $first: Int
    $last: Int
    $offset: Int
    $after: Cursor
    $before: Cursor
    $orderBy: [OrdersOrderBy!]
    $filter: OrderFilter
  ) {
    allOrders(
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
        createdAt
        updatedAt
        orderRecipesByOrderId {
          nodes {
            orderId
            recipeId
            quantity
            recipeByRecipeId {
              id
              name
              price
            }
          }
        }
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
