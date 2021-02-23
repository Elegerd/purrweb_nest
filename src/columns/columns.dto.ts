import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateColumnDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @MaxLength(50)
  title: string;

  @ApiProperty()
  @IsNumber()
  @IsDefined()
  ownerId: number;
}

export class UpdateColumnDto extends OmitType(CreateColumnDto, ['ownerId']) {}
