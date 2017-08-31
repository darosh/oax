import {Info} from 'swagger-schema-official';

export interface IInfoObservable {
  _md_description?: string;
}

export interface IInfoExtended extends Info {
  _: IInfoObservable;
}
