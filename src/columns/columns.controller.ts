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
import { CreateColumnDto, UpdateColumnDto } from './columns.dto';
import { Column } from './columns.entity';
import { ColumnsService } from './columns.service';

@ApiTags('Columns')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('columns')
export class ColumnsController {
  constructor(public columnsService: ColumnsService) {}

  @Get()
  @ApiOkResponse({ type: Column, isArray: true })
  findAll() {
    return this.columnsService.getMany();
  }

  @Get(':id')
  @ApiOkResponse({ type: Column })
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: Column['id']) {
    return this.columnsService.findOneById(id);
  }

  @Post()
  @ApiOkResponse({ type: Column })
  createOne(@Body() createColumnDto: CreateColumnDto) {
    return this.columnsService.create(createColumnDto);
  }

  @Put(':id')
  @ApiOkResponse({ type: Column })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateColumnDto })
  updateOne(
    @Param('id') id: Column['id'],
    @Body() updateColumnDto: UpdateColumnDto,
  ) {
    return this.columnsService.update(id, updateColumnDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  deleteOne(@Param('id') id: Column['id']) {
    return this.columnsService.remove(id);
  }
}
