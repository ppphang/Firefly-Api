import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Controller('users')
@ApiTags('用户')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  @ApiOkResponse({ type: [User] })
  async findAll(): Promise<User[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: User })
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.service.findOne(Number(id));
  }

  @Post()
  @ApiOkResponse({ type: User })
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return this.service.create(dto);
  }

  @Put(':id')
  @ApiOkResponse({ type: User })
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<User | null> {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  @ApiOkResponse({ schema: { type: 'boolean' } })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.service.remove(Number(id));
  }
}

