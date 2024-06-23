import { useMutation } from "urql";
import { CreateDeliveryMutation } from "../graphql";
import { Delivery } from "../../../types";

type CreateDeliveryVariables = {
  input: {
    clientMutationId?: string;
    delivery: Record<string, unknown>;
  };
};

type CreateDeliveryResult = {
  createDelivery: {
    delivery: Delivery;
  };
};

export function useCreateDelivery() {
  return useMutation<CreateDeliveryResult, CreateDeliveryVariables>(
    CreateDeliveryMutation
  );
}
