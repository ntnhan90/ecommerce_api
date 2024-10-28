import { PartialType } from '@nestjs/swagger';
import { CreateUserReqDto } from './create-user.req.dto';
import { OmitType } from '@nestjs/swagger';

export class UpdateUserReqDto extends OmitType(CreateUserReqDto,[
    'username',
    'email',
   // 'password',
 //   'isActive'
] as const) {}
