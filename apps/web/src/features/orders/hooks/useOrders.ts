import { useQuery } from "urql";
import { Connection, ConnectionVariables, Order } from "../../../types";
import { OrdersQuery } from "../graphql";

export type OrdersQueryResult = {
  allOrders: Connection<Order>;
};

export function useOrders(variables: ConnectionVariables<Order> = {}) {
  return useQuery<OrdersQueryResult>({
    query: OrdersQuery,
    variables,
  });
}
