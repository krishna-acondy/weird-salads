import { gql } from "urql";

export const DeliveriesQuery = gql`
  query (
    $first: Int
    $last: Int
    $offset: Int
    $after: Cursor
    $before: Cursor
    $orderBy: [DeliveriesOrderBy!]
    $filter: DeliveryFilter
  ) {
    allDeliveries(
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
        deliveryIngredientsByDeliveryId {
          nodes {
            ingredientId
            quantity
            ingredientByIngredientId {
              id
              name
              unit
              cost
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
