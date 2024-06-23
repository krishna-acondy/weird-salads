import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { Stack } from "@mui/material";

function AppShell() {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Stack
      direction="column"
      sx={{ height: "100%", width: "100%", p: 0, m: 0 }}
    >
      <Header />
      <Container
        component="main"
        maxWidth={isSmUp ? "xl" : "lg"}
        sx={{
          display: "flex",
          flexGrow: 1,
          p: 2,
          // Prevents bottom navigation obscuring content
          mb: isSmUp ? 2 : 8,
          scrollbarWidth: "none",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Outlet />
      </Container>
    </Stack>
  );
}

export default AppShell;
