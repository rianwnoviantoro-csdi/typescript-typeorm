import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserEntity } from "../entities/user";
import { IUserPayload } from "../interfaces/user";
import { hashPassword } from "../utils/hashPassword";
import { env } from "../config/environtment";

export const create = async (payload: IUserPayload) => {
  const repo = getRepository(UserEntity);
  payload.password = await hashPassword(payload.password);

  return await repo.save({
    ...payload,
  });
};

export const getUserByUsername = async (username: string) => {
  const repo = getRepository(UserEntity);

  return await repo.findOne({ where: { username: username } });
};

export const login = async (payload: IUserPayload) => {
  const found = await getUserByUsername(payload.username);

  const matchPassword = await bcrypt.compare(payload.password, found.password);

  if (!matchPassword) {
    throw new Error("Invalid credentials");
  }

  const accessToken = jwt.sign(
    {
      id: found.id,
      username: found.username,
    },
    env.secret,
    { expiresIn: "1d" }
  );

  return accessToken;
};
