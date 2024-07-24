import { IsNotEmpty, IsEmail } from "class-validator";

export class CreateCustomerDto {
    @IsEmail({}, { message: 'Email khong dung dinh dang'})
    @IsNotEmpty({ message: 'Email khong duoc de trong'})
    email: string;    

    @IsNotEmpty({ message: 'Name khong duoc de trong'})
    name: string;

    @IsNotEmpty({ message: 'Order khong duoc de trong'})
    phone: string;

    avatar: string;

    @IsNotEmpty({ message: 'Order khong duoc de trong'})
    password: string;

    @IsNotEmpty({ message: 'Order khong duoc de trong'})
    dob: string;
}
