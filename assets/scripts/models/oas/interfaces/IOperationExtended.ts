import {Operation, Parameter} from 'swagger-schema-official';
import {IParameterExtended} from './IParameterExtended';
import {IResponseExtended} from './IResponseExtended';

export interface IOperationObservable {
  _display?: boolean;
  _produces: string;
  _error: any;
  _result: any;

  description?: string;
  description_html?: boolean;
  summary?: string;
  summary_html?: boolean;
}

export interface IOperationExtended extends Operation {
  _id: number;
  _method: string;
  _pathName: string;
  parameters?: Parameter[] & IParameterExtended[];
  responses: { [responseName: string]: IResponseExtended };
  _: IOperationObservable;
}
