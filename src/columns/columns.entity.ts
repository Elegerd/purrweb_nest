import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Card } from 'src/cards/cards.entity';
import { User } from 'src/users/users.entity';
import {
  Entity,
  Column as Col,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Column {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Col({ length: 50 })
  title: string;

  @ManyToOne(() => Column, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @ApiProperty({ type: Number })
  @Col()
  ownerId: User['id'];

  @ApiPropertyOptional()
  @OneToMany(() => Card, (card) => card.column, { cascade: true })
  cards: Card[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
