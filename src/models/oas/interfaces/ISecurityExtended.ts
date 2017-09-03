import {BaseSecurity} from 'swagger-schema-official';

export interface IBaseSecurityObservable {
  _scopes?: { [scope: string]: boolean };
  _clientId?: string;
  _clientSecret?: string;
  _callbackUrl?: string;
  _accessToken?: string;
  _expiresIn?: number;
  _validFrom?: Date;
  _apiKey?: string;
  _user?: string;
  _password?: string;

  description?: string;
  description_html?: boolean;
}

export interface IBaseSecurityExtended extends BaseSecurity {
  _: IBaseSecurityObservable;
}
