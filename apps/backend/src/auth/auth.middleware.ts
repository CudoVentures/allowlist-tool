import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private userService: UserService) { }

    async use(req: any, res: Response, next: NextFunction) {
        // const user = req.session.user;
        // if (req.originalUrl.startsWith('/api') && !user) {
        //   throw new UnauthorizedException();
        // }

        // const userExists = await this.userService.findById(user.id);
        // if (!userExists) {
        //   throw new UnauthorizedException();
        // }
        // auth middleware should be completely rewriten
        next();
    }
}
