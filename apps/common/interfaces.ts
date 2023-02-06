export interface GuildInfo {
    guildId: string;
    guildName: string;
    systemChannelId: string;
    guildRoles: string[];
    inviteCode: string
}

export interface SOCIAL_MEDIA_DETAILS {
    id: string,
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
    guildRoles: [],
    inviteCode: ''
}

export enum SOCIAL_MEDIA {
    twitter = 'twitter',
    discord = 'discord'
}

export const emptySocialMedia = {
    id: '',
    userName: '',
    guild: emptyGuildInfo
}

export enum DISCORD_SERVER_ROLES {
    default = '@everyone'
}
