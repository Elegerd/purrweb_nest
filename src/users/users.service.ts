import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneByEmail(email: User['email']): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  async getMany(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async create(entry: CreateUserDto): Promise<User> {
    const { password, ...rest } = entry;
    const hash = await bcrypt.hash(password, 10);
    return await this.usersRepository.save({ password: hash, ...rest });
  }

  async update(id: User['id'], entry: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, entry);
    return this.usersRepository.findOne(id);
  }

  async remove(id: User['id']): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
