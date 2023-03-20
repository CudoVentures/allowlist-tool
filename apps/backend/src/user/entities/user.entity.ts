import { NOT_EXISTS_INT } from '../../common/utils';
import { UserRepo } from '../repos/user.repo';
import { UserJSONValidator } from '../user.types';

export default class UserEntity {
    id: number;
    address: string;
    email: string;
    twitter_profile_id: string;
    twitter_profile_username: string;
    twitter_access_token: string;
    twitter_refresh_token: string;
    discord_profile_id: string;
    discord_profile_username: string;
    discord_access_token: string;
    discord_refresh_token: string;

    constructor() {
        this.id = NOT_EXISTS_INT;
        this.address = '';
        this.email = '';
        this.twitter_profile_id = '';
        this.twitter_profile_username = '';
        this.twitter_access_token = '';
        this.twitter_refresh_token = '';
        this.discord_profile_id = '';
        this.discord_profile_username = '';
        this.discord_access_token = '';
        this.discord_refresh_token = '';
    }

    isNew(): boolean {
        return this.id === NOT_EXISTS_INT;
    }

    static toRepo(entity: UserEntity): UserRepo {
        if (!entity) {
            return null;
        }

        const repoJson = new UserRepo();
        if (!entity.isNew) {
            repoJson.id = entity.id;
        }
        repoJson.address = entity.address;
        repoJson.email = entity.email;
        repoJson.twitter_profile_id = entity.twitter_profile_id;
        repoJson.twitter_profile_username = entity.twitter_profile_username;
        repoJson.twitter_access_token = entity.twitter_access_token;
        repoJson.twitter_refresh_token = entity.twitter_refresh_token;
        repoJson.discord_profile_id = entity.discord_profile_id;
        repoJson.discord_profile_username = entity.discord_profile_username;
        repoJson.discord_access_token = entity.discord_access_token;
        repoJson.discord_refresh_token = entity.discord_refresh_token;

        return repoJson;
    }

    static fromRepo(repoJson: UserRepo): UserEntity {
        if (!repoJson) {
            return null;
        }

        const entity = new UserEntity();
        entity.id = repoJson.id ?? entity.id;
        entity.address = repoJson.address ?? entity.address;
        entity.email = repoJson.email ?? entity.email;
        entity.twitter_profile_id = repoJson.twitter_profile_id ?? entity.twitter_profile_id;
        entity.twitter_profile_username = repoJson.twitter_profile_username ?? entity.twitter_profile_username;
        entity.twitter_access_token = repoJson.twitter_access_token ?? entity.twitter_access_token;
        entity.twitter_refresh_token = repoJson.twitter_refresh_token ?? entity.twitter_refresh_token;
        entity.discord_profile_id = repoJson.discord_profile_id ?? entity.discord_profile_id;
        entity.discord_profile_username = repoJson.discord_profile_username ?? entity.discord_profile_username;
        entity.discord_access_token = repoJson.discord_access_token ?? entity.discord_access_token;
        entity.discord_refresh_token = repoJson.discord_refresh_token ?? entity.discord_refresh_token;

        return entity;
    }

    static toJson(entity: UserEntity): UserJSONValidator {
        if (!entity) {
            return null;
        }

        return {
            id: entity.id,
            address: entity.address,
            email: entity.email,
            twitter_profile_id: entity.twitter_profile_id,
            twitter_profile_username: entity.twitter_profile_username,
            twitter_access_token: entity.twitter_access_token,
            twitter_refresh_token: entity.twitter_refresh_token,
            discord_profile_id: entity.discord_profile_id,
            discord_profile_username: entity.discord_profile_username,
            discord_access_token: entity.discord_access_token,
            discord_refresh_token: entity.discord_refresh_token,
        };
    }

    static fromJson(json: UserJSONValidator): UserEntity {
        if (!json) {
            return null;
        }

        const entity = new UserEntity();
        entity.id = json.id ?? entity.id;
        entity.address = json.address ?? entity.address;
        entity.email = json.email ?? entity.email;
        entity.twitter_profile_id = json.twitter_profile_id ?? entity.twitter_profile_id;
        entity.twitter_profile_username = json.twitter_profile_username ?? entity.twitter_profile_username;
        entity.twitter_access_token = json.twitter_access_token ?? entity.twitter_access_token;
        entity.twitter_refresh_token = json.twitter_refresh_token ?? entity.twitter_refresh_token;
        entity.discord_profile_id = json.discord_profile_id ?? entity.discord_profile_id;
        entity.discord_profile_username = json.discord_profile_username ?? entity.discord_profile_username;
        entity.discord_access_token = json.discord_access_token ?? entity.discord_access_token;
        entity.discord_refresh_token = json.discord_refresh_token ?? entity.discord_refresh_token;

        return entity;
    }
}
