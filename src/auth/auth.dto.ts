import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class SignInDto {
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

export class VerificationDto {
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

  @ApiProperty({ example: 1234 })
  @IsDefined()
  @IsNumber()
  @Min(1000)
  @Max(9999)
  authCode: number;
}
