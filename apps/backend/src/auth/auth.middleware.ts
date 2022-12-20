import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: any, res: Response, next: NextFunction) {
    console.log(req._parsedUrl);
    if (req._parsedUrl.pathname.startsWith('/api') && !req.session.user) {
      throw new UnauthorizedException();
    }
    next();
  }
}
