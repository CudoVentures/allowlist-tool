import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import { UserService } from '../user/user.service';
import { Allowlist } from './allowlist.model';
import { CreateAllowlistDto } from './dto/create-allowlist.dto';
import { UpdateAllowlistDto } from './dto/update-allowlist.dto';

@Injectable()
export class AllowlistService {
  private bearerToken: string;

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
      const liked = this.likedTweet(tweetId, user.twitter_profile_id);
      const retweeted = this.retweeted(tweetId, user.twitter_profile_username);
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
    userTwitterId: string,
  ): Promise<boolean> {
    const url = `https://api.twitter.com/2/users/${userTwitterId}/following`;
    let accounts = [];

    let res;
    while (true) {
      res = await axios.get(url, {
        headers: { Authorization: process.env.App_Twitter_Bearer_Token },
        params: { max_results: 1000 },
      });
      const data = res.data.map((acc) => acc.username);
      accounts = accounts.concat(data);
      if (!res.meta.next_token) {
        break;
      }
    }

    return accounts.includes(accUsername);
  }

  private async likedTweet(
    tweetId: string,
    twitterId: string,
  ): Promise<boolean> {
    const url = `https://api.twitter.com/2/users/${twitterId}/liked_tweets`;
    let likes = [];

    let res;
    while (true) {
      res = await axios.get(url, {
        headers: { Authorization: process.env.App_Twitter_Bearer_Token },
        params: { max_results: 100 },
      });
      const data = res.data.map((tweet) => tweet.id);
      likes = likes.concat(data);
      if (!res.meta.next_token) {
        break;
      }
    }

    return likes.includes(tweetId);
  }

  private async retweeted(
    tweetId: string,
    twitterUsername: string,
  ): Promise<boolean> {
    const url = `https://api.twitter.com/2/users/${tweetId}/liked_tweets`;
    let retweets = [];

    let res;
    while (true) {
      res = await axios.get(url, {
        headers: { Authorization: process.env.App_Twitter_Bearer_Token },
        params: { max_results: 100 },
      });
      const data = res.data.map((tweet) => tweet.id);
      retweets = retweets.concat(data);
      if (!res.meta.next_token) {
        break;
      }
    }

    return retweets.includes(twitterUsername);
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
