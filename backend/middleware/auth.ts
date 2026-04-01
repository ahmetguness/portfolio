import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Extend Request interface to include user
export interface AuthRequest extends Request {
  user?: any;
}

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const verifyToken = (token: string) => {
    try {
      if (!process.env.JWT_SECRET) throw new Error("CRITICAL: JWT_SECRET setup missing in .env");
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (e: any) {
      console.error('JWT Verification Error:', e.message);
      return null;
    }
  };

  let token = req.cookies.token;
  let decoded = token ? verifyToken(token) : null;

  if (!decoded && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    const headerToken = req.headers.authorization.split(' ')[1];
    decoded = verifyToken(headerToken);
    if (decoded) console.log('Auth Middleware: Used Header Token');
  }

  if (!decoded) {
    if(!token && !req.headers.authorization) {
        // Just fail silently if no auth provided at all, let route handle 401?
        // No, this middleware is for protected routes.
    }
    console.log('Auth Middleware: Failed to verify both Cookie and Header tokens.');
    return res.status(401).json({ msg: 'Token verification failed, authorization denied' });
  }

  req.user = decoded;
  next();
};

export default auth;
