import { NOT_EXISTS_INT } from '../../common/utils';
import { UserRepo } from '../repos/user.repo';
import { UserJSONValidator } from '../user.types';

export default class UserEntity {
  address: string;
  twitter_profile_id: string;
  discord_profile_id: string;

  constructor() {
    this.address = '';
    this.twitter_profile_id = '';;
    this.discord_profile_id = '';
  }

  static toRepo(entity: UserEntity): UserRepo {
    if (!entity) {
      return null;
    }

    const repoJson = new UserRepo();
    repoJson.address = entity.address;
    repoJson.twitter_profile_id = entity.twitter_profile_id;
    repoJson.discord_profile_id = entity.discord_profile_id;

    return repoJson;
  }

  static fromRepo(repoJson: UserRepo): UserEntity {
    if (!repoJson) {
      return null;
    }

    const entity = new UserEntity();
    entity.address = repoJson.address ?? entity.address;
    entity.twitter_profile_id =
      repoJson.twitter_profile_id ?? entity.twitter_profile_id;
    entity.discord_profile_id =
      repoJson.discord_profile_id ?? entity.discord_profile_id;

    return entity;
  }

  static toJson(entity: UserEntity): UserJSONValidator {
    if (!entity) {
      return null;
    }

    return {
      address: entity.address,
      twitter_profile_id: entity.twitter_profile_id,
      discord_profile_id: entity.discord_profile_id,
    };
  }

  static fromJson(json: UserJSONValidator): UserEntity {
    if (!json) {
      return null;
    }

    const entity = new UserEntity();
    entity.address = json.address ?? entity.address;
    entity.twitter_profile_id =
      json.twitter_profile_id ?? entity.twitter_profile_id;
    entity.discord_profile_id =
      json.discord_profile_id ?? entity.discord_profile_id;

    return entity;
  }
}
