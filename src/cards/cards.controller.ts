import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Card } from './cards.entity';
import { CardsService } from './cards.service';

@ApiTags('Cards')
@Controller('cards')
export class CardsController {
  constructor(public cardsService: CardsService) {}

  @Get()
  @ApiOkResponse({ type: [Card] })
  findAll() {
    return this.cardsService.getMany();
  }

  @Get(':id')
  @ApiOkResponse({ type: Card })
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: Card['id']) {
    return this.cardsService.findOneById(id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  deleteOne(@Param('id') id: Card['id']) {
    return this.cardsService.remove(id);
  }
}
