import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { AllowlistService } from '../allowlist.service';

@Injectable()
export class CanEditGuard implements CanActivate {
    constructor(private allowlistService: AllowlistService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { session, params } = request;

        if (!session || !params) return false;

        const allowlistId = parseInt(params.id);

        const allowlistFound = await this.allowlistService.findOne(allowlistId)

        if (!allowlistFound) {
            throw new NotFoundException('Allowlist not found')
        }

        if (allowlistFound.users.length) {
            throw new ForbiddenException('Cannot edit if users already joined')
        }

        return true
    }
}
