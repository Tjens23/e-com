import { compare, genSalt, hash } from "bcrypt";

export const hashPassword = async (password: string) => {
  return await hash(password, await genSalt(12));
};

export const comparePassowrd = async (
  hashedPassword: string,
  password: string,
) => {
  return await compare(hashedPassword, password);
};
