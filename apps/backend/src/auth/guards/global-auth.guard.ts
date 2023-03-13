import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class GlobalGuard implements CanActivate {

    constructor(private reflector: Reflector) { }
    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.get<boolean>('isPublic', context.getClass());
        if (isPublic) {
            return true
        }
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-api-key']
        if (!apiKey || apiKey !== process.env.APP_API_KEY) {
            throw new UnauthorizedException()
        }
        return true
    }
}
