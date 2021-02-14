import { Body, Controller, Get, Put, Delete, Param } from '@nestjs/common';
import { ApiBody, ApiParam, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './users.dto';
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

  @Put(':id')
  @ApiOkResponse({ type: User })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateUserDto })
  updateOne(@Param('id') id: User['id'], @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  deleteOne(@Param('id') id: User['id']) {
    return this.userService.remove(id);
  }
}
