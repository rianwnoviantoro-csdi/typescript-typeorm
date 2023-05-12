import { Router } from "express";
import {
  createNew,
  deleteBlog,
  getById,
  listBlog,
  updateBlog,
} from "../controllers/blog";
import { useAuth } from "../middlewares/useAuth";

export const blogRouter: Router = Router();

blogRouter.get("/", listBlog);
blogRouter.get("/:id", getById);
blogRouter.delete("/:id", useAuth, deleteBlog);
blogRouter.patch("/:id", useAuth, updateBlog);
blogRouter.post("/", useAuth, createNew);
