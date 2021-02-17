import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column as Col, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Column {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Col({ length: 50 })
  title: string;
}
