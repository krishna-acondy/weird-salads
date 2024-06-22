import { Migrator } from "./Migrator";
import dotenv from "dotenv";
export async function migrate(up: boolean) {
  const migrate = new Migrator();
  if (up) {
    await migrate.up();
  } else {
    await migrate.down();
  }
}

dotenv.config();

migrate(true).then(() => {
  console.log("Completed migration");
});
