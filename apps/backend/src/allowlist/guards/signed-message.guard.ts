import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { verifyNonceMsgSigner } from '/Users/georgitsonev/Desktop/CUDOS/cudosjs/src/utils/nonce';
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
      body.message,
      body.sequence,
      body.account_number,
      body.chain_id,
    );
  }
}
