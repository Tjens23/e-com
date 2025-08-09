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
