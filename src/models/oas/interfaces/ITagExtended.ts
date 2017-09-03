import {Tag} from 'swagger-schema-official';
import {IOperationExtended} from './IOperationExtended';

export interface ITagObservable {
  _opened?: boolean;
  _display?: boolean;
  description?: string;
  description_html?: boolean;
}

export interface ITagExtended extends Tag {
  _operations?: IOperationExtended[];
  _: ITagObservable;
}
