import { NOT_EXISTS_INT } from '../../common/utils';
import { DiscordUserRepo } from '../repos/discord_user.repo';
import { DiscordUserJSONValidator } from '../user.types';

export default class DiscordUserEntity {
  discord_profile_id: string;
  discord_profile_username: string;
  discord_access_token: string;
  discord_refresh_token: string;

  constructor() {
    this.discord_profile_id = '';
    this.discord_profile_username = '';
    this.discord_access_token = '';
    this.discord_refresh_token = '';
  }


  static toRepo(entity: DiscordUserEntity): DiscordUserRepo {
    if (!entity) {
      return null;
    }

    const repoJson = new DiscordUserRepo();

    repoJson.discord_profile_id = entity.discord_profile_id;
    repoJson.discord_profile_username = entity.discord_profile_username;
    repoJson.discord_access_token = entity.discord_access_token;
    repoJson.discord_refresh_token = entity.discord_refresh_token;

    return repoJson;
  }

  static fromRepo(repoJson: DiscordUserRepo): DiscordUserEntity {
    if (!repoJson) {
      return null;
    }

    const entity = new DiscordUserEntity();
    entity.discord_profile_id =
      repoJson.discord_profile_id ?? entity.discord_profile_id;
    entity.discord_profile_username =
      repoJson.discord_profile_username ?? entity.discord_profile_username;
    entity.discord_access_token =
      repoJson.discord_access_token ?? entity.discord_access_token;
    entity.discord_refresh_token =
      repoJson.discord_refresh_token ?? entity.discord_refresh_token;

    return entity;
  }

  static toJson(entity: DiscordUserEntity): DiscordUserJSONValidator {
    if (!entity) {
      return null;
    }

    return {
      discord_profile_id: entity.discord_profile_id,
      discord_profile_username: entity.discord_profile_username,
      discord_access_token: entity.discord_access_token,
      discord_refresh_token: entity.discord_refresh_token,
    };
  }

  static fromJson(json: DiscordUserJSONValidator): DiscordUserEntity {
    if (!json) {
      return null;
    }

    const entity = new DiscordUserEntity();
    entity.discord_profile_id =
      json.discord_profile_id ?? entity.discord_profile_id;
    entity.discord_profile_username =
      json.discord_profile_username ?? entity.discord_profile_username;
    entity.discord_access_token =
      json.discord_access_token ?? entity.discord_access_token;
    entity.discord_refresh_token =
      json.discord_refresh_token ?? entity.discord_refresh_token;

    return entity;
  }
}