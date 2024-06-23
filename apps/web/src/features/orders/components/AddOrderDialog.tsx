import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogContent } from "@mui/material";
import React from "react";
import { useCreateOrderRecipes } from "../hooks";
import { useCreateOrder } from "../hooks/useCreateOrder";
import { AddedRecipe, RecipeLookup } from "./RecipeLookup";

export interface AddOrderDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AddOrderDialog(props: AddOrderDialogProps) {
  const { onClose, open } = props;
  const [addedRecipes, setAddedRecipes] = React.useState<AddedRecipe[]>([]);

  const [, createOrder] = useCreateOrder();
  const [, createOrderRecipes] = useCreateOrderRecipes();

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{ sx: { minHeight: 600, minWidth: 800 } }}
    >
      <DialogTitle>Add order</DialogTitle>
      <DialogContent>
        <RecipeLookup
          addedRecipes={addedRecipes}
          onAddRecipe={(recipeId, name, quantity, price) => {
            if (addedRecipes.some((i) => i.recipeId === recipeId)) {
              setAddedRecipes(
                addedRecipes.map((i) =>
                  i.recipeId === recipeId
                    ? { ...i, quantity: i.quantity + quantity }
                    : i
                )
              );
            } else {
              setAddedRecipes([
                ...addedRecipes,
                { recipeId, name, quantity, price },
              ]);
            }
          }}
          onSaveOrder={async () => {
            const { data: orderData } = await createOrder({
              input: {
                order: {},
              },
            });

            if (orderData?.createOrder?.order) {
              const orderId = orderData.createOrder.order.id;

              await createOrderRecipes({
                input: {
                  mnOrderRecipe: addedRecipes.map((i) => ({
                    orderId,
                    recipeId: i.recipeId,
                    quantity: i.quantity,
                  })),
                },
              });

              handleClose();
            }
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
