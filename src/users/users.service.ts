import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './users.dto';
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

  async isExist(email: User['email']): Promise<User> {
    const user = await this.findOneByEmail(email);
    return user;
  }

  async getMany(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOrCreate(userDto: UserDto): Promise<User> {
    const existingUser = await this.isExist(userDto.email);
    if (existingUser) return existingUser;
    const user = await this.create(userDto);
    return user;
  }

  async create(entry: UserDto): Promise<User> {
    return this.usersRepository.save(entry);
  }

  async update(id: User['id'], entry: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, entry);
    return this.usersRepository.findOne(id);
  }

  async remove(id: User['id']): Promise<void> {
    this.usersRepository.delete(id);
  }
}
