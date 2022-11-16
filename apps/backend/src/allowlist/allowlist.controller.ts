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
import { UpdateAllowlistDto } from './dto/update-allowlist.dto';
import { IsAdminGuard } from './guards/is-admin.guard';

@ApiTags('Allowlist')
@Controller('allowlist')
export class AllowlistController {
  constructor(private allowlistService: AllowlistService) {}

  @Get('all')
  async findAll(@Request() req): Promise<Allowlist[]> {
    return await this.allowlistService.findAll();
  }

  @Get()
  async findByAdmin(@Request() req): Promise<Allowlist[]> {
    return await this.allowlistService.findByAdmin(req.user.id);
  }

  @UseGuards(LoggedInGuard)
  @Post()
  async create(
    @Request() req,
    @Body() createCollectionDto: CreateAllowlistDto,
  ): Promise<Allowlist> {
    return this.allowlistService.createOne(
      createCollectionDto,
      req.session.user.id,
    );
  }

  @UseGuards(IsAdminGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAllowlistDto: UpdateAllowlistDto,
  ): Promise<Allowlist> {
    return this.allowlistService.updateOne(id, updateAllowlistDto);
  }
}
