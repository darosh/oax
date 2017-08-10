import {Spec} from 'swagger-schema-official';
import {IMeta} from '../../metas/interfaces/IMeta';
import {IMap} from './IMap';
import {IOperationExtended} from './IOperationExtended';
import {ITagExtended} from './ITagExtended';

export interface ISpecExtended extends Spec {
  _map: IMap;
  _metas: IMeta[];
  _operations: IOperationExtended[];
  tags: ITagExtended[];
  _scheme: string;
}
