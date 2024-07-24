import { Injectable } from '@nestjs/common';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepo: Repository<Contact>,
  ){}

  async create(createContactDto: CreateContactDto) : Promise<Contact> {
    return await this.contactRepo.save(createContactDto);
  }

  async findAll():Promise<Contact[]> {
    return await this.contactRepo.find();
  }

  async findOne(id: number): Promise<Contact> {
    return await this.contactRepo.findOne({
      where: {
        id: id
      }
    })
  }

  async update(id: number, updateContactDto: UpdateContactDto) : Promise<UpdateResult>{
    return await this.contactRepo.update(id, updateContactDto);
  }

  async remove(id: number): Promise<void> {
    await this.contactRepo.delete(id);
  }
}
