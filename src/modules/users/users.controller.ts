import { CursorPaginatedDto } from 'src/common/dto/cursor-pagination/paginated.dto';
import { OffsetPaginatedDto } from 'src/common/dto/offset-pagination/paginated.dto';
import { Uuid } from 'src/common/types/common.type';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { ApiAuth, ApiPublic } from 'src/decorators/http.decorators';
import { 
  Body,
  Controller,
  Delete, 
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post, 
  Query 
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateUserReqDto } from './dto/create-user.req.dto';
import { ListUserReqDto } from './dto/list-user.req.dto';
import { LoadMoreUsersReqDto } from './dto/load-more-users.req.dto';
import { UpdateUserReqDto } from './dto/update-user.req.dto';
import { UserResDto } from './dto/user.req.dto';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';

@ApiTags('users')
@Controller({
  path: 'user',
  version: '1'
})
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Get('me')
    @ApiAuth({
        summary: 'Get current user'
    })
    async getCurrentUser(){
        return "current User";
    }

    @Post()
    @ApiPublic({
        type: UserResDto,
        summary: 'Create user',
        statusCode: HttpStatus.CREATED,
    })
    create(@Body() createUserDto: CreateUserReqDto): Promise<UserResDto> {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @ApiPublic({ 
        type: UserResDto,
        summary: 'List users',
        //isPaginated: true,
    })
    async findAll(
        @Query() reqDto: ListUserReqDto
    ):Promise<OffsetPaginatedDto<UserResDto>> {
        return this.usersService.findAll(reqDto);
    }

    @Get(':id')
    @ApiPublic({type: UserResDto, summary: "Find User by id"})
    @ApiParam({name:"id", type:"number"})
    async findOne(@Param('id') id: number) : Promise<UserResDto>{
        return await this.usersService.findOne(id);
    }

    @Patch(':id')
    @ApiPublic({ type: UserResDto, summary: 'Update user' })
    @ApiParam({ name: 'id', type: 'number' })
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserReqDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    @ApiPublic({
        summary: 'Delete user',
        errorResponses: [400, 401, 403, 404, 500],
    })
    @ApiParam({ name: 'id', type: 'number' })
    remove(@Param('id') id: number) {
        return this.usersService.remove(id);
    }

    @ApiAuth({
        summary: 'Change password user',
    })
    @Post('me/change-password')
    async changePassword() {
        return 'change-password';
    }
}
