import { useMutation } from "urql";
import { CreateOrderMutation } from "../graphql";
import { Order } from "../../../types";

type CreateOrderVariables = {
  input: {
    clientMutationId?: string;
    order: Record<string, unknown>;
  };
};

type CreateOrderResult = {
  createOrder: {
    order: Order;
  };
};

export function useCreateOrder() {
  return useMutation<CreateOrderResult, CreateOrderVariables>(
    CreateOrderMutation
  );
}
