import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

console.log(`DB Config: User: ${process.env.DB_USER}, Host: ${process.env.DB_HOST}, DB: ${process.env.DB_NAME}, Port: ${process.env.DB_PORT}, Pass: ******`);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD || undefined,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

export default pool;
