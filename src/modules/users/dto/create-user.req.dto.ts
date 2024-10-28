import { 
    EmailField,
    PasswordField,
    StringField,
    StringFieldOptional,
    NumberField
} from "src/decorators/field.decorators";
import { lowerCaseTransformer } from "src/utils/transformers/lower-case.transformer";
import { Transform } from "class-transformer";

export class CreateUserReqDto {
    @StringField()
    @Transform(lowerCaseTransformer)
    readonly username:string;

    @StringField()
    readonly first_name:string;
    
    @StringField()
    readonly last_name:string;

    @EmailField()
    readonly email:string;

    @PasswordField()
    readonly password:string;

    @StringFieldOptional()
    readonly avatar_id?: string;

    @NumberField()
    readonly isActive?:number
}

