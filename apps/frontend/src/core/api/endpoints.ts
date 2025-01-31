import { SOCIAL_MEDIA } from '../../../../common/interfaces'

export const JOIN_ALLOWLIST_URL = (allowlistID: number) => `/api/v1/allowlist/join/${allowlistID}`

export const ALLOWLIST_DETAILS_URL = (allowlistID: string | number) => `/api/v1/allowlist/${allowlistID}`

export const USER_JOINED_ALLOWLIST_URL = (allowlistID: number) => `/api/v1/allowlist/${allowlistID}/user/joined`

export const ALLOWLIST_ENTRIES_URL = (allowlistID: number) => `/api/v1/allowlist/entries/${allowlistID}`

export const SOCIAL_MEDIA_LOGIN_URL = (service: SOCIAL_MEDIA) => `/api/v1/auth/${service}/login`

export const SOCIAL_MEDIA_LOGOUT_URL = (service: SOCIAL_MEDIA) => `/api/v1/auth/${service}/logout`

export const DISCORD_ROLE_NAME_FROM_ROLE_ID_URL = (inviteCode: string, roleId: string) => `/api/v1/discord/guilds/${inviteCode}/roles/${roleId}/name`

export const DISCORD_GUILD_NAME_FROM_INVITE_CODE_URL = (inviteCode: string) => `/api/v1/discord/invite/${inviteCode}/guild/name`

export const IS_VALID_TWITTER_ACC_URL = (accountName: string) => `/api/v1/twitter/validate/account/${accountName}`

export const IS_TWEET_RETWEETED_URL = (userId: string, tweetUrl: string) => `/api/v1/twitter/user/${userId}/retweeted/tweet/${encodeURIComponent(tweetUrl)}`

export const IS_TWEET_LIKED_URL = (userId: string, tweetUrl: string) => `/api/v1/twitter/user/${userId}/liked/tweet/${encodeURIComponent(tweetUrl)}`

export const IS_FOLLOWING_TWITTER_ACCOUNT_URL = (userId: string, accountName: string) => `/api/v1/twitter/user/${userId}/following/${accountName}`

export const DISCORD_MEMBER_JOINED_SERVER_URL = (inviteCode: string, userId: string) => `/api/v1/discord/guild/${inviteCode}/${userId}`

export const ADD_DISCORD_BOT_URL = (clientId: string, callBackUrl: string) => `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=0&redirect_uri=${encodeURIComponent(callBackUrl)}&response_type=code&scope=bot%20identify%20email%20guilds%20guilds.members.read`

export const ALL_ALLOWLISTS_URL = '/api/v1/allowlist/all'

export const USER_DETAILS_URL = '/api/v1/user'

export const ALLOWLIST_URL = '/api/v1/allowlist'

export const USER_LOGIN_URL = '/api/v1/auth/login'
