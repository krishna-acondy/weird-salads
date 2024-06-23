import { Stack } from "@mui/material";
import { Outlet } from "react-router";
import { Nav } from "../../components";
import { EditNote, List } from "@mui/icons-material";

const items = [
  {
    id: "new",
    title: "New order",
    icon: <EditNote />,
    path: "new",
  },
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
