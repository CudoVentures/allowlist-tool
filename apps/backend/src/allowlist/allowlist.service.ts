import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
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
    return allowlists.filter((allowlist) => allowlist.admins.includes(admin));
  }

  async createOne(createAllowlistDTO: CreateAllowlistDto): Promise<Allowlist> {
    return this.allowlistModel.create({
      ...createAllowlistDTO,
      admins: [createAllowlistDTO.address],
    });
  }

  async findOne(id: number): Promise<Allowlist> {
    return this.allowlistModel.findByPk(id);
  }

  async updateOne(
    id: number,
    updateCollectionDto: UpdateAllowlistDto,
  ): Promise<Allowlist> {
    const [count, [allowlist]] = await this.allowlistModel.update(
      { ...updateCollectionDto },
      { where: { id }, returning: true },
    );

    return allowlist;
  }

  private async addToAllowlist(id: number, address: string) {
    const allowlist = await this.findOne(id);

    if (allowlist.users.includes(address)) {
      return allowlist;
    }

    const updatedList = allowlist.users.concat([address]);
    const [count, [updated]] = await this.allowlistModel.update(
      { users: updatedList },
      { where: { id }, returning: true },
    );
    return updated;
  }

  async joinAllowlist(
    allowlistId: number,
    userId: number,
    userAddress: string,
  ) {
    const allowlist = await this.findOne(allowlistId);

    const now = Math.floor(new Date().getTime() / 1000);
    const endDate = Math.floor(allowlist.end_date.getTime() / 1000);
    if (endDate < now) {
      throw new BadRequestException();
    }

    const user = await this.userSerivice.findOne(userId);

    if (allowlist.twitter_account) {
      const followAcc = this.followsAcc(
        allowlist.twitter_account,
        user.twitter_profile_id,
      );
      if (!followAcc) {
        throw new BadRequestException();
      }
    }

    if (allowlist.tweet) {
      const tweetId = allowlist.tweet.split('/').at(-1).split('?')[0];
      const liked = await this.likedTweet(tweetId, user.twitter_profile_id);
      const retweeted = await this.retweeted(
        user.twitter_profile_username,
        tweetId,
      );
      if (!liked && !retweeted) {
        throw new BadRequestException();
      }
    }

    if (allowlist.discord_server && allowlist.server_role) {
      const hasRole = await this.hasRole(
        allowlist.discord_server,
        allowlist.server_role,
        user.discord_profile_id,
        user.discord_access_token,
      );
      if (!hasRole) {
        throw new BadRequestException();
      }
    }

    return this.addToAllowlist(allowlistId, userAddress);
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
    while (true) {
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

      if (!res.data.meta.next_token) {
        break;
      }
      next_token = res.data.meta.next_token;
    }

    return arr.includes(target);
  }

  private async hasRole(
    server: string,
    role: string,
    discordId,
    accessToken,
  ): Promise<boolean> {
    const userGuildsURL = `https://discord.com/api/users/@me/guilds`;
    const userGuildsRes = await axios.get(userGuildsURL, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { scope: 'identify' },
    });

    if (userGuildsRes.data.includes(server)) {
      return false;
    }

    const guild = userGuildsRes.data.findOne((guild) => guild.name === server);

    const guildMemberURL = `https://discord.com/api/users/@me/guilds/${guild.id}/member`;
    const guildMemberRes = await axios.get(guildMemberURL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const guildRolseURL = `https://discord.com/api//guilds/${guild.id}/roles`;
    const guildRoleRes = await axios.get(guildRolseURL, {
      headers: { Authorization: process.env.App_Discord_Bot_Token },
    });

    const roleId = guildRoleRes.data.findOne(
      (guildRole) => guildRole.name === role,
    );
    if (!roleId) {
      return false;
    }

    const userRoles = guildMemberRes.data.roles;
    return userRoles.includes(roleId);
  }
}
