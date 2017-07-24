import {BaseSecurity} from 'swagger-schema-official';

export interface IBaseSecurityExtended extends BaseSecurity {
  _scopes: { [scope: string]: boolean };
}
