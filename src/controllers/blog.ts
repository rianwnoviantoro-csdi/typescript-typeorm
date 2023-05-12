import { Request, Response } from "express";
import { IBlogPayload } from "../interfaces/blog";
import { create, findAll, findOne, remove, update } from "../repositories/blog";
import { logging } from "../utils/logging";

export const listBlog = async (req: Request, res: Response) => {
  try {
    const list = await findAll();

    return res.status(200).json({ message: "Success", data: list });
  } catch (e) {
    logging.error(e.message);
    return res.status(500).json({ message: "Something went wrong", data: [] });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;

    const blog = await findOne(parseInt(blogId));

    if (!blog) {
      logging.error(`Blog with id ${blogId} not found`);
      return res
        .status(404)
        .json({ message: `Blog with id ${blogId} not found`, data: [] });
    }

    return res.status(200).json({ message: "Success", data: blog });
  } catch (e) {
    logging.error(e.message);
    return res.status(500).json({ message: "Something went wrong", data: [] });
  }
};

export const createNew = async (req: Request, res: Response) => {
  try {
    const payload: IBlogPayload = req.body;

    await create(payload);

    return res
      .status(201)
      .json({ message: "Blog created successfully", data: [] });
  } catch (e) {
    logging.error(e.message);
    return res.status(500).json({ message: "Something went wrong", data: [] });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const payload: IBlogPayload = req.body;

    await update(parseInt(blogId), payload);

    return res
      .status(201)
      .json({ message: "Blog updated successfully", data: [] });
  } catch (e) {
    logging.error(e.message);
    return res.status(500).json({ message: "Something went wrong", data: [] });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;

    await remove(parseInt(blogId));

    return res
      .status(200)
      .json({ message: `Blog with id ${blogId} has been deleted`, data: [] });
  } catch (e) {
    logging.error(e.message);
    return res.status(500).json({ message: "Something went wrong", data: [] });
  }
};
