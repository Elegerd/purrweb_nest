import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(public userService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: [User] })
  findAll() {
    return this.userService.getMany();
  }

  @Post()
  @ApiOkResponse({ type: User })
  @ApiBody({ type: CreateUserDto })
  createOne(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }

  @Put(':id')
  @ApiOkResponse({ type: User })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateUserDto })
  updateOne(@Param('id') id: User['id'], @Body() userDto: UpdateUserDto) {
    return this.userService.update(id, userDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  deleteOne(@Param('id') id: User['id']) {
    return this.userService.remove(id);
  }
}
