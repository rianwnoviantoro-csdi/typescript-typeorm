import express from "express";
const router = express.Router();

import { userRouter } from "./user";
import { blogRouter } from "./blog";

router.use("/auth", userRouter);
router.use("/blogs", blogRouter);

export default router;
