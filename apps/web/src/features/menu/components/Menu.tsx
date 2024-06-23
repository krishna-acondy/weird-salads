import React from "react";
import { useRecipes } from "../hooks";
import { Stack } from "@mui/material";
import { MenuItem } from "./MenuItem";

export function Menu() {
  const [{ data, fetching }] = useRecipes();

  const recipes = React.useMemo(() => data?.allRecipes?.nodes ?? [], [data]);

  if (fetching) return <div>Loading...</div>;
  return (
    <Stack direction="row" gap={2} flexWrap="wrap">
      {recipes.map((recipe) => (
        <MenuItem key={recipe.id} recipe={recipe} />
      ))}
    </Stack>
  );
}
