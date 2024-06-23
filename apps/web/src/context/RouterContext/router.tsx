import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import AppContext from "../AppContext";

import AppShell from "./AppShell";
import { NewOrder, OrderList, Orders } from "../../pages/Orders";
import { Inventory, Ingredients, Deliveries } from "../../pages/Inventory";
import { Menu } from "../../features/menu/components/Menu";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppContext>
        <Outlet />
      </AppContext>
    ),
    children: [
      {
        path: "/",
        element: <AppShell />,
        children: [
          {
            path: "/orders",
            element: <Orders />,
            children: [
              { index: true, element: <Navigate to="list" /> },
              { path: "list", element: <OrderList /> },
              { path: "new", element: <NewOrder /> },
            ],
          },
          {
            path: "/menu",
            element: <Menu />,
          },
          {
            path: "/inventory",
            element: <Inventory />,
            children: [
              { index: true, element: <Navigate to="items" /> },
              { path: "items", element: <Ingredients /> },
              { path: "deliveries", element: <Deliveries /> },
            ],
          },
          { path: "/", element: <Navigate to="/orders" /> },
        ],
      },
    ],
  },
]);
