import { db } from "../db";

export const getAllUsers = async () => {
  return await db.user.findMany();
};
