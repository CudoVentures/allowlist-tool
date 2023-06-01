import { DISCORD_API_MSGS, DISCORD_SERVER_ROLES } from "../../../../common/interfaces"
import { blobToBase64 } from "../../features/allowlists/presentation/components/helpers"
import { GET_GUILD_NAME_BY_INVITE_CODE, GET_ROLE_NAME_BY_ROLE_ID } from "../api/calls"

export const getServerRoleNameByRoleId = async (inviteCode: string, roleId: string): Promise<string> => {
  try {
    const roleName = await GET_ROLE_NAME_BY_ROLE_ID(inviteCode, roleId)
    return roleName || DISCORD_SERVER_ROLES.default
  } catch (error) {
    console.error(error.response?.data?.message)
    return DISCORD_SERVER_ROLES.default
  }
}
export const getDiscordGuildNameByInviteCode = async (inviteCode: string): Promise<string> => {
  try {
    const guildName = await GET_GUILD_NAME_BY_INVITE_CODE(inviteCode)
    return guildName || DISCORD_API_MSGS.ExpiredOrUnknownInvite
  } catch (error) {
    console.error(error.response?.data?.message)
    return DISCORD_API_MSGS.ExpiredOrUnknownInvite
  }
}

export const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const getSum = (numbers: number[]): number => {
  const sum = numbers.reduce(function (a, b) {
    return a + b
  }, 0)
  return sum
}

export const handleLinkOut = (url: string) => {
  if (url) {
    window.open(url, url, 'rel=noreferrer')?.focus()
  }
}

export const setBlobToB64Img = async (imgData: Blob, setter: React.Dispatch<React.SetStateAction<string>>) => {
  const b64ImgString = await blobToBase64(imgData)
  setter(b64ImgString as string)
}

export const getTimeFromNumber = (time: number): DetailedTime => {
  const days = time / (24 * 60 * 60 * 1000)
  const hours = (days % 1) * 24
  const minutes = (hours % 1) * 60
  const secs = (minutes % 1) * 60
  return {
    days: Math.floor(days),
    hours: Math.floor(hours),
    minutes: Math.floor(minutes),
    seconds: Math.floor(secs)
  }
}

export const getSeparateDateAndTime = (fullDate: Date): { date: string, time: string } => {
  const period = fullDate?.toString().split(' ') || []
  return {
    date: period.slice(0, 4).join(' '),
    time: period.slice(4).join(' '),
  }
}

export const formatAddress = (text: string, sliceIndex: number): string => {
  if (!text) { return '' }
  const len = text.length
  if (len < sliceIndex) {
    return text
  }
  return `${text.slice(0, sliceIndex)}...${text.slice(len - 4, len)}`
}
