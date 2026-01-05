"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const router = express_1.default.Router();
router.post('/login', (req, res) => {
    const { password } = req.body;
    const salt = process.env.ADMIN_SALT;
    const hash = process.env.ADMIN_HASH;
    if (!salt || !hash) {
        console.error("Missing ADMIN_SALT or ADMIN_HASH in .env");
        return res.status(500).json({ msg: 'Server misconfiguration' });
    }
    const verifyHash = crypto_1.default.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    if (verifyHash === hash) {
        // Use proper typing/check for secret
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error("JWT_SECRET missing");
            return res.status(500).json({ msg: 'Server misconfiguration' });
        }
        const token = jsonwebtoken_1.default.sign({ role: 'admin' }, secret, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 3600000 // 1 hour
        });
        return res.json({ success: true, token });
    }
    return res.status(401).json({ msg: 'Invalid credentials' });
});
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ success: true });
});
// Use AuthRequest type for protected route
router.get('/me', auth_1.default, (req, res) => {
    res.json({ user: req.user });
});
exports.default = router;
