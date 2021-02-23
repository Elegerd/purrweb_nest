import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Entity,
  Column as Col,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { classToPlain, Exclude } from 'class-transformer';
import { Column } from 'src/columns/columns.entity';
import { Card } from 'src/cards/cards.entity';
import { Comment } from 'src/comments/comments.entity';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Col({ length: 50 })
  name: string;

  @ApiProperty()
  @Col({ length: 50, unique: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Col({ length: 100 })
  password: string;

  @Exclude({ toPlainOnly: true })
  @Col({ nullable: true })
  readonly authCode?: string;

  @ApiPropertyOptional()
  @OneToMany(() => Column, (column) => column.owner, { cascade: true })
  columns: Column[];

  @ApiPropertyOptional()
  @OneToMany(() => Card, (column) => column.owner, { cascade: true })
  cards: Card[];

  @ApiPropertyOptional()
  @OneToMany(() => Comment, (column) => column.owner, { cascade: true })
  comments: Comment[];

  toJSON() {
    return classToPlain(this);
  }
}
