import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,
  ){}

  async create(createTagDto: CreateTagDto) {
    //return 'This action adds a new qrcode'; 
    return await this.tagRepo.save(createTagDto);
  }

  async findAll() {
    return await this.tagRepo.find();
  }

  async findOne(id: number) {
    return await this.tagRepo.findOne({
      where: {
        id: id
      }
    })
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    return await this.tagRepo.update(id, updateTagDto);
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
