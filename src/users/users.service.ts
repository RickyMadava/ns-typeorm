import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile, Users } from './entities';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import {
  CreateProfileParams,
  CreateUserParams,
  UpdateUserParams,
} from 'src/utils/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find({ relations: ['profile'] });
  }

  async findOne(id: number): Promise<Users> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
  }

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

  async delete(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete({ id });
  }

  async createProfile(id: number, profileCreateDetails: CreateProfileParams) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    const newProfile = this.profileRepository.create(profileCreateDetails);
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;
    return this.usersRepository.save(user);
  }
}
