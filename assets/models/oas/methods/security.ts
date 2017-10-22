import {OAuth2AccessCodeSecurity, Spec} from 'swagger-schema-official';
import {IBaseSecurityExtended} from '../interfaces/ISecurityExtended';

export function security(spec: Spec) {
  if (spec.securityDefinitions) {
    for (const sd in spec.securityDefinitions) {
      if (spec.securityDefinitions.hasOwnProperty(sd)) {
        const sec = spec.securityDefinitions[sd] as IBaseSecurityExtended;
        sec._ = {description: sec.description, description_html: false};

        if ((spec.securityDefinitions[sd] as OAuth2AccessCodeSecurity).scopes) {
          // sec._ = {
          //   _scopes: null,
          //   _callbackUrl: null,
          //   _clientId: null,
          //   _clientSecret: null,
          //   _accessToken: null,
          //   _expiresIn: null,
          //   _validFrom: null,
          //   _apiKey: null,
          //   _user: null,
          //   _password: null
          // };

          for (const scope in (spec.securityDefinitions[sd] as any).scopes) {
            if ((spec.securityDefinitions[sd] as any).scopes.hasOwnProperty(scope)) {
              sec._._scopes = sec._._scopes || {};
              sec._._scopes[scope] = true;
            }
          }
        }
      }
    }
  }
}
