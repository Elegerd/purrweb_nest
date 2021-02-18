import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Column } from './columns.entity';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(Column)
    private columnsRepository: Repository<Column>,
  ) {}

  async findAll(): Promise<Column[]> {
    try {
      return await this.columnsRepository.find();
    } catch (err) {
      throw new UnprocessableEntityException();
    }
  }

  async findOneById(id: Column['id']): Promise<Column> {
    try {
      return await this.columnsRepository.findOneOrFail(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async getMany(): Promise<Column[]> {
    return this.findAll();
  }

  async update(id: Column['id'], entry: Partial<Column>): Promise<Column> {
    await this.columnsRepository.update(id, entry);
    return this.findOneById(id);
  }

  async remove(id: Column['id']): Promise<void> {
    this.columnsRepository.delete(id);
  }
}
