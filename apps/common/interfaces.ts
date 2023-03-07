export interface GuildInfo {
    guildId: string;
    guildName: string;
    systemChannelId: string;
    guildRoles: Record<string, string>;
    inviteCode: string
}

export interface SOCIAL_MEDIA_DETAILS {
    id: string,
    accessToken: string,
    userName: string,
    guild: GuildInfo,
}

export type CONNECTED_SOCIAL_MEDIA_INFO = {
    [key in SOCIAL_MEDIA]: SOCIAL_MEDIA_DETAILS
}

export type CONNECTED_SOCIAL_MEDIA = {
    [key in SOCIAL_MEDIA]: SOCIAL_MEDIA_DETAILS
}

export const emptyGuildInfo: GuildInfo = {
    guildId: '',
    guildName: '',
    systemChannelId: '',
    guildRoles: {},
    inviteCode: ''
}

export enum SOCIAL_MEDIA {
    twitter = 'twitter',
    discord = 'discord'
}

export enum WS_MSGS {
    join = 'join',
    socialMediaSuccess = 'socialMediaSuccess',
}

export enum WS_ROOM {
    socialMediaEvents = 'socialMediaEvents'
}

export const emptySocialMedia = {
    id: '',
    userName: '',
    accessToken: '',
    guild: emptyGuildInfo
}

export enum DISCORD_SERVER_ROLES {
    default = '@everyone'
}

export const DISCORD_API_MSGS = {
    ExpiredOrUnknownInvite: 'Expired or Invalid invite'
}

export const TWITTER_API_MSGS = {
    InvalidAccount: 'Invalid Account',
    NotFollowingAcc: 'User Not Following The Specified Account',
    NotLikedTweet: 'User Not Liked The Specified Tweet',
    NotRetweetedTweet: 'User Not Retweeted The Specified Tweet'
}