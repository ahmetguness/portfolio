import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid "url" query parameter' });
    }

    try {
        const response = await axios.get(url, {
            responseType: 'stream',
            headers: {
                // Ensure we pretend to be a browser to avoid some strict blocks
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        // Forward headers related to content
        if (response.headers['content-type']) {
            res.setHeader('Content-Type', response.headers['content-type']);
        }
        if (response.headers['content-length']) {
            res.setHeader('Content-Length', response.headers['content-length']);
        }

        response.data.pipe(res);
    } catch (error: any) {
        console.error('Proxy Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch resource' });
    }
});

export default router;
