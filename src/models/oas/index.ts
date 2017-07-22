import {Spec} from 'swagger-schema-official';
import {metas} from '../metas/index';
import {IMeta} from '../metas/interfaces/IMeta';
import {IMap} from './interfaces/IMap';
import {IOperationExtended} from './interfaces/IOperationExtended';
import {IResource} from './interfaces/IResource';
import {info} from './methods/info';
import {operations} from './methods/operations';
import {resources} from './methods/resources';

export class OAS {
  metas: IMeta[];
  resources: IResource[];
  operations: IOperationExtended[];
  map: IMap;

  constructor(spec: Spec,
              url: string,
              defaultContentType: string = 'application/json',
              validatorUrl: string = 'http://online.swagger.io/validator') {
    info(spec, url, defaultContentType);
    this.map = {};
    this.metas = metas(spec, url, validatorUrl);
    this.resources = resources(spec, this.map);
    this.operations = operations(spec, this.resources, this.map);
  }
}
