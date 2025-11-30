import pool from '../config/db';
import { Admin } from '../models/admin.model';

export const getAdmin = async (): Promise<Admin[]> => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT first_name, last_name, github, email, linkedin, about_me FROM admin');
    return result.rows;
  } finally {
    client.release();
  }
};