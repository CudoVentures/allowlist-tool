import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Allowlist } from './allowlist.model';
import { CreateAllowlistDto } from './dto/create-allowlist.dto';
import { UpdateAllowlistDto } from './dto/update-allowlist.dto';

@Injectable()
export class AllowlistService {
  constructor(
    @InjectModel(Allowlist)
    private allowlistModel: typeof Allowlist,
  ) {}

  async findAll(userId: string) {
    return (await this.allowlistModel.findAll()).map((allowlist) => {
      return {
        ...allowlist,
        isAdmin: allowlist.admin === userId,
      } as unknown as Allowlist;
    });
  }

  async findByAdmin(id: number): Promise<Allowlist[]> {
    return await this.allowlistModel.findAll({
      where: {
        admin: id,
      },
    });
  }

  async createOne(
    createAllowlistDTO: CreateAllowlistDto,
    admin: string,
  ): Promise<Allowlist> {
    return await this.allowlistModel.create({
      ...createAllowlistDTO,
      admin,
    });
  }

  async findOne(id: number): Promise<Allowlist> {
    return await this.allowlistModel.findByPk(id);
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
}
