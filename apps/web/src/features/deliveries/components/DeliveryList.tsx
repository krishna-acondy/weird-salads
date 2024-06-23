import React from "react";
import { useDeliveries } from "../hooks";
import { Button, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import { usePagination } from "../../../hooks";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Delivery } from "../../../types";
import { Add } from "@mui/icons-material";
import { AddDeliveryDialog } from "./AddDeliveryDialog";

const columns: GridColDef<Delivery>[] = [
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
    field: "ingredients",
    headerName: "Ingredients",
    renderCell: (params) => {
      const ingredients = params.row.deliveryIngredientsByDeliveryId.nodes;
      const value = ingredients
        .map((i) => `${i.quantity} ${i.ingredientByIngredientId.name}`)
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
    field: "cost",
    headerName: "Cost",
    renderCell: (params) => {
      const ingredients = params.row.deliveryIngredientsByDeliveryId.nodes;
      const cost = ingredients.reduce(
        (acc, i) => acc + i.quantity * i.ingredientByIngredientId.cost,
        0
      );
      return "€" + cost.toFixed(2);
    },
    sortable: false,
    width: 160,
  },
];

export function DeliveryList() {
  const pagination = usePagination({
    pageSize: 50,
    strategy: "offset",
  });

  const [{ data, fetching }] = useDeliveries({
    ...pagination.pageVariables,
  });

  const deliveries = React.useMemo(
    () => data?.allDeliveries?.nodes ?? [],
    [data]
  );

  const totalCount = React.useMemo(
    () => data?.allDeliveries?.totalCount,
    [data]
  );

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
          <Typography variant="h5">Deliveries</Typography>
          <Stack direction="row">
            <Button
              color="primary"
              startIcon={<Add />}
              onClick={() => setDialogOpen(true)}
            >
              New delivery
            </Button>
          </Stack>
        </Stack>
      </Toolbar>
      <DataGrid
        rows={deliveries}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              page: pagination.state.pageIndex,
              pageSize: pagination.state.pageSize,
            },
            rowCount: totalCount,
            meta: {
              hasNextPage: data?.allDeliveries?.pageInfo?.hasNextPage,
            },
          },
        }}
        onPaginationModelChange={handlePaginationModelChange}
        pageSizeOptions={[10, 25, 50, 100]}
        paginationMode="server"
        rowCount={totalCount}
      />
      <AddDeliveryDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </Stack>
  );
}
