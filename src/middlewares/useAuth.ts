import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { logging } from "../utils/logging";
import { env } from "../config/environtment";

export const useAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header: string =
      <string>req.headers.authorization || <string>req.headers.Authorization;

    if (!header?.startsWith("Bearer ")) {
      logging.error("Unauthorized");
      return res.status(401).json({ message: "Unauthorized", data: [] });
    }

    const token: string = header.split(" ")[1];
    const decoded: jwt.JwtPayload = jwt.verify(token, env.secret);

    if (!decoded) {
      logging.error("Forbidden");
      return res.status(403).json({ message: "Forbidden", data: [] });
    }

    next();
  } catch (e) {
    logging.error(e.message);
    return res.status(500).json({ message: "Something went wrong", data: [] });
  }
};
