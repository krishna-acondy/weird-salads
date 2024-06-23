import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLocation, useNavigate } from "react-router-dom";

export function TabNavigation() {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const { pathname } = useLocation();
  const route = pathname?.split("/")[1];
  const currentTab =
    route === "menu" || route === "orders" || route === "inventory"
      ? route
      : false;
  const navigate = useNavigate();

  if (!isSmUp) {
    return null;
  }

  return (
    <Tabs textColor="inherit" value={currentTab}>
      <Tab
        label="Orders"
        value="orders"
        onClick={() => {
          navigate("/orders");
        }}
      />
      <Tab
        label="Inventory"
        value="inventory"
        onClick={() => {
          navigate("/inventory");
        }}
      />
    </Tabs>
  );
}
