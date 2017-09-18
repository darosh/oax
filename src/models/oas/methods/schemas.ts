import {BodyParameter} from 'swagger-schema-official';
import {IOperationExtended} from '../interfaces/IOperationExtended';
import {ISpecExtended} from '../interfaces/ISpecExtended';

export function schemas(op: IOperationExtended, spec: ISpecExtended) {
  const ret: { [key: string]: boolean } = {};

  if (op.responses) {
    for (const responseName in op.responses) {
      if (op.responses[responseName].schema) {
        const k = schemaName(op.responses[responseName].schema, spec);

        if (k) {
          ret[k] = true;
        }
      }
    }
  }

  if (op.parameters) {
    for (const param of op.parameters) {
      if ((param as BodyParameter).schema) {
        const k = schemaName((param as BodyParameter).schema, spec);

        if (k) {
          ret[k] = true;
        }
      }
    }
  }

  return Object.keys(ret);
}

export function schemaName(schema: any, spec: ISpecExtended) {
  for (const key in spec.definitions) {
    if (spec.definitions[key] === schema) {
      return key;
    }
  }

  return null;
}
