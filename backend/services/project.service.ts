import pool from '../config/db';
import { Project } from '../models/project.model';

export const getAllProjects = async (): Promise<Project[]> => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM projects');
    return result.rows;
  } finally {
    client.release();
  }
};

export const getProjectBySlug = async (slug: string): Promise<Project> => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM projects WHERE slug = $1', [slug]);
    return result.rows[0];
  } finally {
    client.release();
  }
};
