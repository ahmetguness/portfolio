import { Request, Response } from 'express';
import { getAllBlogs, getBlogBySlug } from '../services/blog.service';

export const getAllBlogsController = async (req: Request, res: Response) => {
  try {
    const blogs = await getAllBlogs();
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving blogs');
  }
};

export const getBlogBySlugController = async (req: Request, res: Response) => {
  try {
    const blog = await getBlogBySlug(req.params.slug);
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).send('Blog not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving blog');
  }
};
