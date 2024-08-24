

import { Uuid } from 'src/common/types/common.type';
//imp

import { 
  Body,
  Controller,
  Delete, 
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post, 
  Query } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


import { UsersService } from './users.service';


@ApiTags('users')
@Controller({
  path: 'user',
  version: '1'
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

 
  @Get('me')
  async getCurrentUser(){
    return "current User";
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
