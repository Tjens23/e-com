import "dotenv/config";
import * as express from "express";
import { AppDataSource } from "./database/database";
import { UserRouter } from "./controller/user.controller";
(async () => {
  const app = express();
  await AppDataSource.initialize();
  app.use(express.json());
  app.use(UserRouter);
  app.get("/", (_req, res) => {
    res.json({ message: "Hello world!" }).status(200);
  });
  app.listen(process.env.PORT || 3001, () => {
    console.log(`Server is running on port ${process.env.PORT || 3001}`);
  });
})();
