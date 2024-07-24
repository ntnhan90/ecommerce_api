import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: 'Email khong duoc de trong'})
    @IsEmail({}, { message: 'Email khong dung dinh dang'})
    email: string;

    @IsNotEmpty({ message: 'Password khong duoc de trong'})
    password: string;

    @IsNotEmpty({ message: 'Username khong duoc de trong'})
    username: string;

    @IsNotEmpty({ message: 'First name khong duoc de trong'})
    first_name: string;

    @IsNotEmpty({ message: 'Last name khong duoc de trong'})
    last_name: string;
}
