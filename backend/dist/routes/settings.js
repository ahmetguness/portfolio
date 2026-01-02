"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
// Get all settings
router.get('/', async (req, res) => {
    try {
        const { rows } = await db_1.default.query('SELECT * FROM settings');
        // Convert rows [{key: 'k', value: 'v'}] to object {k: v}
        const settings = {};
        rows.forEach((row) => {
            settings[row.key] = row.value;
        });
        res.json(settings);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Update settings (Admin only)
router.put('/', auth_1.default, async (req, res) => {
    try {
        const updates = req.body; // Expect { key: value, key2: value2 }
        const keys = Object.keys(updates);
        if (keys.length === 0) {
            return res.status(400).json({ msg: 'No settings provided' });
        }
        // Use a transaction for multiple updates
        const client = await db_1.default.connect();
        try {
            await client.query('BEGIN');
            for (const key of keys) {
                const value = updates[key];
                // Upsert: Insert or Update if exists
                await client.query(`INSERT INTO settings (key, value) 
                     VALUES ($1, $2) 
                     ON CONFLICT (key) 
                     DO UPDATE SET value = EXCLUDED.value`, [key, value]);
            }
            await client.query('COMMIT');
            res.json({ msg: 'Settings updated successfully' });
        }
        catch (err) {
            await client.query('ROLLBACK');
            throw err;
        }
        finally {
            client.release();
        }
    }
    catch (err) {
        console.error("Error updating settings:", err);
        res.status(500).json({ error: err.message });
    }
});
exports.default = router;
