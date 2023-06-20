import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import UserEntity from './entities/user.entity';
import { UserRepo } from './repos/user.repo';

@Injectable()
export class UserService {
    constructor(
    @InjectModel(UserRepo)
    private userRepo: typeof UserRepo,
    ) {}

    async findByIdsAndAddress(ids: string[], address: string): Promise < UserEntity > {
        const userRepo = await this.userRepo.findOne({ where: {
            id: ids,
            address,
        } });
        return UserEntity.fromRepo(userRepo);
    }

    async findByAddress(address: string): Promise<UserEntity> {
        const userRepo = await this.userRepo.findOne({ where: { address } });
        return UserEntity.fromRepo(userRepo);
    }

    async findByDiscordId(id: number): Promise<UserEntity> {
        const userRepo = await this.userRepo.findOne({
            where: { discord_profile_id: id },
        });
        return UserEntity.fromRepo(userRepo);
    }

    async findByTwitterId(id: number): Promise<UserEntity> {
        const userRepo = await this.userRepo.findOne({
            where: { twitter_profile_id: id },
        });
        return UserEntity.fromRepo(userRepo);
    }

    async findById(id: number): Promise<UserEntity> {
        const userRepo = await this.userRepo.findByPk(id);
        return UserEntity.fromRepo(userRepo);
    }

    async createUser(params: any): Promise<UserEntity> {
        const userRepo = await this.userRepo.create({
            ...params,
        });
        return UserEntity.fromRepo(userRepo);
    }

    async updateUser(id: number, params: any): Promise<UserEntity> {
        const [_count, [userRepo]] = await this.userRepo.update(
            {
                ...params,
            },
            {
                where: { id },
                returning: true,
            },
        );
        return UserEntity.fromRepo(userRepo);
    }
}
