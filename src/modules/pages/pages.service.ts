import { Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page } from './entities/page.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Page)
    private readonly pageRepo: Repository<Page>,
  ){}

  create(createPageDto: CreatePageDto) {
    return 'This action adds a new page';
  }

  async findAll() {
    return await this.pageRepo.find();
  }

  async findOne(id: number) {
    return await this.pageRepo.findOne({
      where: {
        id: id
      }
    })
  }

  async update(id: number, updatePageDto: UpdatePageDto) {
    return await this.pageRepo.update(id, updatePageDto);
  }

  remove(id: number) {
    return `This action removes a #${id} page`;
  }
}
