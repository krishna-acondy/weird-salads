export type Order = {
  id: number;
  createdAt: string;
  updatedAt: string;
  orderRecipesByOrderId: {
    nodes: {
      orderId: number;
      recipeId: number;
      quantity: number;
      recipeByRecipeId: {
        id: number;
        name: string;
        price: number;
      };
    }[];
  };
};
