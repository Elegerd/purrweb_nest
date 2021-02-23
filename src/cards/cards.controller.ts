import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateCardDto, UpdateCardDto } from './cards.dto';
import { Card } from './cards.entity';
import { CardsService } from './cards.service';

@ApiTags('Cards')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cards')
export class CardsController {
  constructor(public cardsService: CardsService) {}

  @Get()
  @ApiOkResponse({ type: Card, isArray: true })
  findAll() {
    return this.cardsService.getMany();
  }

  @Get(':id')
  @ApiOkResponse({ type: Card })
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: Card['id']) {
    return this.cardsService.findOneById(id);
  }

  @Post()
  @ApiOkResponse({ type: Card })
  createOne(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Put(':id')
  @ApiOkResponse({ type: Card })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateCardDto })
  updateOne(@Param('id') id: Card['id'], @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(id, updateCardDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  deleteOne(@Param('id') id: Card['id']) {
    return this.cardsService.remove(id);
  }
}
