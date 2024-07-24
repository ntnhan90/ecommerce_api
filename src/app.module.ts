import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './modules/tasks/tasks.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import { QrcodeModule } from './modules/qrcode/qrcode.module';
import { CustomerModule } from './modules/customer/customer.module';
import { BlogModule } from './modules/blog/blog.module';
import { PagesModule } from './modules/pages/pages.module';
import { MediaModule } from './modules/media/media.module';
import { ContactModule } from './modules/contact/contact.module';
import { ProductTagsModule } from './modules/product-tags/product-tags.module';
import { TagsModule } from './modules/tags/tags.module';
import { ProductCategoriesModule } from './modules/product-categories/product-categories.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8889,
      username: 'root',
      password: 'root',
      database: 'ecommerce',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    TasksModule,
    AuthModule,
    ProductModule,
    OrderModule,
    QrcodeModule,
    CustomerModule,
    BlogModule,
    PagesModule,
    MediaModule,
    ContactModule,
    ProductCategoriesModule,
    ProductTagsModule,
    TagsModule,
    ProductCategoriesModule,
    CategoriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
