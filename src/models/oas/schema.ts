import {Schema} from 'swagger-schema-official';
import {IOperationExtended} from './IOperationExtended';

export function schema(operation: IOperationExtended) {
  for (const code in operation.responses) {
    const response = operation.responses[code];

    if (response.schema) {
      return response.schema
    }
  }
}

export function value(schema: Schema): any {
  if (schema.example) {
    return schema.example;
  }

  const type = schema.format || schema.type

  switch (type) {
    case 'int32':
    case 'int64':
    case 'integer':
      return 0;
    case 'float':
    case 'double':
    case 'number':
      return 0.5;
    case 'string':
      return 'string';
    case 'byte':
      return btoa('string');
    case 'binary':
      return 'binary';
    case 'boolean':
      return false;
    case 'date':
      return (new Date(0)).toISOString().split('T')[0];
    case 'date-time':
      return (new Date(0)).toISOString();
    case 'password':
      return 'password';
  }
}
