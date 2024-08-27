import { isValidationOptions, ValidateIf, type ValidationOptions } from "class-validator";
import { IsNull } from "typeorm";

export function IsNullable(options?: ValidationOptions): PropertyDecorator{
    return ValidateIf((_obj, value) => value !== null, options);
}