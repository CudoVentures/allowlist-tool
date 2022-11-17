import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAllowlistDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 'New description' })
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: '2022-11-15' })
  end_time: string;
}
