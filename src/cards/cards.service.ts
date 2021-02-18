import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './cards.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
  ) {}

  async findAll(): Promise<Card[]> {
    try {
      return await this.cardsRepository.find();
    } catch (err) {
      throw new UnprocessableEntityException();
    }
  }

  async findOneById(id: Card['id']): Promise<Card> {
    try {
      return await this.cardsRepository.findOneOrFail(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async getMany(): Promise<Card[]> {
    return this.findAll();
  }

  async update(id: Card['id'], entry: Partial<Card>): Promise<Card> {
    await this.cardsRepository.update(id, entry);
    return this.findOneById(id);
  }

  async remove(id: Card['id']): Promise<void> {
    this.cardsRepository.delete(id);
  }
}
