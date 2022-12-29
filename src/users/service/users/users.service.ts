import { CreateUserDto } from './../../dto/CreateUser.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, UpdateUserParams } from 'src/users/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getUsers() {
    return this.userRepository.find();
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
}
