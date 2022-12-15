import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEmail } from 'class-validator';
import { SignedMessageDto } from './signed-message.dto';

export class JoinAllowlistDto extends SignedMessageDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty({ required: false })
  email: string;
}
