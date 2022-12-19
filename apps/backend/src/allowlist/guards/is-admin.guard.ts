import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { LoggedInGuard } from '../../auth/guards/loggedIn.guard';
import { AllowlistService } from '../allowlist.service';
import AllowlistEntity from '../entities/allowlist.entity';

@Injectable()
export class IsAdminGuard extends LoggedInGuard implements CanActivate {
  constructor(private allowlistService: AllowlistService) {
    super();
  }

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
