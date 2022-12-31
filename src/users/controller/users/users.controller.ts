import { UsersService } from 'src/users/service/users/users.service';
import { CreateUserDto } from './../../dto/CreateUser.dto';
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
import { UpdateUserDto } from 'src/users/dto/UpdateUser.dto';
import { CreateUserProfileDto } from 'src/users/dto/CreateUserProfile.dto';
import { CreatePostDto } from 'src/users/dto/CreatePost.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getUsers() {
    const users = await this.userService.getUsers();
    return users;
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    await this.userService.updateUser(id, payload);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }

  @Post(':id/profiles')
  creteUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateUserProfileDto,
  ) {
    return this.userService.createUserProfile(id, payload);
  }

  @Post(':id/post')
  createPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreatePostDto,
  ) {
    return this.userService.createPost(id, payload);
  }

  @Get('posts')
  getPosts() {
    return this.userService.getPosts();
  }
}
