import { Module } from "@nestjs/common";
import { TaskModule } from "./task/task.module";
import { CategoriesModule } from "./categories/categories.module";
import { UsersModule } from "./users/users.module";
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';

@Module({
    imports: [
        UsersModule,
        TaskModule,
        CategoriesModule,
        HealthModule,
        AuthModule,
        HomeModule
    ]
})

export class ApiModule{}