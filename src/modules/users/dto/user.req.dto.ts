import { 
    NumberField,
    ClassField,
    StringField,
    StringFieldOptional
} from "src/decorators/field.decorators";
import { Exclude, Expose } from "class-transformer";

Exclude()
export class UserResDto {
    @NumberField()
    @Expose()
    id:number

    @StringField()
    @Expose()
    email: string;

    @StringField()
    @Expose()
    username: string;

    @StringField()
    @Expose()
    password: string;

    @ClassField(() => Date)
    @Expose()
    createdAt: Date;

    @ClassField(() => Date)
    @Expose()
    updatedAt: Date;

}