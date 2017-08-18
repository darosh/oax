import {BaseSecurity} from 'swagger-schema-official';

export interface IBaseSecurityExtended extends BaseSecurity {
  _scopes: { [scope: string]: boolean };
  _clientId: string;
  _clientSecret: string;
  _callbackUrl: string;
  _accessToken: string;
  _expiresIn: number;
  _validFrom: Date;
}
