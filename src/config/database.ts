import { ConnectionOptions } from "typeorm";
import { env } from "./environtment";
import { UserEntity } from "../entities/user";
import { BlogEntity } from "../entities/blog";

export const config: ConnectionOptions = {
  type: "postgres",
  host: env.pgHost,
  port: env.pgPort,
  username: env.pgUser,
  password: env.pgPass,
  database: env.pgDBName,
  entities: [UserEntity, BlogEntity],
  synchronize: true,
};
