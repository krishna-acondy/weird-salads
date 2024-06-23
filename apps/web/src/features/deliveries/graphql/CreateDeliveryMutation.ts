import { gql } from "urql";

export const CreateDeliveryMutation = gql`
  mutation ($input: CreateDeliveryInput!) {
    createDelivery(input: $input) {
      delivery {
        nodeId
        id
        createdAt
        updatedAt
      }
    }
  }
`;
