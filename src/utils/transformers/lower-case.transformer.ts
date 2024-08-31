import type { TransformFnParams } from "class-transformer";

export const lowerCaseTransformer = (parems: TransformFnParams): string =>
    parems.value?.toLowerCase().trim();
