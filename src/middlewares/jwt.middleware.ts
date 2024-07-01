import { Request, Response, NextFunction } from 'express';

export function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
  // Implement JWT middleware logic here
  next();
}