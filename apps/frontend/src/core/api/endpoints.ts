import { SOCIAL_MEDIA } from "../../../../common/interfaces"
import { CHAIN_DETAILS } from "../utilities/Constants"

export const EXPLORER_ADDRESS_DETAILS = (connectedNetwork: string, accountAddress: string) =>
  `${CHAIN_DETAILS.EXPLORER_URL[connectedNetwork]}/account/${accountAddress}`

export const TX_HASH_DETAILS = (connectedNetwork: string, txHash: string) =>
  `${CHAIN_DETAILS.EXPLORER_URL[connectedNetwork]}/transactions/${txHash}`

export const JOIN_ALLOWLIST_URL = (allowlistID: number) =>
  `/api/v1/allowlist/join/${allowlistID}`

export const ALLOWLIST_DETAILS_URL = (allowlistID: string | number) =>
  `/api/v1/allowlist/${allowlistID}`

export const ALLOWLIST_ENTRIES_URL = (allowlistID: number) =>
  `/api/v1/allowlist/entries/${allowlistID}`

export const SOCIAL_MEDIA_LOGIN_URL = (service: SOCIAL_MEDIA) =>
  `/api/v1/auth/${service}/login`

export const SOCIAL_MEDIA_LOGOUT_URL = (service: SOCIAL_MEDIA) =>
  `/api/v1/auth/${service}/logout`

export const DISCORD_ROLE_NAME_FROM_ROLE_ID_URL = (inviteCode: string, roleId: string) =>
  `/api/v1/discord/guilds/${inviteCode}/roles/${roleId}/name`

export const DISCORD_GUILD_NAME_FROM_INVITE_CODE_URL = (inviteCode: string) =>
  `/api/v1/discord/invite/${inviteCode}/guild/name`

export const DISCORD_MEMBER_JOINED_SERVER_URL = (inviteCode: string, userId: string) =>
  `/api/v1/discord/guild/${inviteCode}/${userId}`

export const ADD_DISCORD_BOT_URL = (clientId: string) =>
  `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=0&scope=bot&response_type=code`

export const ALL_ALLOWLISTS_URL = `/api/v1/allowlist/all`

export const USER_DETAILS_URL = `/api/v1/user`

export const ALLOWLIST_URL = `/api/v1/allowlist`

export const USER_LOGIN_URL = '/api/v1/auth/login'
