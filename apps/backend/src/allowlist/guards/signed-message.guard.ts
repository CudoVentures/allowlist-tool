import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { verifyNonceMsgSigner } from 'cudosjs';

@Injectable()
export class SignedMessageGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { body } = request;

    if (!body) return false;

    return verifyNonceMsgSigner(
      body.signature,
      body.address,
      body.nonce,
      body.sequence,
      body.accountNumber,
      body.chainId,
    );
  }
}
