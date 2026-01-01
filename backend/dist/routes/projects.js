"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
// Get all projects
router.get('/', async (req, res) => {
    try {
        const { rows } = await db_1.default.query('SELECT * FROM projects ORDER BY created_at DESC');
        res.json(rows);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Get featured projects
router.get('/featured', async (req, res) => {
    try {
        const { rows } = await db_1.default.query('SELECT * FROM projects WHERE featured = true ORDER BY created_at DESC');
        res.json(rows);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Create project (Admin only)
router.post('/', auth_1.default, async (req, res) => {
    try {
        const { title, short_description, image_url, tech_tags, github_url, live_url, featured } = req.body;
        // Process tech_tags: string -> array[text]
        let tagsArray = [];
        if (typeof tech_tags === 'string') {
            tagsArray = tech_tags.split(',').map(t => t.trim()).filter(t => t.length > 0);
        }
        else if (Array.isArray(tech_tags)) {
            tagsArray = tech_tags;
        }
        const query = `
      INSERT INTO projects (id, title, short_description, image_url, tech_tags, github_url, live_url, featured, created_at, updated_at)
      VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
      RETURNING *;
    `;
        const values = [title, short_description, image_url, tagsArray, github_url, live_url, featured || false];
        const { rows } = await db_1.default.query(query, values);
        res.status(201).json(rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Update project (Admin only)
router.put('/:id', auth_1.default, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, short_description, image_url, tech_tags, github_url, live_url, featured } = req.body;
        let tagsArray = [];
        if (typeof tech_tags === 'string') {
            tagsArray = tech_tags.split(',').map(t => t.trim()).filter(t => t.length > 0);
        }
        else if (Array.isArray(tech_tags)) {
            tagsArray = tech_tags;
        }
        const query = `
      UPDATE projects 
      SET title = $1, short_description = $2, image_url = $3, tech_tags = $4, github_url = $5, live_url = $6, featured = $7, updated_at = NOW()
      WHERE id = $8
      RETURNING *;
    `;
        const values = [title, short_description, image_url, tagsArray, github_url, live_url, featured, id];
        const { rows } = await db_1.default.query(query, values);
        if (rows.length === 0)
            return res.status(404).json({ msg: 'Project not found' });
        res.json(rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Delete project (Admin only)
router.delete('/:id', auth_1.default, async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await db_1.default.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
        if (rows.length === 0)
            return res.status(404).json({ msg: 'Project not found' });
        res.json({ msg: 'Project deleted' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;
