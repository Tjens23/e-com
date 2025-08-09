import User from "../database/models/user.entity";
import { Response, Request } from "express";
import { hashPassword } from "../Utils/utils";
import { CANCELLED } from "dns/promises";

export const findOne = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ where: { id: parseInt(id) } });
    if (!user)
      return res
        .json({
          message: `User with id ${id} doesn't exsits in our database...`,
        })
        .status(404);
    return user;
  } catch (err: any) {
    res.json({ message: `Failed to get user with data: ${req.params.id}` });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userExsists = await User.findOne({ where: { email } });
  if (userExsists) return res.json({ message: "email taken" });
  const hashed = await hashPassword(password);
  const user = await User.create({ email, password: hashed }).save();
  return res.status(201).json({ message: `User created: ${user.email}` });
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;

    const user = await User.findOne({ where: { id: parseInt(id) } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({ message: "Email already taken" });
      }
      user.email = email;
    }

    if (password) {
      user.password = await hashPassword(password);
    }

    await user.save();

    return res.status(200).json({
      message: "User updated successfully",
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({ message: `Internal server error, ${error}` });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where: { id: parseInt(id) } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.remove();
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Internal server error: ${error}` });
  }
};
