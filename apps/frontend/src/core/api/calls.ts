import axios from 'axios';

import { FetchedAllowlist } from "../store/allowlist";
import { blobToBase64 } from '../../features/allowlists/presentation/components/helpers';
import { SOCIAL_MEDIA } from '../../../../common/interfaces';

import {
    ALLOWLIST_DETAILS_URL,
    ALLOWLIST_ENTRIES_URL,
    ALLOWLIST_URL,
    ALL_ALLOWLISTS_URL,
    DISCORD_GUILD_NAME_FROM_INVITE_CODE_URL,
    DISCORD_MEMBER_JOINED_SERVER_URL,
    DISCORD_ROLE_NAME_FROM_ROLE_ID_URL,
    JOIN_ALLOWLIST_URL,
    SOCIAL_MEDIA_LOGOUT_URL,
    USER_DETAILS_URL,
    USER_JOINED_ALLOWLIST_URL,
    USER_LOGIN_URL
} from './endpoints';

export const IS_JOINED_DISCORD_SERVER = async (inviteCode: string, userId: string): Promise<boolean> => {
    const result = await axios.get(DISCORD_MEMBER_JOINED_SERVER_URL(inviteCode, userId))
    return result.data.isUserJoinedDiscordGuild
}

export const IS_USER_JOINED_ALLOWLIST = async (allowlistID: number): Promise<boolean> => {
    const result = await axios.get(USER_JOINED_ALLOWLIST_URL(allowlistID))
    return result.data
}

export const GET_ROLE_NAME_BY_ROLE_ID = async (inviteCode: string, roleId: string): Promise<string> => {
    const result = await axios.get(DISCORD_ROLE_NAME_FROM_ROLE_ID_URL(inviteCode, roleId), { withCredentials: true })
    return result.data
}

export const GET_GUILD_NAME_BY_INVITE_CODE = async (inviteCode: string): Promise<string> => {
    const result = await axios.get(DISCORD_GUILD_NAME_FROM_INVITE_CODE_URL(inviteCode), { withCredentials: true })
    return result.data
}

export const GET_ALL_ALLOWLISTS = async (): Promise<FetchedAllowlist[]> => {
    const result = await axios.get(ALL_ALLOWLISTS_URL)
    return result.data
}

export const GET_USER_DETAILS = async () => {
    return axios.get(USER_DETAILS_URL)
}

export const JOIN_ALLOWLIST = async (allowlistID: number, data: any) => {
    return axios.post(JOIN_ALLOWLIST_URL(allowlistID), data)
}

export const GET_ALLOWLIST_DETAILS = async (allowlistID: string) => {
    return axios.get(ALLOWLIST_DETAILS_URL(allowlistID));
}

export const CREATE_ALLOWLIST = async (data: any) => {
    data.image = await blobToBase64(data.image)
    data.banner_image = await blobToBase64(data.banner_image)
    return axios.post(ALLOWLIST_URL, data);
}

export const UPDATE_ALLOWLIST = async (allowlistID: number, data: any) => {
    return axios.put(ALLOWLIST_DETAILS_URL(allowlistID), data);
}

export const GET_ALLOWLIST_ENTRIES = async (allowlistID: number) => {
    return axios.get(ALLOWLIST_ENTRIES_URL(allowlistID));
}

export const LOG_IN_USER = async (data: any) => {
    return axios.post(USER_LOGIN_URL, data);
}

export const LOG_OUT_MEDIA_USER = async (media: SOCIAL_MEDIA) => {
    return axios.get(SOCIAL_MEDIA_LOGOUT_URL(media), { withCredentials: true });
}
