import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { UserEntity } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        UsersModule,
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({})
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
