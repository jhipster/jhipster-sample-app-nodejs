import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/user.entity';
import { UserRepository } from '../repository/user.repository';
import { FindManyOptions, FindOneOptions, UpdateResult, FindConditions, DeleteResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

  async findById(id: string): Promise<User | undefined> {
    return await this.userRepository.findOne(id);
  }

  async findByfields(options: FindOneOptions<User>): Promise<any | undefined> {
    return await this.userRepository.findOne(options);
  }

  async find(options: FindManyOptions<User>): Promise<User[] | undefined> {
    return await this.userRepository.find(options);
  }

  async findAndCount(options: FindManyOptions<User>): Promise<[User[], number]> {
    return await this.userRepository.findAndCount(options);
  }

  async save(user: User): Promise<User | undefined> {
    return await this.userRepository.save(user);
  }

  async update(id: string, user: User): Promise<UpdateResult | undefined> {
    return await this.userRepository.update(id, user);
  }

  async delete(options: FindConditions<User>): Promise<DeleteResult | undefined> {
    return await this.userRepository.delete(options);
  }
}
