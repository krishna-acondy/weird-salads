export type Delivery = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deliveryIngredientsByDeliveryId: {
    nodes: {
      ingredientId: number;
      quantity: number;
      ingredientByIngredientId: {
        id: number;
        name: string;
        unit: string;
        cost: number;
      };
    }[];
  };
};
