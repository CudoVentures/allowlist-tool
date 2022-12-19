import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEmail } from 'class-validator';

export class JoinAllowlistDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty({ required: false })
  email: string;
}
