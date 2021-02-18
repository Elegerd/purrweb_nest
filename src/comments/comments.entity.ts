import { ApiProperty } from '@nestjs/swagger';
import { Card } from 'src/cards/cards.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 250 })
  value: string;

  @ManyToOne(() => Card, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cardId' })
  card: Card;

  @ApiProperty({ type: Number })
  @Column()
  cardId: Card['id'];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
