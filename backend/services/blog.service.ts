import pool from '../config/db';
import { Blog } from '../models/blog.model';

export const getAllBlogs = async (): Promise<Blog[]> => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM blogs');
    return result.rows;
  } finally {
    client.release();
  }
};

export const getBlogBySlug = async (slug: string): Promise<Blog> => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM blogs WHERE slug = $1', [slug]);
    return result.rows[0];
  } finally {
    client.release();
  }
};
