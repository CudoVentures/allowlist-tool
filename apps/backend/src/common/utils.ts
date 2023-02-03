import { StdSignature, decodeSignature } from 'cudosjs';
import { verifyADR36Amino } from '@keplr-wallet/cosmos';
import { bech32 } from "bech32"
import axios from 'axios'
import { Client, TextChannel } from 'discord.js'

import { GuildInfo } from '../../../common/interfaces';

export const NOT_EXISTS_INT = -2147483648;

export const getGuildInfoByGuildId = async (guildId: string): Promise<GuildInfo> => {
    const { systemChannelId, guildName } = await getNameAndSystemChannelId(guildId)
    const guildRoles = await getGuildRolesFromId(guildId)
    const inviteCode = await getInviteCodeByIDs(guildId, systemChannelId)
    return {
        guildId,
        guildName,
        systemChannelId,
        guildRoles,
        inviteCode
    }
}

export const getInviteCodeByIDs = async (guildId: string, systemChannelId: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const client = new Client({ intents: 1 << 6 })
        client.on('ready', async () => {
            const guild = await client.guilds.fetch(guildId)
            const channel = await guild.channels.fetch(systemChannelId) as TextChannel
            const invite = await channel.createInvite()
            resolve(invite.code)
        })
        client.on('error', (error: any) => {
            reject(error)
        })
        client.login(process.env.App_Discord_Bot_Token)
    })
}

export const getGuildRolesFromId = async (guildId: string): Promise<string[]> => {
    const guildRolesURL = `https://discord.com/api//guilds/${guildId}/roles`;
    const response = await axios.get(guildRolesURL, {
        headers: { Authorization: process.env.App_Discord_Bot_Token },
    });
    const serverRoles = response.data.map((role: any) => {
        return role.name
    })
    return serverRoles
}

export const getNameAndSystemChannelId = async (guildId: string): Promise<{ systemChannelId: string, guildName: string }> => {
    const guildRolesURL = `https://discord.com/api//guilds/${guildId}`;
    const response = await axios.get(guildRolesURL, {
        headers: { Authorization: process.env.App_Discord_Bot_Token },
    });
    return { systemChannelId: response.data.system_channel_id, guildName: response.data.name }
}

export const isValidSignature = (signature: StdSignature, signer: string, data: string | Uint8Array): boolean => {
    const { prefix: decodedPrefix } = bech32.decode(signer)
    const { pubkey: decodedPubKey, signature: decodedSignature } = decodeSignature(signature)
    return verifyADR36Amino(
        decodedPrefix,
        signer,
        data,
        decodedPubKey,
        decodedSignature,
    )
}
