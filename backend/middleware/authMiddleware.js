import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if (token) {

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user data without password
            req.user = await User.findById(decoded.userId).select('-password');

            // Call next middleware
            next();

        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, invalid token');

        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

export { protect };