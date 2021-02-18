import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Comment } from './comments.entity';
import { CommentsService } from './comments.service';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(public commentsService: CommentsService) {}

  @Get()
  @ApiOkResponse({ type: [Comment] })
  findAll() {
    return this.commentsService.getMany();
  }

  @Get(':id')
  @ApiOkResponse({ type: Comment })
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: Comment['id']) {
    return this.commentsService.findOneById(id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  deleteOne(@Param('id') id: Comment['id']) {
    return this.commentsService.remove(id);
  }
}
