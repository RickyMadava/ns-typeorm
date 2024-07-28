import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  // async findOne(id: number): Promise<Users> {
  //   return this.usersRepository.findOne(id);
  // }

  async create(userDetails: CreateUserParams): Promise<Users> {
    const newUser = this.usersRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    return this.usersRepository.save(newUser);
  }

  async update(
    id: number,
    updateUserDetails: UpdateUserParams,
  ): Promise<UpdateResult> {
    return this.usersRepository.update({ id }, { ...updateUserDetails });
  }
}
