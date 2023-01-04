import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AllowlistService } from '../allowlist.service';
import AllowlistEntity from '../entities/allowlist.entity';

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(private allowlistService: AllowlistService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { session, params } = request;

    if (!session || !params) return false;

    const allowlistId = parseInt(params.id);

    return this.allowlistService
      .findOne(allowlistId)
      .then(
        (allowlistEnity: AllowlistEntity) =>
          allowlistEnity.admin === session.user.address,
      );
  }
}
