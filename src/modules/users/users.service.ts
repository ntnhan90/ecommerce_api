import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto) : Promise<User>{
    return await this.userRepo.save(createUserDto);
  }

  async findAll():Promise<User[]> {
    return await this.userRepo.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepo.findOne({
      where: {
        id: id
      }
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return await this.userRepo.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }
}
