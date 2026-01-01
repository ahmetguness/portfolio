import express, { Request, Response } from 'express';
import auth, { AuthRequest } from '../middleware/auth';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const router = express.Router();

router.post('/login', (req: Request, res: Response) => {
    const { password } = req.body;

    const salt = process.env.ADMIN_SALT;
    const hash = process.env.ADMIN_HASH;

    if (!salt || !hash) {
        console.error("Missing ADMIN_SALT or ADMIN_HASH in .env");
        return res.status(500).json({ msg: 'Server misconfiguration' });
    }

    const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    if (verifyHash === hash) {
        // Use proper typing/check for secret
        const secret = process.env.JWT_SECRET;
        if(!secret) {
             console.error("JWT_SECRET missing");
             return res.status(500).json({msg: 'Server misconfiguration'});
        }
        
        const token = jwt.sign({ role: 'admin' }, secret, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Set to true in production with HTTPS
            sameSite: 'lax', // Needed for localhost to localhost
            maxAge: 3600000 // 1 hour
        });
        return res.json({ success: true, token });
    }
    return res.status(401).json({ msg: 'Invalid credentials' });
});

router.post('/logout', (req: Request, res: Response) => {
    res.clearCookie('token');
    res.json({ success: true });
});

// Use AuthRequest type for protected route
router.get('/me', auth, (req: AuthRequest, res: Response) => {
    res.json({ user: req.user });
});

export default router;
