import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
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

  async findAll(): Promise<User[]> {
    try {
      return await this.usersRepository.find();
    } catch (err) {
      throw new UnprocessableEntityException();
    }
  }

  async findOneById(id: User['id']): Promise<User> {
    try {
      return await this.usersRepository.findOneOrFail(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async findOneByEmail(email: User['email']): Promise<User> {
    try {
      return await this.usersRepository.findOneOrFail({ email });
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async isExist(email: User['email']): Promise<User> {
    const user = await this.findOneByEmail(email);
    return user;
  }

  async getMany(): Promise<User[]> {
    return this.findAll();
  }

  async findOrCreate(userDto: UserDto): Promise<User> {
    const existingUser = await this.isExist(userDto.email);
    if (existingUser) return existingUser;
    const user = await this.create(userDto);
    return user;
  }

  async create(entry: Partial<User>): Promise<User> {
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
