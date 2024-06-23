import { gql } from "urql";

export const CreateOrderMutation = gql`
  mutation ($input: CreateOrderInput!) {
    createOrder(input: $input) {
      order {
        nodeId
        id
        createdAt
        updatedAt
      }
    }
  }
`;
