import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#D90368",
    },
    secondary: {
      main: "#62ab8d",
    },
  },
});

export function ThemeContext({ children }: React.PropsWithChildren<unknown>) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
