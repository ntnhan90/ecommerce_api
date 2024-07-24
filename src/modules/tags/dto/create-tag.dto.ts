
import { IsNotEmpty } from "class-validator";

export class CreateTagDto {
    @IsNotEmpty({ message: 'Author khong duoc de trong'})
    author_id: number;

    @IsNotEmpty({ message: 'Name khong duoc de trong'})
    name: string;

}

