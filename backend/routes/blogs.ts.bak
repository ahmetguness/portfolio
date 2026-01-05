import express, { Request, Response } from 'express';
import db from '../db';
import auth from '../middleware/auth';

const router = express.Router();

interface BlogBody {
  title: string;
  short_description: string;
  image_url: string;
  medium_url: string;
  published_at: string;
}

// Get all blogs
router.get('/', async (req: Request, res: Response) => {
    try {
        const { rows } = await db.query('SELECT * FROM blogs ORDER BY published_at DESC');
        res.json(rows);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Create blog (Admin only)
router.post('/', auth, async (req: Request, res: Response) => {
    try {
        const { title, short_description, image_url, medium_url, published_at }: BlogBody = req.body;

        const query = `
      INSERT INTO blogs (id, title, short_description, image_url, medium_url, published_at, created_at, updated_at)
      VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING *;
    `;
        const values = [title, short_description, image_url, medium_url, published_at];

        const { rows } = await db.query(query, values);
        res.status(201).json(rows[0]);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Update blog (Admin only)
router.put('/:id', auth, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, short_description, image_url, medium_url, published_at }: BlogBody = req.body;

        const query = `
      UPDATE blogs
      SET title = $1, short_description = $2, image_url = $3, medium_url = $4, published_at = $5, updated_at = NOW()
      WHERE id = $6
      RETURNING *;
    `;
        const values = [title, short_description, image_url, medium_url, published_at, id];

        const { rows } = await db.query(query, values);
        if (rows.length === 0) return res.status(404).json({ msg: 'Blog not found' });
        res.json(rows[0]);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Delete blog (Admin only)
router.delete('/:id', auth, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { rows } = await db.query('DELETE FROM blogs WHERE id = $1 RETURNING *', [id]);
        if (rows.length === 0) return res.status(404).json({ msg: 'Blog not found' });
        res.json({ msg: 'Blog deleted' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
