import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  AddedIngredient,
  IngredientLookup,
} from "../../ingredients/components/IngredientLookup";
import { DialogContent } from "@mui/material";
import React from "react";
import { useCreateDelivery, useCreateDeliveryIngredients } from "../hooks";

export interface AddDeliveryDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AddDeliveryDialog(props: AddDeliveryDialogProps) {
  const { onClose, open } = props;
  const [addedIngredients, setAddedIngredients] = React.useState<
    AddedIngredient[]
  >([]);

  const [, createDelivery] = useCreateDelivery();
  const [, createDeliveryIngredients] = useCreateDeliveryIngredients();

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{ sx: { minHeight: 600, minWidth: 800 } }}
    >
      <DialogTitle>Add delivery</DialogTitle>
      <DialogContent>
        <IngredientLookup
          addedIngredients={addedIngredients}
          onAddIngredient={(ingredientId, name, quantity, unit) => {
            if (addedIngredients.some((i) => i.ingredientId === ingredientId)) {
              setAddedIngredients(
                addedIngredients.map((i) =>
                  i.ingredientId === ingredientId
                    ? { ...i, quantity: i.quantity + quantity }
                    : i
                )
              );
            } else {
              setAddedIngredients([
                ...addedIngredients,
                { ingredientId, name, quantity, unit },
              ]);
            }
          }}
          onSaveDelivery={async () => {
            const { data: deliveryData } = await createDelivery({
              input: {
                delivery: {},
              },
            });

            if (deliveryData?.createDelivery?.delivery) {
              const deliveryId = deliveryData.createDelivery.delivery.id;

              await createDeliveryIngredients({
                input: {
                  mnDeliveryIngredient: addedIngredients.map((i) => ({
                    deliveryId,
                    ingredientId: i.ingredientId,
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
