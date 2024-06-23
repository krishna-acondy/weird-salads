import { Container } from "@mui/material";
import { DeliveryList } from "../../features/deliveries";

export function Deliveries() {
  return (
    <Container maxWidth="xl">
      <DeliveryList />
    </Container>
  );
}
