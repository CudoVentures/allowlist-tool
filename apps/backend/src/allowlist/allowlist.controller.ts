import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransactionInterceptor } from '../common/common.interceptors';
import { AllowlistService } from './allowlist.service';
import { CreateAllowlistDto } from './dto/create-allowlist.dto';
import { JoinAllowlistDto } from './dto/join-allowlist.dto';
import { UpdateAllowlistDto } from './dto/update-allowlist.dto';
import { IsAdminGuard } from './guards/is-admin.guard';
import { CreateAllowlistPipe } from './pipes/create-allowlist.pipe';
import { SignMessagePipe } from './pipes/sign-message.pipe';
import { AdminSignMessagePipe } from './pipes/admin-sign-message.pipe';
import AllowlistEntity from './entities/allowlist.entity';
import UserEntity from '../user/entities/user.entity';
import { CanEditGuard } from './guards/can-edit.guard';
import { EditAllowlistPipe } from './pipes/edit-allowlist.pipe';

@ApiTags('Allowlist')
@Controller('allowlist')
export class AllowlistController {
  constructor(private allowlistService: AllowlistService) { }

  @Get('all')
  async findAll(): Promise<AllowlistEntity[]> {
    return this.allowlistService.findAll();
  }

  @Get(':allowlistId/user/joined')
  async isUserJoinedAllowlist(
    @Req() req,
    @Param('allowlistId') allowlistId: number,
  ): Promise<boolean> {
    const sessionUserId = req.session.user?.id as number
    return this.allowlistService.isUserJoinedAllowlist(allowlistId, sessionUserId);
  }

  @Get(':allowlistId/user/address/:address')
  async fetchuserByAllowlistIdAndAddress(
    @Req() req,
    @Param('allowlistId') allowlistId: number,
    @Param('address') address: string,
  ): Promise<{ userEntity: UserEntity }> {
    const userEntity = await this.allowlistService.getUserByAllowlistIdAndAddress(allowlistId, address);

    return {
      userEntity,
    }
  }

  @Get(':customId')
  async findByCustomId(
    @Param('customId') customId: string,
  ): Promise<AllowlistEntity> {
    return this.allowlistService.findByCustomId(customId);
  }

  @Get('/id/:id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ allowlistEntity: AllowlistEntity }> {
    const allowlistEntity = await this.allowlistService.findOne(id);

    return {
      allowlistEntity,
    }
  }

  @Get()
  async findByAdmin(@Request() req): Promise<AllowlistEntity[]> {
    return this.allowlistService.findByAdmin(req.session.user.address);
  }

  @Get('entries/:id')
  @UseGuards(IsAdminGuard)
  async getEntries(@Param('id', ParseIntPipe) id: number) {
    return this.allowlistService.getEntries(id);
  }

  @UseInterceptors(TransactionInterceptor)
  @Post('join/:id')
  async join(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
    @Body(SignMessagePipe) joinAllowlistDto: JoinAllowlistDto,
  ) {
    const sessionUser = req.session.user
    // update user record
    const allowlistUser = await this.allowlistService.joinAllowlist(
      id,
      joinAllowlistDto.connectedAddress,
      joinAllowlistDto.userEmail,
      sessionUser,
    );
    return allowlistUser
  }

  @UseInterceptors(TransactionInterceptor)
  @Post()
  async create(
    @Body(SignMessagePipe, CreateAllowlistPipe)
    createAllowlistDto: CreateAllowlistDto,
  ): Promise<AllowlistEntity> {
    return this.allowlistService.createAllowlist(createAllowlistDto);
  }

  @UseInterceptors(TransactionInterceptor)
  @UseGuards(IsAdminGuard)
  @UseGuards(CanEditGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(AdminSignMessagePipe, EditAllowlistPipe)
    updateAllowlistDto: UpdateAllowlistDto,
  ): Promise<AllowlistEntity> {
    return this.allowlistService.updateAllowlist(id, updateAllowlistDto);
  }
}
