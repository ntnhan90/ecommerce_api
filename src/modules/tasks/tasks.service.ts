import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ){}

  async create(createTaskDto: CreateTaskDto) : Promise<Task>{
    return await this.taskRepo.save(createTaskDto);
  }

  async findAll():Promise<Task[]> {
    return await this.taskRepo.find();
  }

  async findOne(id: number): Promise<Task>{
    //return await this.taskRepo.findOneBy({id});
    return await this.taskRepo.findOne({
      where: {
        id: id
      }
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) : Promise<UpdateResult> {
    return await this.taskRepo.update(id, updateTaskDto);
  }

  async remove(id: number) :Promise<void>{
    await this.taskRepo.delete(id);
  }
}
