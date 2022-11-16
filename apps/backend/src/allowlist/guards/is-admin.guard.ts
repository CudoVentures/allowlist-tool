import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggedInGuard } from '../../auth/guards/loggedIn.guard';
import { Allowlist } from '../allowlist.model';
import { AllowlistService } from '../allowlist.service';

@Injectable()
export class IsAdminGuard extends LoggedInGuard implements CanActivate {
  constructor(private allowlistService: AllowlistService) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user, body } = request;

    if (!user || !body) return false;

    const userId = user.id;
    const allowlistId = parseInt(body.id);

    return this.allowlistService
      .findOne(allowlistId)
      .then((allowlist: Allowlist) => allowlist.admin == userId);
  }
}
