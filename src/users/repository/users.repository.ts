import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  findAll() {
    return this.repo.find();
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  create(dto: CreateUserDto) {
    return this.repo.create(dto);
  }

  merge(existing: User, dto: UpdateUserDto) {
    return this.repo.merge(existing, dto);
  }

  save(entity: User) {
    return this.repo.save(entity);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}

