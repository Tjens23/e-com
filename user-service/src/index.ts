import "dotenv/config";
import * as express from "express";
import { AppDataSource } from "./database/database";
(async () => {
  const app = express();
  await AppDataSource.initialize();
  app.listen(process.env.PORT || 3001, () => {
    console.log(`Server is running on port ${process.env.PORT || 3001}`);
  });
})();
