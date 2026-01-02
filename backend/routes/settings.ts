import express, { Request, Response } from 'express';
import db from '../db';
import auth from '../middleware/auth';

const router = express.Router();

// Get all settings
router.get('/', async (req: Request, res: Response) => {
    try {
        const { rows } = await db.query('SELECT * FROM settings');
        // Convert rows [{key: 'k', value: 'v'}] to object {k: v}
        const settings: Record<string, string> = {};
        rows.forEach((row: any) => {
            settings[row.key] = row.value;
        });
        res.json(settings);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Update settings (Admin only)
router.put('/', auth, async (req: Request, res: Response) => {
    try {
        const updates = req.body; // Expect { key: value, key2: value2 }
        const keys = Object.keys(updates);

        if (keys.length === 0) {
            return res.status(400).json({ msg: 'No settings provided' });
        }

        // Use a transaction for multiple updates
        const client = await db.connect();
        try {
            await client.query('BEGIN');
            for (const key of keys) {
                const value = updates[key];
                // Upsert: Insert or Update if exists
                await client.query(
                    `INSERT INTO settings (key, value) 
                     VALUES ($1, $2) 
                     ON CONFLICT (key) 
                     DO UPDATE SET value = EXCLUDED.value`,
                    [key, value]
                );
            }
            await client.query('COMMIT');
            res.json({ msg: 'Settings updated successfully' });
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    } catch (err: any) {
        console.error("Error updating settings:", err);
        res.status(500).json({ error: err.message });
    }
});

export default router;
