import express, { Request, Response } from 'express';
import db from '../db';
import auth from '../middleware/auth';

const router = express.Router();

interface ProjectBody {
  title: string;
  short_description: string;
  image_url: string;
  tech_tags: string | string[];
  github_url: string;
  live_url: string;
  featured: boolean;
}

// Get all projects
router.get('/', async (req: Request, res: Response) => {
    try {
        const { rows } = await db.query('SELECT * FROM projects ORDER BY created_at DESC');
        res.json(rows);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Get featured projects
router.get('/featured', async (req: Request, res: Response) => {
    try {
        const { rows } = await db.query('SELECT * FROM projects WHERE featured = true ORDER BY created_at DESC');
        res.json(rows);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Create project (Admin only)
router.post('/', auth, async (req: Request, res: Response) => {
    try {
        const { title, short_description, image_url, tech_tags, github_url, live_url, featured }: ProjectBody = req.body;

        // Process tech_tags: string -> array[text]
        let tagsArray: string[] = [];
        if (typeof tech_tags === 'string') {
            tagsArray = tech_tags.split(',').map(t => t.trim()).filter(t => t.length > 0);
        } else if (Array.isArray(tech_tags)) {
            tagsArray = tech_tags;
        }

        const query = `
      INSERT INTO projects (id, title, short_description, image_url, tech_tags, github_url, live_url, featured, created_at, updated_at)
      VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
      RETURNING *;
    `;
        const values = [title, short_description, image_url, tagsArray, github_url, live_url, featured || false];

        const { rows } = await db.query(query, values);
        res.status(201).json(rows[0]);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Update project (Admin only)
router.put('/:id', auth, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, short_description, image_url, tech_tags, github_url, live_url, featured }: ProjectBody = req.body;

        let tagsArray: string[] = [];
        if (typeof tech_tags === 'string') {
            tagsArray = tech_tags.split(',').map(t => t.trim()).filter(t => t.length > 0);
        } else if (Array.isArray(tech_tags)) {
            tagsArray = tech_tags;
        }

        const query = `
      UPDATE projects 
      SET title = $1, short_description = $2, image_url = $3, tech_tags = $4, github_url = $5, live_url = $6, featured = $7, updated_at = NOW()
      WHERE id = $8
      RETURNING *;
    `;
        const values = [title, short_description, image_url, tagsArray, github_url, live_url, featured, id];

        const { rows } = await db.query(query, values);
        if (rows.length === 0) return res.status(404).json({ msg: 'Project not found' });
        res.json(rows[0]);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Delete project (Admin only)
router.delete('/:id', auth, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { rows } = await db.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
        if (rows.length === 0) return res.status(404).json({ msg: 'Project not found' });
        res.json({ msg: 'Project deleted' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
