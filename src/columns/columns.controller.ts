import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Column } from './columns.entity';
import { ColumnsService } from './columns.service';

@ApiTags('Columns')
@Controller('columns')
export class ColumnsController {
  constructor(public columnsService: ColumnsService) {}

  @Get()
  @ApiOkResponse({ type: [Column] })
  findAll() {
    return this.columnsService.getMany();
  }

  @Get(':id')
  @ApiOkResponse({ type: Column })
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: Column['id']) {
    return this.columnsService.findOneById(id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  deleteOne(@Param('id') id: Column['id']) {
    return this.columnsService.remove(id);
  }
}
