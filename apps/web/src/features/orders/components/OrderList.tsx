import React from "react";
import { useOrders } from "../hooks";
import { Button, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import { usePagination } from "../../../hooks";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Order } from "../../../types";
import { Add } from "@mui/icons-material";
import { AddOrderDialog } from "./AddOrderDialog";

const columns: GridColDef<Order>[] = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "createdAt",
    headerName: "Created",
    renderCell: (params) =>
      formatDistanceToNow(parseISO((params.value as string) + "Z"), {
        addSuffix: true,
      }),
    sortable: false,
    width: 160,
  },
  {
    field: "updatedAt",
    headerName: "Last updated",
    renderCell: (params) =>
      formatDistanceToNow(parseISO((params.value as string) + "Z"), {
        addSuffix: true,
      }),
    sortable: false,
    width: 160,
  },
  {
    field: "items",
    headerName: "Items",
    renderCell: (params) => {
      const recipes = params.row.orderRecipesByOrderId.nodes;
      const value = recipes
        .map((i) => `${i.recipeByRecipeId.name} - €${i.recipeByRecipeId.price}`)
        .join(", ");
      return (
        <Tooltip title={value}>
          <span>{value}</span>
        </Tooltip>
      );
    },
    sortable: false,
    width: 160,
  },
  {
    field: "value",
    headerName: "Total value",
    renderCell: (params) => {
      const recipes = params.row.orderRecipesByOrderId.nodes;
      const cost = recipes.reduce(
        (acc, i) => acc + i.recipeByRecipeId.price * i.quantity,
        0
      );

      return "€" + cost.toFixed(2);
    },
    sortable: false,
    width: 160,
  },
];

export function OrderList() {
  const pagination = usePagination({
    pageSize: 50,
    strategy: "offset",
  });

  const [{ data, fetching }] = useOrders({
    ...pagination.pageVariables,
  });

  const orders = React.useMemo(() => data?.allOrders?.nodes ?? [], [data]);

  const totalCount = React.useMemo(() => data?.allOrders?.totalCount, [data]);

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handlePaginationModelChange = React.useCallback(
    (newPaginationModel: GridPaginationModel) => {
      // We have the cursor, we can allow the page transition.
      if (newPaginationModel.page === pagination.state.pageIndex + 1) {
        pagination.nextPage();
      } else if (newPaginationModel.page === pagination.state.pageIndex - 1) {
        pagination.previousPage();
      } else if (newPaginationModel.pageSize !== pagination.state.pageSize) {
        pagination.setPageSize(newPaginationModel.pageSize);
      }
    },
    [pagination]
  );

  if (fetching) return <div>Loading...</div>;
  return (
    <Stack height={800} width="100%" gap={2} flexWrap="wrap">
      <Toolbar disableGutters>
        <Stack
          direction="row"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">Orders</Typography>
          <Stack direction="row">
            <Button
              color="primary"
              startIcon={<Add />}
              onClick={() => setDialogOpen(true)}
            >
              New order
            </Button>
          </Stack>
        </Stack>
      </Toolbar>
      <DataGrid
        rows={orders}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              page: pagination.state.pageIndex,
              pageSize: pagination.state.pageSize,
            },
            rowCount: totalCount,
            meta: {
              hasNextPage: data?.allOrders?.pageInfo?.hasNextPage,
            },
          },
        }}
        onPaginationModelChange={handlePaginationModelChange}
        pageSizeOptions={[10, 25, 50, 100]}
        paginationMode="server"
        rowCount={totalCount}
      />
      <AddOrderDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Stack>
  );
}
