import { getRepository } from "typeorm";
import { IBlogPayload } from "../interfaces/blog";
import { BlogEntity } from "../entities/blog";

export const create = async (payload: IBlogPayload) => {
  const repo = getRepository(BlogEntity);

  return await repo.save({
    ...payload,
  });
};

export const findAll = async () => {
  const repo = getRepository(BlogEntity);

  return await repo.find();
};

export const findOne = async (id: number) => {
  const repo = getRepository(BlogEntity);

  return await repo.findOne({ where: { id } });
};

export const remove = async (id: number) => {
  const repo = getRepository(BlogEntity);

  const blog = await findOne(id);

  if (!blog) throw new Error(`Blog with id ${id} not found`);

  return await repo.remove(blog);
};

export const update = async (id: number, payload: Partial<IBlogPayload>) => {
  const repo = getRepository(BlogEntity);

  const blog = await findOne(id);

  if (!blog) throw new Error(`Blog with id ${id} not found`);

  Object.assign(blog, payload);

  return await repo.save(blog);
};
