import { CursorPaginationDto } from 'src/common/dto/cursor-pagination/cursor-pagination.dto';
import { CursorPaginatedDto } from 'src/common/dto/cursor-pagination/paginated.dto';
import { OffsetPaginatedDto } from 'src/common/dto/offset-pagination/paginated.dto';

import { SYSTEM_USER_ID } from 'src/constants/app.constant';
import { ErrorCode } from 'src/constants/error-code.constant';
import { ValidationException } from 'src/exceptions/validation.exception';
import { buildPaginator } from 'src/utils/cursor-pagination';
import { paginate } from 'src/utils/offset-pagination';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import assert from 'assert';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateUserReqDto } from './dto/create-user.req.dto';
import { ListUserReqDto } from './dto/list-user.req.dto';
import { LoadMoreUsersReqDto } from './dto/load-more-users.req.dto';
import { UpdateUserReqDto } from './dto/update-user.req.dto';
import { UserResDto } from './dto/user.req.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ){}

    async create(createUserDto: CreateUserReqDto) : Promise<UserResDto>  {
        const {  email, username, password, first_name, last_name, avatar_id,isActive } = createUserDto;
        
        ///check unique of username / email
        const user = await this.usersRepository.findOne({
            where:[
                {
                    username,
                },
                {
                    email,
                },
            ],
        }); 
        if(user){
            throw new ValidationException(ErrorCode.E001)
        }

        const newUser = new UserEntity();
        
        newUser.email = email;
        newUser.username = username;
        newUser.password =  password,
        newUser.first_name =  first_name;
        newUser.last_name =  last_name;
        newUser.avatar_id =  " ";
        newUser.isActive =  isActive;

        const savedUser = await this.usersRepository.save(newUser);
      //  this.logger.debug(savedUser);
       
        return plainToInstance(UserResDto, savedUser);
    }

    async findAll(
        reqDto: ListUserReqDto,
    ): Promise<OffsetPaginatedDto<UserResDto>> {
        const query = this.usersRepository
          .createQueryBuilder('user')
          .orderBy('user.created_at', 'DESC');
        const [users, metaDto] = await paginate<UserEntity>(query, reqDto, {
          skipCount: false,
          takeAll: false,
        });
        return new OffsetPaginatedDto(plainToInstance(UserResDto, users), metaDto);
    }

    /*
    findAll(): Promise<UserEntity[]> {
        return this.usersRepository.find();
    }
    
    
    findOne(id: number) {
        return `This action returns a #${id} user`;
    }
    */
    async findOne(id: number): Promise<UserResDto | null> {
        
        return this.usersRepository.findOneByOrFail({ id });
    }

    async update(id: number, updateUserDto: UpdateUserReqDto) {
        const user = await this.usersRepository.findOneByOrFail({ id });
        user.password =  updateUserDto.password,
        user.first_name =  updateUserDto.first_name;
        user.last_name =  updateUserDto.last_name;
        user.avatar_id =  updateUserDto.avatar_id;
        user.isActive =  updateUserDto.isActive;

        return this.usersRepository.save(user);
    }

    async remove(id: number) {
        await this.usersRepository.findOneByOrFail({ id });
        await this.usersRepository.softDelete(id);
       // return `This action removes a #${id} user`;
    }

    // update Token
    updateUserToken = async ( refreshToken: string, id: number) => {
        const user = await this.usersRepository.findOneByOrFail({ id });
        user.refresh_token = refreshToken
        return await this.usersRepository.save(user);
    }

    findUserByToken = async(refreshToken: string) => {
        const user = await this.usersRepository.findOne({
            where:[
                { refresh_token:  refreshToken },
            ],
        }); 
    }
}
