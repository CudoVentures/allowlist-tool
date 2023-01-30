import { TwitterUserRepo } from '../repos/twitter_user.repo';
import { TwitterUserJSONValidator } from '../user.types';

export default class TwitterUserEntity {
  twitter_profile_id: string;
  twitter_profile_username: string;
  twitter_access_token: string;
  twitter_refresh_token: string;

  constructor() {
    this.twitter_profile_id = '';
    this.twitter_profile_username = '';
    this.twitter_access_token = '';
    this.twitter_refresh_token = '';
  }

  static toRepo(entity: TwitterUserEntity): TwitterUserRepo {
    if (!entity) {
      return null;
    }

    const repoJson = new TwitterUserRepo();

    repoJson.twitter_profile_id = entity.twitter_profile_id;
    repoJson.twitter_profile_username = entity.twitter_profile_username;
    repoJson.twitter_access_token = entity.twitter_access_token;
    repoJson.twitter_refresh_token = entity.twitter_refresh_token;


    return repoJson;
  }

  static fromRepo(repoJson: TwitterUserRepo): TwitterUserEntity {
    if (!repoJson) {
      return null;
    }

    const entity = new TwitterUserEntity();
    entity.twitter_profile_id =
      repoJson.twitter_profile_id ?? entity.twitter_profile_id;
    entity.twitter_profile_username =
      repoJson.twitter_profile_username ?? entity.twitter_profile_username;
    entity.twitter_access_token =
      repoJson.twitter_access_token ?? entity.twitter_access_token;
    entity.twitter_refresh_token =
      repoJson.twitter_refresh_token ?? entity.twitter_refresh_token;


    return entity;
  }

  static toJson(entity: TwitterUserEntity): TwitterUserJSONValidator {
    if (!entity) {
      return null;
    }

    return {
      twitter_profile_id: entity.twitter_profile_id,
      twitter_profile_username: entity.twitter_profile_username,
      twitter_access_token: entity.twitter_access_token,
      twitter_refresh_token: entity.twitter_refresh_token,
    };
  }

  static fromJson(json: TwitterUserJSONValidator): TwitterUserEntity {
    if (!json) {
      return null;
    }

    const entity = new TwitterUserEntity();
    entity.twitter_profile_id =
      json.twitter_profile_id ?? entity.twitter_profile_id;
    entity.twitter_profile_username =
      json.twitter_profile_username ?? entity.twitter_profile_username;
    entity.twitter_access_token =
      json.twitter_access_token ?? entity.twitter_access_token;
    entity.twitter_refresh_token =
      json.twitter_refresh_token ?? entity.twitter_refresh_token;

    return entity;
  }
}