import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}
    
      async findOne(username: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { username } });
      }
          
      async create(user: Partial<User>): Promise<User> {
        return this.usersRepository.save(user);
      }

      async findAll(): Promise<User[]> {
        return this.usersRepository.find();
      }
}
