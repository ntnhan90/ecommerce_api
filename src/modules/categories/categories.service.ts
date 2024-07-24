import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly cateRepo: Repository<Category>,
  ){}


  async create(createCategoryDto: CreateCategoryDto) {
    //let order = await this.cateRepo.count;
    let cate = await this.cateRepo.save(createCategoryDto);
    return cate;
  }

  async findAll() {
    return await this.cateRepo.find();
  }

  async findOne(id: number) {
    return await this.cateRepo.findOne({
      where: {
        id: id
      }
    })
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.cateRepo.update(id, updateCategoryDto);
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
