import { CreateCustomerDto } from './create-customer.dto';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class UpdateCustomerDto extends OmitType(CreateCustomerDto, ['email'] as const){
    id:number
}

