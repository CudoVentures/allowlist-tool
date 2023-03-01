import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

import AppRoutes from '../../../../frontend/src/features/app-routes/entities/AppRoutes';
import { CreateAllowlistDto } from '../dto/create-allowlist.dto';

@Injectable()
export class CreateAllowlistPipe implements PipeTransform {
  transform(value: CreateAllowlistDto, metadata: ArgumentMetadata) {
    if (
      value.twitter_account_to_follow ||
      value.tweet_to_like ||
      value.tweet_to_retweet ||
      value.discord_invite_link
    ) {
      const routes = Object.values(AppRoutes).map((route) => route.slice(1));
      if (routes.includes(value.url)) {
        throw new BadRequestException('Invalid allowlist url');
      }
      return value;
    }

    throw new BadRequestException('Minimum required allowlist criteria not met');
  }
}
