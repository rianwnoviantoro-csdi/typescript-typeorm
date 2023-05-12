import { Router } from "express";
import { signin, signup } from "../controllers/user";

export const userRouter: Router = Router();

userRouter.post("/register", signup);
userRouter.post("/login", signin);
