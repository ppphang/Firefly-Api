import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '../redis/redis.module';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repository/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RedisModule],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
})
export class UsersModule {}
