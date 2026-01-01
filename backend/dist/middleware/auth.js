"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const auth = (req, res, next) => {
    const verifyToken = (token) => {
        try {
            return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
        }
        catch (e) {
            console.error('JWT Verification Error:', e.message);
            return null;
        }
    };
    let token = req.cookies.token;
    let decoded = token ? verifyToken(token) : null;
    if (!decoded && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        const headerToken = req.headers.authorization.split(' ')[1];
        decoded = verifyToken(headerToken);
        if (decoded)
            console.log('Auth Middleware: Used Header Token');
    }
    if (!decoded) {
        if (!token && !req.headers.authorization) {
            // Just fail silently if no auth provided at all, let route handle 401?
            // No, this middleware is for protected routes.
        }
        console.log('Auth Middleware: Failed to verify both Cookie and Header tokens.');
        return res.status(401).json({ msg: 'Token verification failed, authorization denied' });
    }
    req.user = decoded;
    next();
};
exports.default = auth;
