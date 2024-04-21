import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    throw new ApiError(401, 'Unauthorized');
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, 'Unauthorized'));
    }
    req.user = user;
    next();
  });
};