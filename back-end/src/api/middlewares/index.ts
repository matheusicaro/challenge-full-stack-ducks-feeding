import { Request, Response, NextFunction } from 'express';
import Security from '../../config/security';

/**
 * Function Middleware to check if token entered is expired and not
 *
 * @param  {Request} req
 * @param  {Request} res
 * @param  {NextFunction} next
 * @returns {void | Response}
 */
export const verifyAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | void => {
  const token = req.header('x-api-token');

  if (!token || Security.isTokenExpired(token)) return res.status(401).json({});

  return next();
};

const Middleware = {
  verifyAuthentication
};

export default Middleware;
