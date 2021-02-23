import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsDefined, IsString, MaxLength, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @MaxLength(250)
  title: string;

  @ApiProperty()
  @IsNumber()
  @IsDefined()
  cardId: number;

  @ApiProperty()
  @IsNumber()
  @IsDefined()
  ownerId: number;
}

export class UpdateCommentDto extends OmitType(CreateCommentDto, ['ownerId']) {}
