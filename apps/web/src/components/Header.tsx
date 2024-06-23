import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { TabNavigation } from "./TabNavigation";
import { Logo } from "../icons/Logo";

const StyledHeader = styled("header")(({ theme }) => ({
  position: "sticky",
  top: 0,
  transition: theme.transitions.create("top"),
  zIndex: theme.zIndex.appBar,
  boxShadow: `inset 0px -1px 1px ${theme.palette.grey[100]}`,
  backgroundColor: "rgba(255,255,255,0.72)",
}));

export function Header() {
  return (
    <StyledHeader>
      <Toolbar sx={{ maxHeight: 64 }}>
        <Box aria-label="Home" component={Link} to="/" sx={{ mr: 2 }}>
          <Logo />
        </Box>
        <TabNavigation />
      </Toolbar>
    </StyledHeader>
  );
}
