import * as React from "react";
import { createClient, fetchExchange, Provider } from "urql";

let url = "";
if (import.meta.env.VITE_API_URL) {
  console.log("VITE_API_URL", import.meta.env.VITE_API_URL);
  url = import.meta.env.VITE_API_URL;
}

export interface UrqlContextProps {
  children: React.ReactNode;
}

export function UrqlContext({ children }: UrqlContextProps) {
  console.log({ url });
  const client = React.useMemo(() => {
    return createClient({
      url: url + "/graphql",
      exchanges: [fetchExchange],
    });
  }, []);

  return <Provider value={client}>{children}</Provider>;
}
