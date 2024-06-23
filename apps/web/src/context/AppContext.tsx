import * as React from "react";
import { UrqlContext } from "./UrqlContext";
import { Compose } from "./Compose";

function AppContext(props: React.PropsWithChildren<Record<string, unknown>>) {
  const { children } = props;

  return (
    <Compose providers={[UrqlContext]} {...props}>
      {children}
    </Compose>
  );
}

export default AppContext;
