import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Post';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import {
  CreatePostParams,
  CreateUserParams,
  CreateUserProfileParams,
  UpdateUserParams,
} from 'src/users/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileReposittory: Repository<Profile>,
    @InjectRepository(Post) private postReposittory: Repository<Post>,
  ) {}

  getUsers() {
    return this.userRepository.find({ relations: ['profile', 'posts'] });
  }

  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create(userDetails);
    return this.userRepository.save(newUser);
  }

  updateUser(id: number, payload: UpdateUserParams) {
    return this.userRepository.update({ id: id }, payload);
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }

  async createUserProfile(id: number, payload: CreateUserProfileParams) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException(
        'User Not found. Profile can not creat ',
        HttpStatus.BAD_REQUEST,
      );
    }
    const profile = this.profileReposittory.create(payload);
    await this.profileReposittory.save(profile);
    user.profile = profile;
    return this.userRepository.save(user);
  }

  async createPost(id: number, payload: CreatePostParams) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException(
        'User Not found. Profile can not creat ',
        HttpStatus.BAD_REQUEST,
      );
    }
    const post = this.postReposittory.create({ ...payload, user });
    return this.postReposittory.save(post);
  }

  getPosts() {
    return this.postReposittory.find();
  }
}
