import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

export class LoggedInGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.session.user;
    const address = req.query.userAddress;
    console.log(user);
    return !!user && address === AuthService.userAddress;
  }
}
