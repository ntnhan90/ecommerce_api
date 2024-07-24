import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { ConfigModule } from 'nestjs-config';
import { SlugProvider } from './slug.provider';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Blog])
  ],
  controllers: [BlogController],
  providers: [
  //  SlugProvider,
    BlogService
  ],
})
export class BlogModule {}
