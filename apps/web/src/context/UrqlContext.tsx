import * as React from "react";
import { createClient, fetchExchange, Provider } from "urql";
import { Cache, cacheExchange } from "@urql/exchange-graphcache";

let url = "";
if (import.meta.env.VITE_API_URL) {
  console.log("VITE_API_URL", import.meta.env.VITE_API_URL);
  url = import.meta.env.VITE_API_URL;
}

function invalidateField(fieldName: string, cache: Cache) {
  const key = "Query";
  cache
    .inspectFields(key)
    .filter(
      (field: { fieldName: string; fieldKey: string; arguments: unknown }) =>
        field.fieldName === fieldName
    )
    .forEach(
      (field: { fieldName: string; fieldKey: string; arguments: unknown }) => {
        cache.invalidate(key, field.fieldKey);
        // @ts-expect-error unknown arguments
        cache.invalidate(key, field.fieldName, field.arguments);
      }
    );
}

const exchanges = [
  cacheExchange({
    updates: {
      Mutation: {
        createDelivery(_result, _args, cache) {
          invalidateField("allDeliveries", cache);
        },
        createOrder(_result, _args, cache) {
          invalidateField("allOrders", cache);
        },
        mnCreateDeliveryIngredient(_result, _args, cache) {
          invalidateField("allDeliveries", cache);
          invalidateField("allIngredients", cache);
        },
        mnCreateOrderRecipe(_result, _args, cache) {
          invalidateField("allOrders", cache);
          invalidateField("allRecipes", cache);
        },
      },
    },
  }),
];

export interface UrqlContextProps {
  children: React.ReactNode;
}

export function UrqlContext({ children }: UrqlContextProps) {
  console.log({ url });
  const client = React.useMemo(() => {
    return createClient({
      url: url + "/graphql",
      exchanges: [...exchanges, fetchExchange],
    });
  }, []);

  return <Provider value={client}>{children}</Provider>;
}
