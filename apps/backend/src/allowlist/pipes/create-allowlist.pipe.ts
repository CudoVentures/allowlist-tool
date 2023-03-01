import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

import AppRoutes from '../../../../frontend/src/features/app-routes/entities/AppRoutes';
import { AllowlistService } from '../allowlist.service';
import { CreateAllowlistDto } from '../dto/create-allowlist.dto';

@Injectable()
export class CreateAllowlistPipe implements PipeTransform {
  constructor(private allowlistService: AllowlistService) { }
  async transform(value: CreateAllowlistDto, metadata: ArgumentMetadata) {
    if (
      value.twitter_account_to_follow ||
      value.tweet_to_like ||
      value.tweet_to_retweet ||
      value.discord_invite_link
    ) {

      if (value.twitter_account && !value.twitter_account.startsWith('@')) {
        value.twitter_account = `@${value.twitter_account}`
      }

      if (value.twitter_account_to_follow) {
        const isValidAccountToFollow = await this.allowlistService.getTwitterAccountID(value.twitter_account_to_follow)
        if (!isValidAccountToFollow) {
          throw new BadRequestException('Invalid Twitter Account To Follow');
        }
        if (!value.twitter_account_to_follow.startsWith('@')) {
          value.twitter_account_to_follow = `@${value.twitter_account_to_follow}`
        }
      }

      const routes = Object.values(AppRoutes).map((route) => route.slice(1));
      if (routes.includes(value.url)) {
        throw new BadRequestException('Invalid allowlist url');
      }
      return value;
    }

    throw new BadRequestException('Minimum required allowlist criteria not met');
  }
}
