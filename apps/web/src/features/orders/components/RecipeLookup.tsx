import React from "react";
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
import { useRecipes } from "../../menu/hooks";

export type AddedRecipe = {
  recipeId: number;
  name: string;
  quantity: number;
  price: number;
};

type RecipeLookupProps = {
  addedRecipes: AddedRecipe[];
  onAddRecipe: (
    recipeId: number,
    name: string,
    quantity: number,
    price: number
  ) => void;
  onSaveOrder: () => void;
};

export function RecipeLookup({
  addedRecipes = [],
  onAddRecipe,
  onSaveOrder,
}: RecipeLookupProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedValue, setDebouncedValue] = React.useState("");

  useDebounce(() => {
    setDebouncedValue(searchTerm ?? "");
  }, 200);

  const [quantities, setQuantities] = React.useState<Record<string, number>>(
    {}
  );
  const [{ data, fetching }] = useRecipes({
    ...(!!debouncedValue && {
      filter: { name: { includesInsensitive: debouncedValue } },
    }),
  });

  const recipes = React.useMemo(() => data?.allRecipes?.nodes ?? [], [data]);

  return (
    <Stack width="100%" gap={2} pt={2}>
      <Stack gap={1}>
        {addedRecipes.map((recipe) => (
          <Card key={recipe.recipeId}>
            <CardContent>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Typography>{recipe.name}</Typography>
                <Typography>x{recipe.quantity}</Typography>
                <Typography>€{recipe.price * recipe.quantity}</Typography>
              </Stack>
            </CardContent>
          </Card>
        ))}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onSaveOrder()}
          disabled={!addedRecipes.length}
        >
          Save order
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
          Type in a recipe name to start
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
          {recipes.map((recipe) => (
            <Card key={recipe.id} sx={{ width: 200, height: 240 }}>
              <CardHeader
                title={recipe.name}
                titleTypographyProps={{ variant: "body1" }}
              ></CardHeader>
              <CardContent>
                {recipe.maxAvailable > 0 ? (
                  <>
                    <Typography>€{recipe.price}</Typography>
                    <Typography gutterBottom sx={{ pb: 2 }}>
                      Available: {recipe.maxAvailable}
                    </Typography>
                    <TextField
                      label="Quantity"
                      type="number"
                      value={quantities[recipe.id] ?? 0}
                      error={quantities[recipe.id] > recipe.maxAvailable}
                      onChange={(e) => {
                        setQuantities({
                          ...quantities,
                          [recipe.id]: Number(e.target.value),
                        });
                      }}
                    />
                    <Button
                      onClick={() =>
                        onAddRecipe(
                          recipe.id,
                          recipe.name,
                          quantities[recipe.id] ?? 0,
                          recipe.price
                        )
                      }
                    >
                      Add
                    </Button>
                  </>
                ) : (
                  "Out of stock"
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
