import { CHAIN_DETAILS } from "../utilities/Constants"

export const EXPLORER_ADDRESS_DETAILS = (connectedNetwork: string, accountAddress: string) =>
  `${CHAIN_DETAILS.EXPLORER_URL[connectedNetwork]}/account/${accountAddress}`

export const TX_HASH_DETAILS = (connectedNetwork: string, txHash: string) =>
  `${CHAIN_DETAILS.EXPLORER_URL[connectedNetwork]}/transactions/${txHash}`
