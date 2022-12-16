import { CHAIN_DETAILS } from "./Constants"

export const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const formatAddress = (text: string, sliceIndex: number): string => {
  if (!text) { return '' }
  const len = text.length
  if (len < sliceIndex) {
    return text
  }
  return `${text.slice(0, sliceIndex)}...${text.slice(len - 4, len)}`
}

export const isMainnetInstance = (): boolean => {
  const network = CHAIN_DETAILS.DEFAULT_NETWORK
  return CHAIN_DETAILS.CHAIN_ID[network!] === CHAIN_DETAILS.CHAIN_ID.MAINNET
}
