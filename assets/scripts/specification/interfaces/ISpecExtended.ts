import {Spec} from 'swagger-schema-official';
import {IMeta} from '../../../utils/metas/interfaces/IMeta';
import {IInfoExtended} from './IInfoExtended';
import {IMap} from './IMap';
import {IOperationExtended} from './IOperationExtended';
import {ITagExtended} from './ITagExtended';

export interface ISpecObservable {
  _scheme: string;
}

export interface ISpecExtended extends Spec {
  _map: IMap;
  _metas: IMeta[];
  _operations: IOperationExtended[];
  info: IInfoExtended;
  tags: ITagExtended[];
  // securityDefinitions: IBaseSecurityExtended;
  _: ISpecObservable;
}
