import {Operation, Parameter} from 'swagger-schema-official';
import {IParameterExtended} from './IParameterExtended';
import {IResponseExtended} from './IResponseExtended';

export interface IOperationObservable {
  _display?: boolean;
  _produces: string;
  _error: any;
  _result: any;
  _md_description?: string;
  _md_summary?: string;

  description?: string;
  summary?: string;
}

export interface IOperationExtended extends Operation {
  _id: number;
  _method: string;
  _pathName: string;
  parameters?: Parameter[] & IParameterExtended[];
  responses: { [responseName: string]: IResponseExtended };
  _: IOperationObservable;
}
