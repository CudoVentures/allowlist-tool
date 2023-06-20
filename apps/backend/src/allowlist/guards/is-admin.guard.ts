import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AUTH_API_MSGS } from '../../../../common/interfaces';
import { AllowlistService } from '../allowlist.service';
import AllowlistEntity from '../entities/allowlist.entity';

@Injectable()
export class IsAdminGuard implements CanActivate {
    constructor(private allowlistService: AllowlistService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { session, params } = request;

        if (!session || !params) return false;

        if (!session.user || !session.user.address) {
            throw new UnauthorizedException(AUTH_API_MSGS.NoUserSession)
        }
        const allowlistId = parseInt(params.id);

        return this.allowlistService
            .findOne(allowlistId)
            .then(
                (allowlistEnity: AllowlistEntity) => allowlistEnity.admin === session.user.address,
            );
    }
}
