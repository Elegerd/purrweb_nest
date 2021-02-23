import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comments.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async findAll(): Promise<Comment[]> {
    try {
      return await this.commentsRepository.find();
    } catch (err) {
      throw new UnprocessableEntityException();
    }
  }

  async findOneById(id: Comment['id']): Promise<Comment> {
    try {
      return await this.commentsRepository.findOneOrFail(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async getMany(): Promise<Comment[]> {
    return this.findAll();
  }

  async update(id: Comment['id'], entry: Partial<Comment>): Promise<Comment> {
    await this.commentsRepository.update(id, entry);
    return this.findOneById(id);
  }

  async remove(id: Comment['id']): Promise<void> {
    this.commentsRepository.delete(id);
  }

  async create(entry: Partial<Comment>) {
    this.commentsRepository.save(entry);
  }
}
