import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import blogRoutes from './routes/blogs';
import settingsRoutes from './routes/settings';
import proxyRoutes from './routes/proxy';
import db from './db';


dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/proxy', proxyRoutes);

app.listen(PORT, async () => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS settings (
                key VARCHAR(255) PRIMARY KEY,
                value TEXT
            );
        `);
        console.log('Settings table ensured');
    } catch (err) {
        console.error('Failed to initialize DB:', err);
    }
    console.log(`Server running on port ${PORT}`);
});
