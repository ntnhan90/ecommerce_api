import { NumberField } from 'src/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RegisterResDto {
  @Expose()
  @NumberField()
  userId!: number;
}
