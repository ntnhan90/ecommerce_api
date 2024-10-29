import { Branded } from 'src/common/types/types';
import { AllConfigType } from 'src/config/config.type';
import { SYSTEM_USER_ID } from 'src/constants/app.constant';
import { MailService } from 'src/mail/mail.service';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { ConfigService} from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';

import ms from 'ms';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { LoginReqDto } from './dto/login.req.dto';
import { LoginResDto } from './dto/login.res.dto';
import { RefreshReqDto } from './dto/refresh.req.dto';
import { RefreshResDto } from './dto/refresh.res.dto';
import { RegisterReqDto } from './dto/register.req.dto';
import { RegisterResDto } from './dto/register.res.dto';
import { JwtPayloadType } from './type/jwt-payload.type';
import { JwtRefreshPayloadType } from './type/jwt-refresh-payload.type';

type Token = Branded<
  {
    accessToken: string;
    refreshToken: string;
    tokenExpires: number;
  },
  'token'
>;


@Injectable()
export class AuthService {
    constructor(
		private jwtService: JwtService,
		private usersService: UsersService,
		private configService: ConfigService,
      	@InjectRepository(UserEntity)
    	private readonly userRepository: Repository<UserEntity>,
    ){}

    async signIn(dto: LoginReqDto): Promise<LoginResDto> {
        const { email, password} = dto;
        const user = await this.userRepository.findOne({
			where: { email },
      		select: ['id', 'email', 'password'],
		})

        return plainToInstance(LoginResDto, {
			userId: user.id,
		}); 
    }
}
