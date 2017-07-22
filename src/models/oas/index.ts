import {Spec} from 'swagger-schema-official';
import {metas} from '../metas/index';
import {IMeta} from '../metas/interfaces/IMeta';
import {IMap} from './interfaces/IMap';
import {IOperationExtended} from './interfaces/IOperationExtended';
import {IResource} from './interfaces/IResource';
import {info} from './methods/info';
import {operations} from './methods/operations';
import {resources} from './methods/resources';

export interface IOAS {
  metas: IMeta[];
  resources: IResource[];
  operations: IOperationExtended[];
  map: IMap;
}

export function OAS(spec: Spec,
                    url: string,
                    defaultContentType: string = 'application/json',
                    validatorUrl: string = 'http://online.swagger.io/validator'): IOAS {

  info(spec, url, defaultContentType);

  const MAP = {};
  const METAS = metas(spec, url, validatorUrl);
  const RESOURCES = resources(spec, MAP);
  const OPERATIONS = operations(spec, RESOURCES, MAP);

  return {
    map: MAP,
    metas: METAS,
    operations: OPERATIONS,
    resources: RESOURCES
  };
}
