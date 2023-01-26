import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
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

@ApiTags('Allowlist')
@Controller('allowlist')
export class AllowlistController {
  constructor(private allowlistService: AllowlistService) { }

  @Get('all')
  async findAll(): Promise<AllowlistEntity[]> {
    return this.allowlistService.findAll();
  }

  @Get(':customId')
  async findByCustomId(
    @Param('customId') customId: string,
  ): Promise<AllowlistEntity> {
    return this.allowlistService.findByCustomId(customId);
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
    let sessionUser = req.session.user
    // update user record
    let allowlistUser = await this.allowlistService.joinAllowlist(
      id,
      joinAllowlistDto.connectedAddress,
      sessionUser
    );
    return allowlistUser
  }

  @UseInterceptors(TransactionInterceptor)
  @Post()
  async create(
    @Body(AdminSignMessagePipe, CreateAllowlistPipe)
    createAllowlistDto: CreateAllowlistDto,
  ): Promise<AllowlistEntity> {
    return this.allowlistService.createAllowlist(createAllowlistDto);
  }

  @UseInterceptors(TransactionInterceptor)
  @UseGuards(IsAdminGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(SignMessagePipe) updateAllowlistDto: UpdateAllowlistDto,
  ): Promise<AllowlistEntity> {
    return this.allowlistService.updateAllowlist(id, updateAllowlistDto);
  }
}
