"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
// Get all blogs
router.get('/', async (req, res) => {
    try {
        const { rows } = await db_1.default.query('SELECT * FROM blogs ORDER BY published_at DESC');
        res.json(rows);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Create blog (Admin only)
router.post('/', auth_1.default, async (req, res) => {
    try {
        const { title, short_description, image_url, medium_url, published_at } = req.body;
        const query = `
      INSERT INTO blogs (id, title, short_description, image_url, medium_url, published_at, created_at, updated_at)
      VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING *;
    `;
        const values = [title, short_description, image_url, medium_url, published_at];
        const { rows } = await db_1.default.query(query, values);
        res.status(201).json(rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Update blog (Admin only)
router.put('/:id', auth_1.default, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, short_description, image_url, medium_url, published_at } = req.body;
        const query = `
      UPDATE blogs
      SET title = $1, short_description = $2, image_url = $3, medium_url = $4, published_at = $5, updated_at = NOW()
      WHERE id = $6
      RETURNING *;
    `;
        const values = [title, short_description, image_url, medium_url, published_at, id];
        const { rows } = await db_1.default.query(query, values);
        if (rows.length === 0)
            return res.status(404).json({ msg: 'Blog not found' });
        res.json(rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Delete blog (Admin only)
router.delete('/:id', auth_1.default, async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await db_1.default.query('DELETE FROM blogs WHERE id = $1 RETURNING *', [id]);
        if (rows.length === 0)
            return res.status(404).json({ msg: 'Blog not found' });
        res.json({ msg: 'Blog deleted' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;
