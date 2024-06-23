import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import AppContext from "../AppContext";

import AppShell from "./AppShell";
import { NewOrder, OrderList, Orders } from "../../pages/Orders";
import { DeliveryList, Inventory, ItemList } from "../../pages/Inventory";

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
            path: "/inventory",
            element: <Inventory />,
            children: [
              { index: true, element: <Navigate to="items" /> },
              { path: "items", element: <ItemList /> },
              { path: "deliveries", element: <DeliveryList /> },
            ],
          },
          { path: "/", element: <Navigate to="/orders" /> },
        ],
      },
    ],
  },
]);
