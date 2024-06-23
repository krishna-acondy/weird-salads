import { useQuery } from "urql";
import { Connection, ConnectionVariables, Delivery } from "../../../types";
import { DeliveriesQuery } from "../graphql";

export type DeliveriesQueryResult = {
  allDeliveries: Connection<Delivery>;
};

export function useDeliveries(variables: ConnectionVariables<Delivery> = {}) {
  return useQuery<DeliveriesQueryResult>({
    query: DeliveriesQuery,
    variables,
  });
}
