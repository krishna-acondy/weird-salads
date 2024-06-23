import * as React from "react";
import { UrqlContext } from "./UrqlContext";
import { Compose } from "./Compose";
import { ThemeContext } from "./ThemeContext";

function AppContext(props: React.PropsWithChildren<Record<string, unknown>>) {
  const { children } = props;

  return (
    <Compose providers={[ThemeContext, UrqlContext]} {...props}>
      {children}
    </Compose>
  );
}

export default AppContext;
