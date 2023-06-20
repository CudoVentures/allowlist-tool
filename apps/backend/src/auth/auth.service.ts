import { Injectable } from '@nestjs/common';
import UserEntity from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UserService) { }

    async login(address: string): Promise<UserEntity> {
        const user = await this.usersService.findByAddress(address);

        if (!user) {
            return this.usersService.createUser({ address });
        }

        return user;
    }

    async validateDiscordUser(
        _req: any,
        accessToken: string,
        refreshToken: string,
        profile: any,
    ): Promise<UserEntity> {
        const data = {};
        data['discord_access_token'] = accessToken;
        data['discord_refresh_token'] = refreshToken;
        data['discord_profile_id'] = profile.id;
        data[
            'discord_profile_username'
        ] = `${profile.username}#${profile.discriminator}`;
        let user
        try {
            user = await this.usersService.findByDiscordId(profile.id);
            // update user record
            user = await this.usersService.updateUser(user.id, data);
        } catch (error) {
            console.log(error)
        }

        if (!user) {
            user = await this.usersService.createUser(data);
        }
        return user;
    }

    async validateTwitterUser(
        _req: any,
        accessToken: string,
        refreshToken: string,
        profile: any,
    ): Promise<UserEntity> {
        const data = {};
        data['twitter_access_token'] = accessToken;
        data['twitter_refresh_token'] = refreshToken;
        data['twitter_profile_id'] = profile.id;
        data['twitter_profile_username'] = profile.username;

        let user
        try {
            user = await this.usersService.findByTwitterId(profile.id);
            // update user record
            user = await this.usersService.updateUser(user.id, data);
        } catch (error) {
            console.log(error)
        }

        if (!user) {
            user = await this.usersService.createUser(data);
        }
        return user;
    }
}
