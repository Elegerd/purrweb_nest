import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, MaxLength } from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @MaxLength(50)
  email: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  password: string;
}
