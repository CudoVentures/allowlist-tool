import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import { Guild, Role } from 'discord.js';

import { UserService } from '../user/user.service';
import { AllowlistRepo } from './repos/allowlist.repo';
import { CreateAllowlistDto } from './dto/create-allowlist.dto';
import { UpdateAllowlistDto } from './dto/update-allowlist.dto';
import AllowlistEntity from './entities/allowlist.entity';
import UserEntity from '../user/entities/user.entity';
import { DiscordService } from '../discord/discord.service';
import { DISCORD_SERVER_ROLES, TWITTER_API_MSGS } from '../../../common/interfaces';
import { TwitterService } from '../twitter/twitter.service';

@Injectable()
export class AllowlistService {
    constructor(
        @InjectModel(AllowlistRepo)
        private allowlistRepo: typeof AllowlistRepo,
        private userService: UserService,
        private discordService: DiscordService,
        private twitterService: TwitterService
    ) { }

    async getUserByAllowlistIdAndAddress(allowlistId: number, address: string): Promise<UserEntity> {
        if (!allowlistId || !address) {
            return null
        }

        const allowlistEntity = await this.findOne(allowlistId);

        return this.userService.findByIdsAndAddress(allowlistEntity.users, address);
    }

    async isUserJoinedAllowlist(allowListId: number, userId: number): Promise<boolean> {
        if (!userId) {
            return false
        }
        const allowList = await this.allowlistRepo.findByPk(allowListId)
        if (!allowList) {
            throw new BadRequestException('Invalid data');
        }
        return allowList.users?.includes(userId.toString())
    }

    async findAll() {
        const allowlistRepos = await this.allowlistRepo.findAll();
        return allowlistRepos.map((allowlistRepo) => {
            const e = AllowlistEntity.fromRepo(allowlistRepo)
            return e;
        });
    }

    async findByAdmin(admin: string): Promise<AllowlistEntity[]> {
        const allowlistRepos = await this.allowlistRepo.findAll({
            where: { admin },
        });
        return allowlistRepos.map((allowlistRepo) => AllowlistEntity.fromRepo(allowlistRepo));
    }

    async findByCustomId(id: string): Promise<AllowlistEntity> {
        const allowlistRepo = await this.allowlistRepo.findOne({
            where: { url: id },
        });
        return AllowlistEntity.fromRepo(allowlistRepo);
    }

    async findOne(id: number): Promise<AllowlistEntity> {
        const allowlistRepo = await this.allowlistRepo.findByPk(id);
        return AllowlistEntity.fromRepo(allowlistRepo);
    }

    async createAllowlist(
        createAllowlistDTO: CreateAllowlistDto,
    ): Promise<AllowlistEntity> {
        const duplicate = await this.findByCustomId(createAllowlistDTO.url);
        if (duplicate) {
            throw new BadRequestException('Allowlist with this url already exists');
        }

        const allowlistRepo = await this.allowlistRepo.create({
            ...createAllowlistDTO,
            admin: createAllowlistDTO.connectedAddress,
        });
        return AllowlistEntity.fromRepo(allowlistRepo);
    }

    async updateAllowlist(
        id: number,
        updateCollectionDto: UpdateAllowlistDto,
    ): Promise<AllowlistEntity> {
        const [count, [allowlistRepo]] = await this.allowlistRepo.update(
            { ...updateCollectionDto },
            { where: { id }, returning: true },
        );

        return AllowlistEntity.fromRepo(allowlistRepo);
    }

    private async addToAllowlist(
        id: number,
        userId: number,
    ): Promise<AllowlistEntity> {
        const allowlistRepo = await this.allowlistRepo.findByPk(id);
        const allowlistEntity = AllowlistEntity.fromRepo(allowlistRepo);

        const registeredUsers = allowlistEntity.users.map(
            (entry) => JSON.parse(entry).userId,
        );
        if (registeredUsers.includes(userId)) {
            return allowlistEntity;
        }
        const updatedList = allowlistEntity.users.push(`${userId}`);

        const [count, [updatedAllowlistRepo]] = await this.allowlistRepo.update(
            { users: allowlistEntity.users },
            { where: { id }, returning: true },
        );

        return AllowlistEntity.fromRepo(updatedAllowlistRepo);
    }

    async joinAllowlist(
        allowlistId: number,
        userAddress: string,
        userEmail: string,
        sessionUser: any,
    ) {
        const allowlistRepo = await this.allowlistRepo.findByPk(allowlistId);
        const allowlistEntity = AllowlistEntity.fromRepo(allowlistRepo);

        const now = Math.floor(new Date().getTime() / 1000);
        const endDate = Math.floor(allowlistRepo.end_date.getTime() / 1000);
        if (endDate < now) {
            throw new BadRequestException('Allowlist is closed for new entries');
        }

        let user = await this.userService.findByAddress(userAddress);
        user = await this.updateUserInfo(user, sessionUser)

        await this.checkForDuplicateAcc(user, allowlistEntity);

        if (allowlistEntity.twitter_account_to_follow) {
            const followAcc = await this.twitterService.isFollowingTwitterAcc(
                user.twitter_profile_id,
                allowlistEntity.twitter_account_to_follow,
            );
            if (!followAcc) {
                throw new BadRequestException(`Criteria not met: ${TWITTER_API_MSGS.NotFollowingAcc}`);
            }
        }

        if (allowlistEntity.tweet_to_like) {
            const tweetId = allowlistEntity.tweet_to_like
                .split('/')
                .at(-1)
                .split('?')[0];
            const liked = await this.twitterService.isLikedTweet(tweetId, user.twitter_profile_id);
            if (!liked) {
                throw new BadRequestException(`Criteria not met: ${TWITTER_API_MSGS.NotLikedTweet}`);
            }
        }

        if (allowlistEntity.tweet_to_retweet) {
            const tweetId = allowlistEntity.tweet_to_like
                .split('/')
                .at(-1)
                .split('?')[0];
            const retweeted = await this.twitterService.isTweetRetweeted(
                user.twitter_profile_username,
                tweetId,
            );
            if (!retweeted) {
                throw new BadRequestException(`Criteria not met: ${TWITTER_API_MSGS.NotRetweetedTweet}`);
            }
        }

        if (allowlistEntity.discord_invite_link) {
            const inviteCode = allowlistEntity.discord_invite_link
            const isJoinedDiscord = await this.discordService.isUserJoinedByInvite(inviteCode, user.discord_profile_id);

            if (!isJoinedDiscord) {
                throw new BadRequestException('Criteria not met: Discord server not joined');
            }

            if (allowlistEntity.server_role && allowlistEntity.server_role !== DISCORD_SERVER_ROLES.default) {
                const serverId = await this.discordService.getGuildIdByInviteCode(inviteCode);
                const hasRole = await this.hasRole(
                    serverId,
                    allowlistEntity.server_role,
                    user.discord_access_token,
                );

                if (!hasRole) {
                    throw new BadRequestException('Criteria not met: invalid role');
                }
            }
        }

        if (allowlistEntity.require_email) {
            if (!userEmail) {
                throw new BadRequestException('Criteria not met: e-mail is missing');
            }
            const data = { email: userEmail }
            user = await this.userService.updateUser(user.id, data)
        }

        return this.addToAllowlist(allowlistId, user.id);
    }

    private async checkForDuplicateAcc(
        user: UserEntity,
        allowlistEntity: AllowlistEntity,
    ) {
        const users = await Promise.all(
            allowlistEntity.users.map((entry) => {
                return this.userService.findById(Number(entry));
            }),
        );

        for (const u of users) {
            if (
                user.discord_profile_id
                && user.discord_profile_id === u.discord_profile_id
            ) {
                throw new BadRequestException('Discord profile is already registered');
            }
            if (
                user.twitter_profile_id
                && user.twitter_profile_id === u.twitter_profile_id
            ) {
                throw new BadRequestException('Twitter profile is already registered');
            }
        }
    }

    private async hasRole(
        serverId: string,
        roleId: string,
        accessToken: string,
    ): Promise<boolean> {
        const userGuildsURL = 'https://discord.com/api/users/@me/guilds';
        const userGuildsRes = await axios.get(userGuildsURL, {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: { scope: 'identify' },
        });

        const guild = userGuildsRes.data.find(
            (guild: Guild) => guild.id.toString() === serverId,
        );
        if (!guild) {
            return false;
        }

        const guildMemberURL = `https://discord.com/api/users/@me/guilds/${guild.id}/member`;
        const guildMemberRes = await axios.get(guildMemberURL, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        const guildRolesURL = `https://discord.com/api/guilds/${guild.id}/roles`;
        const guildRoleRes = await axios.get(guildRolesURL, {
            headers: { Authorization: process.env.App_Discord_Bot_Token },
        });

        const roleIfo = guildRoleRes.data.find(
            (guildRole: Role) => guildRole.id === roleId,
        );

        if (!roleIfo) {
            return false
        }

        const userRoles = guildMemberRes.data.roles;
        return userRoles.includes(roleIfo.id);
    }

    async getEntries(allowlistId: number) {
        const allowlistRepo = await this.allowlistRepo.findByPk(allowlistId);
        if (!allowlistRepo.users) {
            return []
        }
        const entries = allowlistRepo.users.map((entry) => JSON.parse(entry));
        return Promise.all(
            entries.map((entry) => {
                return this.userService.findById(entry).then((user) => {
                    return {
                        id: user.id,
                        address: user.address,
                        email: user.email || "Not provided",
                        twitter_handle: user.twitter_profile_id || "Not provided",
                        discord_handle: user.discord_profile_id || "Not provided",
                    };
                });
            }),
        );
    }

    async updateUserInfo(user, sessionUser) {
        const twitterInfo = sessionUser.twitter
        const discordInfo = sessionUser.discord
        let twitterUser, discordUser, newUserInfo
        if (twitterInfo) {
            twitterUser = await this.userService.findByTwitterId(sessionUser.twitter.twitter_profile_id)
            delete twitterUser.id
            delete twitterUser.address
            delete twitterUser.discord_profile_username
            delete twitterUser.discord_access_token
            delete twitterUser.discord_profile_id
            delete twitterUser.discord_refresh_token
            newUserInfo = { ...user, ...twitterUser }
        } else if (discordInfo) {
            discordUser = await this.userService.findByDiscordId(sessionUser.discord.discord_profile_id)
            delete discordUser.id
            delete discordUser.address
            delete discordUser.twitter_access_token
            delete discordUser.twitter_account
            delete discordUser.twitter_handle
            delete discordUser.twitter_profile_username
            delete discordUser.twitter_profile_username
            newUserInfo = { ...user, ...discordUser }
        }
        delete newUserInfo.id
        return await this.userService.updateUser(user.id, newUserInfo)
    }
}
