import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { Allowlist } from './allowlist.model';
import { CreateAllowlistDto } from './dto/create-allowlist.dto';
import { UpdateAllowlistDto } from './dto/update-allowlist.dto';
@Injectable()
export class AllowlistService {
  constructor(
    @InjectModel(Allowlist)
    private allowlistModel: typeof Allowlist,
    private userSerivice: UserService,
  ) {}

  async findAll() {
    return this.allowlistModel.findAll();
  }

  async findByAdmin(admin: string): Promise<Allowlist[]> {
    const allowlists = await this.allowlistModel.findAll();
    return allowlists.filter((allowlist) => allowlist.admin === admin);
  }

  async findByCustomId(id: string): Promise<Allowlist> {
    return this.allowlistModel.findOne({ where: { url: id } });
  }

  async findOne(id: number): Promise<Allowlist> {
    return this.allowlistModel.findByPk(id);
  }

  async createAllowlist(
    createAllowlistDTO: CreateAllowlistDto,
  ): Promise<Allowlist> {
    if (
      !createAllowlistDTO.twitter_account_to_follow &&
      !createAllowlistDTO.tweet_to_like &&
      !createAllowlistDTO.tweet_to_retweet &&
      !createAllowlistDTO.discord_invite_link &&
      !createAllowlistDTO.server_role
    ) {
      throw new BadRequestException('Allowlist criteria not set');
    }
    const userAddress = createAllowlistDTO.address;

    const duplicate = await this.findByCustomId(createAllowlistDTO.url);
    if (duplicate) {
      throw new BadRequestException('Allowlist with this url already exists');
    }

    return this.allowlistModel.create({
      ...createAllowlistDTO,
      admin: userAddress,
    });
  }

  async updateAllowlist(
    id: number,
    updateCollectionDto: UpdateAllowlistDto,
  ): Promise<Allowlist> {
    const [count, [allowlist]] = await this.allowlistModel.update(
      { ...updateCollectionDto },
      { where: { id }, returning: true },
    );

    return allowlist;
  }

  private async addToAllowlist(id: number, userId: number, email: string) {
    const allowlist = await this.findOne(id);

    const registeredUsers = allowlist.users.map(
      (entry) => JSON.parse(entry).userId,
    );
    if (registeredUsers.includes(userId)) {
      return allowlist;
    }

    const updatedList = allowlist.users.concat([
      JSON.stringify({ userId, email }),
    ]);

    const [count, [updated]] = await this.allowlistModel.update(
      { users: updatedList },
      { where: { id }, returning: true },
    );

    return updated;
  }

  async joinAllowlist(
    allowlistId: number,
    userAddress: string,
    userEmail: string,
  ) {
    const allowlist = await this.findOne(allowlistId);

    const now = Math.floor(new Date().getTime() / 1000);
    const endDate = Math.floor(allowlist.end_date.getTime() / 1000);
    if (endDate < now) {
      throw new BadRequestException('Allowlist is closed for new entries');
    }

    const user = await this.userSerivice.findByAddress(userAddress);

    await this.checkForDuplicateAcc(user, allowlist);

    if (allowlist.twitter_account) {
      const followAcc = this.followsAcc(
        allowlist.twitter_account,
        user.twitter_profile_id,
      );
      if (!followAcc) {
        throw new BadRequestException();
      }
    }

    if (allowlist.tweet_to_like) {
      const tweetId = allowlist.tweet_to_like.split('/').at(-1).split('?')[0];
      const liked = await this.likedTweet(tweetId, user.twitter_profile_id);
      if (!liked) {
        throw new BadRequestException();
      }
    }

    if (allowlist.tweet_to_retweet) {
      const tweetId = allowlist.tweet_to_like.split('/').at(-1).split('?')[0];
      const retweeted = await this.retweeted(
        user.twitter_profile_username,
        tweetId,
      );
      if (!retweeted) {
        throw new BadRequestException();
      }
    }

    if (allowlist.discord_invite_link && allowlist.server_role) {
      const inviteCode = allowlist.discord_invite_link.split('/').pop();
      const serverId = (
        await axios.get(`https://discord.com/api/v8/invites/${inviteCode}`)
      ).data.guild.id;

      const hasRole = await this.hasRole(
        serverId,
        allowlist.server_role,
        user.discord_access_token,
      );

      if (!hasRole) {
        throw new BadRequestException();
      }
    }

    return this.addToAllowlist(allowlistId, user.id, userEmail);
  }

  private async checkForDuplicateAcc(user: User, allowlist: Allowlist) {
    const users = await Promise.all(
      allowlist.users.map((entry) => {
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
    const allowlist = await this.allowlistModel.findByPk(allowlistId);
    const entries = allowlist.users.map((entry) => JSON.parse(entry));
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
}
