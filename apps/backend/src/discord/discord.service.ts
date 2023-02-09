import { Injectable } from '@nestjs/common';
import { DISCORD_SERVER_ROLES, GuildInfo } from '../../../common/interfaces';
import {
    Client,
    ClientOptions,
    Collection,
    CreateInviteOptions,
    GatewayIntentBits,
    Guild,
    Invite,
    Role,
    TextChannel
} from 'discord.js';

@Injectable()
export class DiscordService {
    private client: Client;

    constructor() {
        const clientOptions: ClientOptions = {
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildInvites,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildWebhooks
            ]
        }
        this.client = new Client(clientOptions);
    }

    async connect(): Promise<void> {
        await this.client.login(process.env.App_Discord_Bot_Token);
        this.client.on('guildMemberAdd', async (member) => {
            const guild = member.guild;
            const role = guild.roles.cache.find(role => role.name === 'new-member');
            await member.roles.add(role);
        });
    }

    disconnect(): void {
        this.client.destroy()
    }

    getClient(): Client {
        return this.client
    }

    // PRIVATE
    private async getGuildById(guildId: string): Promise<Guild> {
        return this.getClient().guilds.fetch(guildId)
    }

    private async getGuildRoles(guild: Guild): Promise<Collection<string, Role>> {
        return guild.roles.fetch()
    }

    private async getGuildSystemChannel(guild: Guild): Promise<TextChannel> {
        return guild.systemChannel.fetch()
    }

    private async getGuildByInvite(invite: Invite): Promise<Guild> {
        return invite.guild.fetch()
    }

    private async getInviteByCode(inviteCode: string): Promise<Invite> {
        const client = this.getClient()
        return client.fetchInvite(inviteCode)
    }

    private async getGuildByInviteCode(inviteCode: string): Promise<Guild> {
        const invite = await this.getInviteByCode(inviteCode)
        return this.getGuildByInvite(invite)
    }

    private async getInviteCodeForGuild(guild: Guild): Promise<string> {
        const channel = await this.getGuildSystemChannel(guild)
        const invite = await this.createInviteForChannel(channel)
        return invite.code
    }

    private async getFeGuildRoles(guild: Guild): Promise<Record<string, string>> {
        const roles = await this.getGuildRoles(guild)
        const rolePairs = {}
        roles.forEach((role) => { rolePairs[role.id] = role.name })
        return rolePairs
    }

    private async isUserAGuildMember(guild: Guild, userId: string): Promise<boolean> {
        const memberFound = await guild.members.fetch(userId)
        if (memberFound.id && memberFound.id === userId) {
            return true
        }
        return false
    }

    private async createInviteForChannel(channel: TextChannel): Promise<Invite> {
        const inviteOptions: CreateInviteOptions = {
            maxAge: 0,
            maxUses: 0,
            unique: false,
            temporary: false,
            reason: `Welcome to ${channel.name}`,
        }
        return channel.createInvite(inviteOptions)
    }

    //PUBLIC
    async getGuildIdByInviteCode(inviteCode: string): Promise<string> {
        const guild = await this.getGuildByInviteCode(inviteCode)
        return guild.id
    }

    async getGuildNameByInviteCode(inviteCode: string): Promise<string> {
        const invite = await this.getInviteByCode(inviteCode)
        const guild = await this.getGuildByInvite(invite)
        return guild.name
    }

    async isUserJoinedByInvite(inviteCode: string, userId: string): Promise<boolean> {
        const invite = await this.getInviteByCode(inviteCode)
        const guild = await this.getGuildByInvite(invite)
        return this.isUserAGuildMember(guild, userId)
    }

    async getRoleNameByRoleId(inviteCode: string, roleId: string): Promise<string> {
        const guild = await this.getGuildByInviteCode(inviteCode)
        const feRolePairs = await this.getFeGuildRoles(guild)
        for (const [id, name] of Object.entries(feRolePairs)) {
            if (id === roleId) {
                return name
            }
        }
        return DISCORD_SERVER_ROLES.default
    }

    async getGuildInfoByGuildId(guildId: string): Promise<GuildInfo> {
        const guild = await this.getGuildById(guildId)
        const guildRoles = await this.getFeGuildRoles(guild)
        const inviteCode = await this.getInviteCodeForGuild(guild)
        return {
            guildId: guild.id,
            guildName: guild.name,
            systemChannelId: guild.systemChannelId,
            guildRoles,
            inviteCode
        }
    }
}
