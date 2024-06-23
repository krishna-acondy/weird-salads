import { Stack } from "@mui/material";
import { Outlet } from "react-router";
import { Nav } from "../../components";
import { List } from "@mui/icons-material";

const items = [
  {
    id: "list",
    title: "Order list",
    icon: <List />,
    path: "list",
  },
];
export function OrdersPage() {
  return (
    <Stack width="100%">
      <Nav items={items} />
      <Outlet />
    </Stack>
  );
}
