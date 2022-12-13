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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from '../auth/guards/loggedIn.guard';
import { Allowlist } from './allowlist.model';
import { AllowlistService } from './allowlist.service';
import { CreateAllowlistDto } from './dto/create-allowlist.dto';
import { JoinAllowlistDto } from './dto/join-allowlist.dto';
import { SignedMessageDto } from './dto/signed-message.dto';
import { UpdateAllowlistDto } from './dto/update-allowlist.dto';
import { IsAdminGuard } from './guards/is-admin.guard';
import { SignedMessageGuard } from './guards/signed-message.guard';

@ApiTags('Allowlist')
@Controller('allowlist')
export class AllowlistController {
  constructor(private allowlistService: AllowlistService) {}

  @Get('all')
  async findAll(): Promise<Allowlist[]> {
    return this.allowlistService.findAll();
  }

  @Get(':customId')
  async findOne(@Param('customId') customId: string): Promise<Allowlist> {
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

  @Post('join/:id')
  @UseGuards(LoggedInGuard, SignedMessageGuard)
  async join(
    @Param('id', ParseIntPipe) id: number,
    @Body() joinAllowlistDto: JoinAllowlistDto,
  ) {
    return this.allowlistService.joinAllowlist(
      id,
      joinAllowlistDto.address,
      joinAllowlistDto.email,
    );
  }

  @Post()
  @UseGuards(LoggedInGuard, SignedMessageGuard)
  async create(
    @Body() createCollectionDto: CreateAllowlistDto,
  ): Promise<Allowlist> {
    return this.allowlistService.createAllowlist(createCollectionDto);
  }

  @UseGuards(IsAdminGuard, SignedMessageGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAllowlistDto: UpdateAllowlistDto,
  ): Promise<Allowlist> {
    return this.allowlistService.updateAllowlist(id, updateAllowlistDto);
  }
}
