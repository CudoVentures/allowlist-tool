import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import { UserService } from '../user/user.service';
import { AllowlistRepo } from './repos/allowlist.repo';
import { CreateAllowlistDto } from './dto/create-allowlist.dto';
import { UpdateAllowlistDto } from './dto/update-allowlist.dto';
import AllowlistEntity from './entities/allowlist.entity';
import UserEntity from '../user/entities/user.entity';
@Injectable()
export class AllowlistService {
  constructor(
    @InjectModel(AllowlistRepo)
    private allowlistRepo: typeof AllowlistRepo,
    private userSerivice: UserService,
  ) { }

  async findAll() {
    const allowlistRepos = await this.allowlistRepo.findAll();
    return allowlistRepos.map((allowlistRepo) =>
      AllowlistEntity.fromRepo(allowlistRepo),
    );
  }

  async findByAdmin(admin: string): Promise<AllowlistEntity[]> {
    const allowlistRepos = await this.allowlistRepo.findAll({
      where: { admin },
    });
    return allowlistRepos.map((allowlistRepo) =>
      AllowlistEntity.fromRepo(allowlistRepo),
    );
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
    userId: number
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
    sessionUser: any,
  ) {
    console.log(sessionUser)
    const allowlistRepo = await this.allowlistRepo.findByPk(allowlistId);
    const allowlistEntity = AllowlistEntity.fromRepo(allowlistRepo);

    const now = Math.floor(new Date().getTime() / 1000);
    const endDate = Math.floor(allowlistRepo.end_date.getTime() / 1000);
    if (endDate < now) {
      throw new BadRequestException('Allowlist is closed for new entries');
    }

    let user = await this.userSerivice.findByAddress(userAddress);
    user = await this.updateUserInfo(user, sessionUser)

    await this.checkForDuplicateAcc(user, allowlistEntity);

    if (allowlistEntity.twitter_account) {
      const twitterAccountId = await this.getAccountID(allowlistEntity.twitter_account)
      const followAcc = await this.followsAcc(
        twitterAccountId,
        user.twitter_profile_id,
      );
      if (!followAcc) {
        throw new BadRequestException('Criteria not met');
      }
    }

    if (allowlistEntity.tweet_to_like) {
      const tweetId = allowlistEntity.tweet_to_like
        .split('/')
        .at(-1)
        .split('?')[0];
      const liked = await this.likedTweet(tweetId, user.twitter_profile_id);
      if (!liked) {
        throw new BadRequestException('Criteria not met');
      }
    }

    if (allowlistEntity.tweet_to_retweet) {
      const tweetId = allowlistEntity.tweet_to_like
        .split('/')
        .at(-1)
        .split('?')[0];
      const retweeted = await this.retweeted(
        user.twitter_profile_username,
        tweetId,
      );
      if (!retweeted) {
        throw new BadRequestException('Criteria not met');
      }
    }

    if (allowlistEntity.discord_invite_link && allowlistEntity.server_role) {
      const inviteCode = allowlistEntity.discord_invite_link.split('/').pop();
      const serverId = (
        await axios.get(`https://discord.com/api/v8/invites/${inviteCode}`)
      ).data.guild.id;

      const hasRole = await this.hasRole(
        serverId,
        allowlistEntity.server_role,
        user.discord_access_token,
      );

      if (!hasRole) {
        throw new BadRequestException('Criteria not met');
      }
    }

    return this.addToAllowlist(allowlistId, user.id);
  }

  private async checkForDuplicateAcc(
    user: UserEntity,
    allowlistEntity: AllowlistEntity,
  ) {
    const users = await Promise.all(
      allowlistEntity.users.map((entry) => {
        const { userId } = JSON.parse(entry);
        return this.userSerivice.findById(userId);
      }),
    );

    for (const u of users) {
      if (
        user.discord_profile_id &&
        user.discord_profile_id === u.discord_profile_id
      ) {
        throw new BadRequestException('Discord profile is already registered');
      }
      if (
        user.twitter_profile_id &&
        user.twitter_profile_id === u.twitter_profile_id
      ) {
        throw new BadRequestException('Twitter profile is already registered');
      }
    }
  }

  private async followsAcc(
    accUsername: string,
    twitterId: string,
  ): Promise<boolean> {
    return this.passCheck(
      `https://api.twitter.com/2/users/${twitterId}/following`,
      accUsername,
    );
  }

  private async likedTweet(
    tweetId: string,
    twitterId: string,
  ): Promise<boolean> {
    return this.passCheck(
      `https://api.twitter.com/2/users/${twitterId}/liked_tweets`,
      tweetId,
    );
  }

  private async retweeted(
    twitterUsername: string,
    tweetId: string,
  ): Promise<boolean> {
    return this.passCheck(
      `https://api.twitter.com/2/tweets/${tweetId}/retweeted_by`,
      twitterUsername,
    );
  }

  private async getAccountID(twitterUsername: string) {
    let res = await axios.get(`https://api.twitter.com/2/users/by/username/${twitterUsername}`, {
      headers: { Authorization: process.env.App_Twitter_Bearer_Token }
    });
    return res.data.id
  }

  private async passCheck(url, target) {
    let arr = [];

    let res;
    let next_token;

    do {
      const params = { max_results: 100 };
      if (next_token) {
        params['pagination_token'] = next_token;
      }

      res = await axios.get(url, {
        headers: { Authorization: process.env.App_Twitter_Bearer_Token },
        params,
      });

      if (res.data.meta.result_count === 0 || !res.data.data) {
        break;
      }

      const data = res.data.data.map((tweet) => tweet.id);
      arr = arr.concat(data);
      next_token = res.data.meta.next_token;
    } while (next_token);

    return arr.includes(target);
  }

  private async hasRole(
    serverId: string,
    role: string,
    accessToken,
  ): Promise<boolean> {
    const userGuildsURL = `https://discord.com/api/users/@me/guilds`;
    const userGuildsRes = await axios.get(userGuildsURL, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { scope: 'identify' },
    });

    const guild = userGuildsRes.data.find(
      (guild) => guild.id.toString() === serverId,
    );
    if (!guild) {
      return false;
    }

    const guildMemberURL = `https://discord.com/api/users/@me/guilds/${guild.id}/member`;
    const guildMemberRes = await axios.get(guildMemberURL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const guildRolesURL = `https://discord.com/api//guilds/${guild.id}/roles`;
    const guildRoleRes = await axios.get(guildRolesURL, {
      headers: { Authorization: process.env.App_Discord_Bot_Token },
    });

    const roleId = guildRoleRes.data.find(
      (guildRole) => guildRole.name.toLowerCase() === role.toLowerCase(),
    ).id;

    if (!roleId) {
      return false;
    }

    const userRoles = guildMemberRes.data.roles;
    return userRoles.includes(roleId);
  }

  async getEntries(allowlistId: number) {
    const allowlistRepo = await this.allowlistRepo.findByPk(allowlistId);
    if (!allowlistRepo.users) {
      return []
    }
    const entries = allowlistRepo.users.map((entry) => JSON.parse(entry));
    return Promise.all(
      entries.map((entry) => {
        return this.userSerivice.findById(entry.userId).then((user) => {
          return {
            id: user.id,
            address: user.address,
            email: entry.email,
            twitter_handle: user.twitter_profile_id,
            discord_handle: user.discord_profile_id,
          };
        });
      }),
    );
  }

  async updateUserInfo(user, sessionUser){
    const twitterInfo = sessionUser.twitter
    const discordInfo = sessionUser.discord
    let twitterUser, discordUser
    if (twitterInfo){
      twitterUser = await this.userSerivice.findByTwitterId(sessionUser.twitter.twitter_profile_id)
      //const discordUser = await this.userSerivice.findByDiscordId(sessionUser.discord.discord_profile_id)
      delete twitterUser.id
      delete twitterUser.address
      delete twitterUser.discord_profile_username
      delete twitterUser.discord_access_token
      delete twitterUser.discord_profile_id
      delete twitterUser.discord_refresh_token
    } else if (discordInfo){
      discordUser = await this.userSerivice.findByDiscordId(sessionUser.discord.discord_profile_id)
      delete discordUser.id
      delete discordUser.address
      delete discordUser.twitter_access_token
      delete discordUser.twitter_account
      delete discordUser.twitter_handle
      delete discordUser.twitter_profile_username
      delete discordUser.twitter_profile_username
    }

    const newUserInfo = Object.assign({},user,twitterUser)
    delete newUserInfo.id
    return await this.userSerivice.updateUser(user.id, newUserInfo)
  }
}
