import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from '../auth/guards/loggedIn.guard';
import { TransactionInterceptor } from '../common/common.interceptors';
import { Allowlist } from './allowlist.model';
import { AllowlistService } from './allowlist.service';
import { CreateAllowlistDto } from './dto/create-allowlist.dto';
import { JoinAllowlistDto } from './dto/join-allowlist.dto';
import { UpdateAllowlistDto } from './dto/update-allowlist.dto';
import { IsAdminGuard } from './guards/is-admin.guard';
import { CreateAllowlistPipe } from './pipes/create-allowlist.pipe';
import { SignMessagePipe } from './pipes/sign-message.pipe';

@ApiTags('Allowlist')
@Controller('allowlist')
export class AllowlistController {
  constructor(private allowlistService: AllowlistService) {}

  @Get('all')
  async findAll(): Promise<Allowlist[]> {
    return this.allowlistService.findAll();
  }

  @Get(':customId')
  async findByCustomId(
    @Param('customId') customId: string,
  ): Promise<Allowlist> {
    return this.allowlistService.findByCustomId(customId);
  }

  @Get()
  async findByAdmin(@Request() req): Promise<Allowlist[]> {
    return this.allowlistService.findByAdmin(req.session.user.address);
  }

  @Get('entries/:id')
  @UseGuards(IsAdminGuard)
  async getEntries(@Param('id', ParseIntPipe) id: number) {
    return this.allowlistService.getEntries(id);
  }

  @UseInterceptors(TransactionInterceptor)
  @Post('join/:id')
  @UseGuards(LoggedInGuard)
  async join(
    @Param('id', ParseIntPipe) id: number,
    @Body(SignMessagePipe) joinAllowlistDto: JoinAllowlistDto,
  ) {
    return this.allowlistService.joinAllowlist(
      id,
      joinAllowlistDto.address,
      joinAllowlistDto.email,
    );
  }

  @UseInterceptors(TransactionInterceptor)
  @Post()
  @UseGuards(LoggedInGuard)
  async create(
    @Body(SignMessagePipe, CreateAllowlistPipe)
    createAllowlistDto: CreateAllowlistDto,
  ): Promise<Allowlist> {
    return this.allowlistService.createAllowlist(createAllowlistDto);
  }

  @UseInterceptors(TransactionInterceptor)
  @UseGuards(IsAdminGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(SignMessagePipe) updateAllowlistDto: UpdateAllowlistDto,
  ): Promise<Allowlist> {
    return this.allowlistService.updateAllowlist(id, updateAllowlistDto);
  }
}
