import jwt from 'jsonwebtoken';
import { keys } from '../index.mjs';

export const authMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                message: 'No authorization'
            });
        }

       const decoded = jwt.verify(token, keys.JWT_SECRET);
       req.user = decoded;
       next();
    } catch (err) {
        res.status(401).json({
            message: 'No authorization'
        });
    }
};