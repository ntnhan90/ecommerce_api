import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import {genSaltSync, hashSync, compareSync} from 'bcryptjs';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ){}

  async create(createCustomerDto: CreateCustomerDto) {
    const hashPassword = this.getHashPassword(createCustomerDto.password);
    
    let customer = await this.customerRepo.save({
      email: createCustomerDto.email,
      password: hashPassword,
      name: createCustomerDto.name,
      avatar: createCustomerDto.avatar,
      is_vendor: 0,
      dob: createCustomerDto.dob,
    });

    return customer;
  }

  async findAll() {
    return await this.customerRepo.find();
  }

  async findOne(id: number) {
    return await this.customerRepo.findOne({
      where: {
        id: id
      }
    })
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const hashPassword = this.getHashPassword(updateCustomerDto.password);
    updateCustomerDto.password = hashPassword;
    return await this.customerRepo.update(id, updateCustomerDto);
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
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
