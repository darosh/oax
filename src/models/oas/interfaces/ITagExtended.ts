import {Tag} from 'swagger-schema-official';
import {IOperationExtended} from './IOperationExtended';

export interface ITagExtended extends Tag {
  _operations?: IOperationExtended[];
  _opened?: boolean;
  _display?: boolean;
}
