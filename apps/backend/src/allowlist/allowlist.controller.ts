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
  @UseGuards()
  async findByAdmin(@Request() req): Promise<Allowlist[]> {
    return this.allowlistService.findByAdmin(req.session.user.address);
  }

  @Post('join/:id')
  @UseGuards(LoggedInGuard, SignedMessageGuard)
  async join(
    @Param('id', ParseIntPipe) id: number,
    @Body() signedMessageDto: SignedMessageDto,
  ) {
    return this.allowlistService.joinAllowlist(id, signedMessageDto.address);
  }

  @Post()
  @UseGuards(LoggedInGuard, SignedMessageGuard)
  async create(
    @Body() createCollectionDto: CreateAllowlistDto,
  ): Promise<Allowlist> {
    return this.allowlistService.createOne(createCollectionDto);
  }

  @UseGuards(IsAdminGuard, SignedMessageGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAllowlistDto: UpdateAllowlistDto,
  ): Promise<Allowlist> {
    return this.allowlistService.updateOne(id, updateAllowlistDto);
  }
}
