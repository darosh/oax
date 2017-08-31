import {BaseParameter} from 'swagger-schema-official';

export interface IParameterObservable {
  _value: any;
  _md_description?: string;
}

export interface IParameterExtended extends BaseParameter {
  _: IParameterObservable;
}
