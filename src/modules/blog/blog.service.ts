import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { SlugProvider } from './slug.provider';

@Injectable()
export class BlogService {
  constructor( 
    @InjectRepository(Blog)
    private readonly blogRepo:Repository<Blog>,
  //  private readonly slugProvider: SlugProvider
  ){}

  create(createBlogDto: CreateBlogDto) {
    return 'This action adds a new blog';
  }

  findAll() {
    return `This action returns all blog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }

 // async uniqueSlug(blog: Blog): Promise<Blog>{
   // blog.slug = await this.slugProvider.slugify(blog.name);
//    const exist = await this.findSlugs(blog.slug)

 ///   return "blog";
 // }

  private async findSlugs(slug:string) : Promise<Blog[]>{
    return await this.blogRepo
      .createQueryBuilder('blog')
      .where('slug like:slug', { slug: `${slug}%` })
      .getMany();
  }
}
