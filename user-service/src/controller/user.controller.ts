import { Request, Response, Router } from "express";
import {
  findOne,
  createUser,
  updateUser,
  deleteUser,
} from "../services/user.service";
export const UserRouter: Router = Router();

UserRouter.get("/api/users/:id", (req: Request, res: Response) => {
  return findOne(req, res);
});

UserRouter.post("/api/users", (req: Request, res: Response) => {
  return createUser(req, res);
});

UserRouter.put("/api/users/:id", (req: Request, res: Response) => {
  return updateUser(req, res);
});

UserRouter.delete("/api/users/:id", (req: Request, res: Response) => {
  return deleteUser(req, res);
});
