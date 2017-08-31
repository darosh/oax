import {Response} from 'swagger-schema-official';

export interface IResponseObservable {
  _md_description?: string;
}

export interface IResponseExtended extends Response {
  _: IResponseObservable;
}
