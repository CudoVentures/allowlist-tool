import { NOT_EXISTS_INT } from '../../common/utils';
import { AllowlistJSONValidator } from '../allowlist.types';
import { AllowlistRepo } from '../repos/allowlist.repo';

export default class AllowlistEntity {
    id: number;
    admin: string;
    users: string[];
    name: string;
    url: string;
    description: string;
    cosmos_chain_id: string;
    website: string;
    twitter_account: string;
    discord_url: string;
    end_date: Date;
    image: string;
    banner_image: string;
    twitter_account_to_follow: string;
    tweet_to_like: string;
    tweet_to_retweet: string;
    discord_invite_link: string;
    server_role: string;
    require_email: boolean;

    constructor() {
        this.id = NOT_EXISTS_INT;
        this.admin = '';
        this.users = [];
        this.name = '';
        this.url = '';
        this.description = '';
        this.cosmos_chain_id = '';
        this.website = '';
        this.twitter_account = '';
        this.discord_url = '';
        this.end_date = new Date();
        this.image = '';
        this.banner_image = '';
        this.twitter_account_to_follow = '';
        this.tweet_to_like = '';
        this.tweet_to_retweet = '';
        this.discord_invite_link = '';
        this.server_role = '';
        this.require_email = false;
    }

    isNew(): boolean {
        return this.id === NOT_EXISTS_INT;
    }

    static toRepo(entity: AllowlistEntity): AllowlistRepo {
        if (!entity) {
            return null;
        }

        const repoJson = new AllowlistRepo();
        if (!entity.isNew) {
            repoJson.id = entity.id;
        }
        repoJson.name = entity.name;
        repoJson.admin = entity.admin;
        repoJson.users = entity.users;
        repoJson.url = entity.url;
        repoJson.description = entity.description;
        repoJson.cosmos_chain_id = entity.cosmos_chain_id;
        repoJson.website = entity.website;
        repoJson.twitter_account = entity.twitter_account;
        repoJson.discord_url = entity.discord_url;
        repoJson.end_date = entity.end_date;
        repoJson.image = entity.image;
        repoJson.banner_image = entity.banner_image;
        repoJson.twitter_account_to_follow = entity.twitter_account_to_follow;
        repoJson.tweet_to_like = entity.tweet_to_like;
        repoJson.tweet_to_retweet = entity.tweet_to_like;
        repoJson.discord_invite_link = entity.discord_invite_link;
        repoJson.server_role = entity.server_role;
        repoJson.require_email = entity.require_email;

        return repoJson;
    }

    static fromRepo(repoJson: AllowlistRepo): AllowlistEntity {
        if (!repoJson) {
            return null;
        }

        const entity = new AllowlistEntity();
        entity.id = repoJson.id ?? entity.id;
        entity.name = repoJson.name ?? entity.name;
        entity.admin = repoJson.admin ?? entity.admin;
        entity.users = repoJson.users ?? entity.users;
        entity.url = repoJson.url ?? entity.url;
        entity.description = repoJson.description ?? entity.description;
        entity.cosmos_chain_id = repoJson.cosmos_chain_id ?? entity.cosmos_chain_id;
        entity.website = repoJson.website ?? entity.website;
        entity.twitter_account = repoJson.twitter_account ?? entity.twitter_account;
        entity.discord_url = repoJson.discord_url ?? entity.discord_url;
        entity.end_date = repoJson.end_date ?? entity.end_date;
        entity.image = repoJson.image ?? entity.image;
        entity.banner_image = repoJson.banner_image ?? entity.banner_image;
        entity.twitter_account_to_follow = repoJson.twitter_account_to_follow ?? entity.twitter_account_to_follow;
        entity.tweet_to_like = repoJson.tweet_to_like ?? entity.tweet_to_like;
        entity.tweet_to_retweet = repoJson.tweet_to_retweet ?? entity.tweet_to_retweet;
        entity.discord_invite_link = repoJson.discord_invite_link ?? entity.discord_invite_link;
        entity.server_role = repoJson.server_role ?? entity.server_role;
        entity.require_email = repoJson.require_email ?? entity.require_email;

        return entity;
    }

    static toJson(entity: AllowlistEntity): AllowlistJSONValidator {
        if (!entity) {
            return null;
        }

        return {
            id: entity.id,
            admin: entity.admin,
            users: entity.users,
            name: entity.name,
            url: entity.url,
            description: entity.description,
            cosmos_chain_id: entity.cosmos_chain_id,
            website: entity.website,
            twitter_account: entity.twitter_account,
            discord_url: entity.discord_url,
            end_date: entity.end_date,
            image: entity.image,
            banner_image: entity.banner_image,
            twitter_account_to_follow: entity.twitter_account_to_follow,
            tweet_to_like: entity.tweet_to_like,
            tweet_to_retweet: entity.tweet_to_retweet,
            discord_invite_link: entity.discord_invite_link,
            server_role: entity.server_role,
            require_email: entity.require_email,
        };
    }

    static fromJson(json: AllowlistJSONValidator): AllowlistEntity {
        if (!json) {
            return null;
        }

        const entity = new AllowlistEntity();
        entity.id = json.id ?? entity.id;
        entity.name = json.name ?? entity.name;
        entity.admin = json.admin ?? entity.admin;
        entity.users = json.users ?? entity.users;
        entity.url = json.url ?? entity.url;
        entity.description = json.description ?? entity.description;
        entity.cosmos_chain_id = json.cosmos_chain_id ?? entity.cosmos_chain_id;
        entity.website = json.website ?? entity.website;
        entity.twitter_account = json.twitter_account ?? entity.twitter_account;
        entity.discord_url = json.discord_url ?? entity.discord_url;
        entity.end_date = json.end_date ?? entity.end_date;
        entity.image = json.image ?? entity.image;
        entity.banner_image = json.banner_image ?? entity.banner_image;
        entity.twitter_account_to_follow = json.twitter_account_to_follow ?? entity.twitter_account_to_follow;
        entity.tweet_to_like = json.tweet_to_like ?? entity.tweet_to_like;
        entity.tweet_to_retweet = json.tweet_to_like ?? entity.tweet_to_like;
        entity.discord_invite_link = json.discord_invite_link ?? entity.discord_invite_link;
        entity.server_role = json.server_role ?? entity.server_role;
        entity.require_email = json.require_email ?? entity.require_email;

        return entity;
    }
}
