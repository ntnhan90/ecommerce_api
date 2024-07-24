import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import {genSaltSync, hashSync, compareSync} from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto) : Promise<User>{
    const hashPassword = this.getHashPassword(createUserDto.password);
    
    let user = await this.userRepo.save({
      email: createUserDto.email,
      password: hashPassword,
      username: createUserDto.username,
      first_name: createUserDto.first_name,
      last_name: createUserDto.last_name,
      isActive: 0,
      avatar_id: "0"
    });

    return user;
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
    const hashPassword = this.getHashPassword(updateUserDto.password);
    updateUserDto.password = hashPassword;
    return await this.userRepo.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }

  getHashPassword = (password: string) =>{
    var salt = genSaltSync(10);
    var hash = hashSync(password, salt);
    return hash;
  }

  isValidPassword(password:string, hash: string){
    return compareSync(password, hash);
  }
}
