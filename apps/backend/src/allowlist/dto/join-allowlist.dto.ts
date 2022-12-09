import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { SignedMessageDto } from './signed-message.dto';

export class JoinAllowlistDto extends SignedMessageDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  email: string;
}
