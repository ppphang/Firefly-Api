import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repo: UsersRepository, @Inject('REDIS') private readonly redis: Redis) {}

  async findAll(): Promise<User[]> {
    return this.repo.findAll();
  }

  async findOne(id: number): Promise<User | null> {
    const key = `user:${id}`;
    const cached = await this.redis.get(key);
    if (cached) {
      return JSON.parse(cached) as User;
    }
    const found = await this.repo.findById(id);
    if (found) {
      await this.redis.set(key, JSON.stringify(found), 'EX', 60);
    }
    return found;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const entity = this.repo.create(dto);
    const saved = await this.repo.save(entity);
    await this.redis.set(`user:${saved.id}`, JSON.stringify(saved), 'EX', 60);
    return saved;
  }

  async update(id: number, dto: UpdateUserDto): Promise<User | null> {
    const existing = await this.repo.findById(id);
    if (!existing) return null;
    const merged = this.repo.merge(existing, dto);
    const saved = await this.repo.save(merged);
    await this.redis.set(`user:${id}`, JSON.stringify(saved), 'EX', 60);
    return saved;
  }

  async remove(id: number): Promise<boolean> {
    await this.repo.delete(id);
    await this.redis.del(`user:${id}`);
    return true;
  }
}
