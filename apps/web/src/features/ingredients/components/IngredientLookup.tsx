import React from "react";
import { useIngredients } from "../hooks";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDebounce } from "@uidotdev/usehooks";

export type AddedIngredient = {
  ingredientId: number;
  name: string;
  quantity: number;
  unit: string;
};

type IngredientLookupProps = {
  addedIngredients: AddedIngredient[];
  onAddIngredient: (
    ingredientId: number,
    name: string,
    quantity: number,
    unit: string
  ) => void;
  onSaveDelivery: () => void;
};

export function IngredientLookup({
  addedIngredients = [],
  onAddIngredient,
  onSaveDelivery,
}: IngredientLookupProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedValue, setDebouncedValue] = React.useState("");

  useDebounce(() => {
    setDebouncedValue(searchTerm ?? "");
  }, 200);

  const [quantities, setQuantities] = React.useState<Record<string, number>>(
    {}
  );
  const [{ data, fetching }] = useIngredients({
    ...(!!debouncedValue && {
      filter: { name: { includesInsensitive: debouncedValue } },
    }),
  });

  const ingredients = React.useMemo(
    () => data?.allIngredients?.nodes ?? [],
    [data]
  );

  return (
    <Stack width="100%" gap={2} pt={2}>
      <Stack gap={1}>
        {addedIngredients.map((ingredient) => (
          <Card key={ingredient.ingredientId}>
            <CardContent>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Typography>{ingredient.name}</Typography>
                {ingredient.quantity} {ingredient.unit}
              </Stack>
            </CardContent>
          </Card>
        ))}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onSaveDelivery()}
          disabled={!addedIngredients.length}
        >
          Save delivery
        </Button>
      </Stack>
      <TextField
        label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {!debouncedValue ? (
        <Stack
          width="100%"
          height="100%"
          minHeight={400}
          justifyContent="center"
          alignItems="center"
        >
          Type in an ingredient name to start
        </Stack>
      ) : fetching ? (
        "Loading..."
      ) : (
        <Stack
          height={400}
          overflow="auto"
          gap={2}
          direction="row"
          flexWrap="wrap"
        >
          {ingredients.map((ingredient) => (
            <Card key={ingredient.id} sx={{ width: 200, height: 200 }}>
              <CardHeader
                title={ingredient.name}
                titleTypographyProps={{ variant: "body1" }}
              ></CardHeader>
              <CardContent>
                <TextField
                  label="Quantity"
                  type="number"
                  value={quantities[ingredient.id] ?? 0}
                  onChange={(e) => {
                    setQuantities({
                      ...quantities,
                      [ingredient.id]: Number(e.target.value),
                    });
                  }}
                />
                <Button
                  onClick={() =>
                    onAddIngredient(
                      ingredient.id,
                      ingredient.name,
                      quantities[ingredient.id] ?? 0,
                      ingredient.unit
                    )
                  }
                >
                  Add
                </Button>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
