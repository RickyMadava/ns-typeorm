import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.create.dto';
import { UpdateUserDto } from './dto/users.update.dto';
import { ProfileCreateDto } from './dto/profile.create.dto';
import { CreatePostDto } from './dto/post.create.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.delete(id);
  }

  @Post(':id/profiles')
  async createProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() profileCreateDto: ProfileCreateDto,
  ) {
    return await this.usersService.createProfile(id, profileCreateDto);
  }

  @Post(':id/posts')
  async createPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() postCreateDto: CreatePostDto,
  ) {
    return await this.usersService.createPost(id, postCreateDto);
  }
}
