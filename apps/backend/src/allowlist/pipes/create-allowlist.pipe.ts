import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

import AppRoutes from '../../../../frontend/src/features/app-routes/entities/AppRoutes';
import { TwitterService } from '../../twitter/twitter.service';
import { CreateAllowlistDto } from '../dto/create-allowlist.dto';

@Injectable()
export class CreateAllowlistPipe implements PipeTransform {
  constructor(private twitterService: TwitterService) { }
  async transform(value: CreateAllowlistDto, metadata: ArgumentMetadata) {
    if (
      value.twitter_account_to_follow ||
      value.tweet_to_like ||
      value.tweet_to_retweet ||
      value.discord_invite_link
    ) {

      if (value.twitter_account) {
        const isValid = await this.twitterService.isExistingTwitterAcc(value.twitter_account)
        if (!isValid) {
          throw new BadRequestException('Invalid Allowlist Twitter Account');
        }
        if (value.twitter_account && !value.twitter_account.startsWith('@')) {
          value.twitter_account = `@${value.twitter_account}`
        }
      }

      if (value.twitter_account_to_follow) {
        const isValid = await this.twitterService.isExistingTwitterAcc(value.twitter_account_to_follow)
        if (!isValid) {
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
