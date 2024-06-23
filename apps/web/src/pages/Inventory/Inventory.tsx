import { Stack } from "@mui/material";
import { Outlet } from "react-router";
import { Nav } from "../../components";
import { Inventory as InventoryIcon, LocalShipping } from "@mui/icons-material";

const items = [
  {
    id: "items",
    title: "Items",
    icon: <InventoryIcon />,
    path: "items",
  },
  {
    id: "deliveries",
    title: "Deliveries",
    icon: <LocalShipping />,
    path: "deliveries",
  },
];
export function Inventory() {
  return (
    <Stack>
      <Nav items={items} />
      <Outlet />
    </Stack>
  );
}
