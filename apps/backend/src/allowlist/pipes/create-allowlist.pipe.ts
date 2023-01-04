import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import AppRoutes from 'apps/frontend/src/features/app-routes/entities/AppRoutes';
import { CreateAllowlistDto } from '../dto/create-allowlist.dto';

@Injectable()
export class CreateAllowlistPipe implements PipeTransform {
  transform(value: CreateAllowlistDto, metadata: ArgumentMetadata) {
    if (
      (!value.twitter_account_to_follow &&
        !value.tweet_to_like &&
        !value.tweet_to_retweet &&
        !value.discord_invite_link &&
        !value.server_role) ||
      (!value.discord_invite_link && value.server_role)
    ) {
      throw new BadRequestException('Missing allowlist criteria');
    }

    const routes = Object.values(AppRoutes).map((route) => route.slice(1));
    if (routes.includes(value.url)) {
      throw new BadRequestException('Invalid allowlist url');
    }

    return value;
  }
}
