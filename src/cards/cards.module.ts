import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';

@Module({
  controllers: [CardsController],
})
export class CardsModule {}
