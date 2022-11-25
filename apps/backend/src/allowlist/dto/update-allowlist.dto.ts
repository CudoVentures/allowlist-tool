import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { SignedMessageDto } from './signed-message.dto';

export class UpdateAllowlistDto extends SignedMessageDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'New description' })
  description: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '2022-11-15' })
  end_time: string;
}
