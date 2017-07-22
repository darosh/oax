import {Operation} from 'swagger-schema-official';

export interface IOperationExtended extends Operation {
  _id: number;
  _method: string;
  _pathName: string;
  _display?: boolean;
  _produces: string;
  _schema: string;
}
