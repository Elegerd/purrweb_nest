import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsDefined,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  readonly id?: number;

  @ApiProperty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  readonly password: string;

  @ApiProperty()
  @IsString()
  readonly authCode?: string;
}

export class CreateUserDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @MaxLength(50)
  email: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password: string;
}

export class UpdateUserDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @MaxLength(50)
  email: string;
}
