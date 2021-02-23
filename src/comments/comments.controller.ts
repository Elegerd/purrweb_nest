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
import { CreateCommentDto, UpdateCommentDto } from './comments.dto';
import { Comment } from './comments.entity';
import { CommentsService } from './comments.service';

@ApiTags('Comments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(public commentsService: CommentsService) {}

  @Get()
  @ApiOkResponse({ type: Comment, isArray: true })
  findAll() {
    return this.commentsService.getMany();
  }

  @Get(':id')
  @ApiOkResponse({ type: Comment })
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: Comment['id']) {
    return this.commentsService.findOneById(id);
  }

  @Post()
  @ApiOkResponse({ type: Comment })
  createOne(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Put(':id')
  @ApiOkResponse({ type: Comment })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateCommentDto })
  updateOne(
    @Param('id') id: Comment['id'],
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  deleteOne(@Param('id') id: Comment['id']) {
    return this.commentsService.remove(id);
  }
}
