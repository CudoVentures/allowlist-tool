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

  async findAll() {
    return this.allowlistModel.findAll();
  }

  async findByAdmin(id: number): Promise<Allowlist[]> {
    return this.allowlistModel.findAll({
      where: {
        admin: id,
      },
    });
  }

  async createOne(
    createAllowlistDTO: CreateAllowlistDto,
    admin: string,
  ): Promise<Allowlist> {
    return this.allowlistModel.create({
      ...createAllowlistDTO,
      admin,
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
}
