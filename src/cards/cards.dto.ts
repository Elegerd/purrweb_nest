import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsDefined, IsString, MaxLength, IsNumber } from 'class-validator';

export class CreateCardDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @MaxLength(50)
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(250)
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsDefined()
  columnId: number;

  @ApiProperty()
  @IsNumber()
  @IsDefined()
  ownerId: number;
}

export class UpdateCardDto extends OmitType(CreateCardDto, ['ownerId']) {}
