import {  IsNotEmpty } from 'class-validator';


export class CreateTaskDto {
    @IsNotEmpty({ message: 'Name khong duoc de trong'})
    id: number;

    @IsNotEmpty({ message: 'Name khong duoc de trong'})
    name: string;

    isDone: boolean;

    description: string;
}
