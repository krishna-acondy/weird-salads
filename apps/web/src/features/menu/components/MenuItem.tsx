import {
  Card,
  CardHeader,
  CardContent,
  Stack,
  Typography,
  ButtonBase,
} from "@mui/material";
import { Recipe } from "../../../types";

type MenuItemProps = {
  recipe: Recipe;
};
export function MenuItem({ recipe }: MenuItemProps) {
  const disabled = !recipe.maxAvailable;
  return (
    <ButtonBase disabled={disabled}>
      <Card key={recipe.id} sx={{ minWidth: 320 }}>
        <CardHeader title={recipe.name}></CardHeader>
        <CardContent>
          <Stack direction="row" gap={2}>
            <Stack>
              <Typography variant="caption">Available</Typography>
              <Typography>{recipe.maxAvailable}</Typography>
            </Stack>
            <Stack>
              <Typography variant="caption">Price</Typography>
              <Typography>€ {recipe.price}</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </ButtonBase>
  );
}
