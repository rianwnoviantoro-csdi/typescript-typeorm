import { Request, Response } from "express";
import { create, login } from "../repositories/user";
import { logging } from "../utils/logging";
import { IUserPayload } from "../interfaces/user";

export const signup = async (req: Request, res: Response) => {
  try {
    const payload: IUserPayload = req.body;

    const result = await create(payload);

    delete result.password;

    return res
      .status(201)
      .json({ message: "User registered successfully", data: [] });
  } catch (e) {
    logging.error(e.message);
    return res.status(500).json({ message: "Something went wrong", data: [] });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const payload: IUserPayload = req.body;

    const token = await login(payload);

    return res.status(202).json({
      message: "User logged in successfully",
      data: [
        {
          token: token,
        },
      ],
    });
  } catch (e) {
    logging.error(e.message);
    return res.status(500).json({ message: "Something went wrong", data: [] });
  }
};
