import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const uploadFileSchema: SchemaObject = {
  type: 'object',
  properties: {
    file: {
      type: 'string',
      format: 'binary',
    },
  },
};
