import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { classToPlain, Exclude } from 'class-transformer';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 50 })
  name: string;

  @ApiProperty()
  @Column({ length: 50, unique: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column({ length: 100 })
  password: string;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true })
  readonly authCode?: string;

  toJSON() {
    return classToPlain(this);
  }
}
