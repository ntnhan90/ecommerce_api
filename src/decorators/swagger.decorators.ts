import { CursorPaginatedDto } from 'src/common/dto/cursor-pagination/paginated.dto';
import { OffsetPaginatedDto } from 'src/common/dto/offset-pagination/paginated.dto';
import { type Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  type ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';

export const ApiPaginatedResponse = <T extends Type<any>>(options: {
  type: T;
  description?: string;
  paginationType?: 'offset' | 'cursor';
}): MethodDecorator => {
  return applyDecorators(
    ApiExtraModels(
      options.paginationType === 'offset'
        ? OffsetPaginatedDto
        : CursorPaginatedDto,
      options.type,
    ),
    ApiOkResponse({
      description:
        options.description || `Paginated list of ${options.type.name}`,
      schema: {
        title: `PaginatedResponseOf${options.type.name}`,
        allOf: [
          {
            $ref: getSchemaPath(
              options.paginationType === 'offset'
                ? OffsetPaginatedDto
                : CursorPaginatedDto,
            ),
          },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(options.type) },
              },
            },
          },
        ],
      },
    } as ApiResponseOptions | undefined),
  );
};
