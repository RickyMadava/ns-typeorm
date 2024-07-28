import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile, Users } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Profile])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
