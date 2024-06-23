import React from "react";
import { useIngredients } from "../hooks";
import { Button, Stack, Toolbar, Typography } from "@mui/material";
import { usePagination } from "../../../hooks";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Ingredient } from "../../../types";
import { Add } from "@mui/icons-material";

const columns: GridColDef<Ingredient>[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  {
    field: "availableQuantity",
    headerName: "Available quantity",
    width: 130,
    renderCell: (params) =>
      params.row.availableQuantity
        ? `${params.row.availableQuantity} ${params.row.unit}`
        : "Unavailable",
  },
  {
    field: "cost",
    headerName: "Cost",
    type: "number",
    width: 90,
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
];

export function IngredientList() {
  const pagination = usePagination({
    pageSize: 50,
    strategy: "offset",
  });

  const [{ data, fetching }] = useIngredients({
    ...pagination.pageVariables,
  });

  const ingredients = React.useMemo(
    () => data?.allIngredients?.nodes ?? [],
    [data]
  );

  const totalCount = React.useMemo(
    () => data?.allIngredients?.totalCount,
    [data]
  );

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
          <Typography variant="h5">Ingredients</Typography>
          <Stack direction="row">
            <Button color="primary" startIcon={<Add />} disabled>
              New ingredient
            </Button>
          </Stack>
        </Stack>
      </Toolbar>
      <DataGrid
        rows={ingredients}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              page: pagination.state.pageIndex,
              pageSize: pagination.state.pageSize,
            },
            rowCount: totalCount,
            meta: {
              hasNextPage: data?.allIngredients?.pageInfo?.hasNextPage,
            },
          },
        }}
        onPaginationModelChange={handlePaginationModelChange}
        pageSizeOptions={[10, 25, 50, 100]}
        paginationMode="server"
        rowCount={totalCount}
      />
    </Stack>
  );
}
