import {BaseParameter} from 'swagger-schema-official';

export interface IParameterObservable {
  _value: any;
  description?: string;
  description_html?: boolean;
}

export interface IParameterExtended extends BaseParameter {
  _: IParameterObservable;
}
