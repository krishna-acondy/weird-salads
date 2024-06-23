import { Container } from "@mui/material";
import { OrderList } from "../../features/orders";

export function Orders() {
  return (
    <Container maxWidth="xl">
      <OrderList />
    </Container>
  );
}
