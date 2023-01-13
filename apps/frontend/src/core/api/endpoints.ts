import { SOCIAL_MEDIA } from "../store/user"
import { CHAIN_DETAILS } from "../utilities/Constants"

export const EXPLORER_ADDRESS_DETAILS = (connectedNetwork: string, accountAddress: string) =>
  `${CHAIN_DETAILS.EXPLORER_URL[connectedNetwork]}/account/${accountAddress}`

export const TX_HASH_DETAILS = (connectedNetwork: string, txHash: string) =>
  `${CHAIN_DETAILS.EXPLORER_URL[connectedNetwork]}/transactions/${txHash}`

export const JOIN_ALLOWLIST_URL = (allowlistID: number) =>
  `/api/v1/allowlist/join/${allowlistID}`

export const ALLOWLIST_DETAILS_URL = (allowlistID: string) =>
  `/api/v1/allowlist/${allowlistID}`

export const ALLOWLIST_ENTRIES_URL = (allowlistID: number) =>
  `/api/v1/allowlist/entries/${allowlistID}`

export const SOCIAL_MEDIA_LOGIN_URL = (service: SOCIAL_MEDIA) =>
  `/api/v1/auth/${service}/login`

export const ALL_ALLOWLISTS_URL = `/api/v1/allowlist/all`

export const USER_DETAILS_URL = `/api/v1/user`

export const ALLOWLIST_URL = `/api/v1/allowlist`

export const USER_LOGIN_URL = '/api/v1/auth/login'
