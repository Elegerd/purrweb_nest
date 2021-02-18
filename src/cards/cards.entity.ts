import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column } from 'src/columns/columns.entity';
import { Comment } from 'src/comments/comments.entity';
import {
  Entity,
  Column as Col,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Card {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Col({ length: 50 })
  title: string;

  @ApiPropertyOptional()
  @Col({ length: 250 })
  description: string;

  @ManyToOne(() => Column, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'columnId' })
  column: Column;

  @ApiProperty({ type: Number })
  @Col()
  columnId: Column['id'];

  @ApiPropertyOptional()
  @OneToMany(() => Comment, (comment) => comment.card, { cascade: true })
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
