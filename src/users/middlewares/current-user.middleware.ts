import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { User } from '../user.entity';
import { UsersService } from '../users.service';

declare global {
  // tell typescript that we are adding a new property to the Request interface
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.session?.userId) {
      const user = await this.userService.findOne(req.session.userId);
      req.currentUser = user;
    }

    next();
  }
}
