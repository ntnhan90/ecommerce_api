import { IsNotEmpty } from "class-validator";

export class CreatePageDto {
    @IsNotEmpty({ message: 'Name khong duoc de trong'})
    name: string;
}
