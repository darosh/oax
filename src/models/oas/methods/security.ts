import {OAuth2AccessCodeSecurity, Spec} from 'swagger-schema-official';
import {IBaseSecurityExtended} from '../interfaces/ISecurityExtended';

export function security(spec: Spec) {
  if (spec.securityDefinitions) {
    for (const sd in spec.securityDefinitions) {
      if (spec.securityDefinitions.hasOwnProperty(sd)) {
        if ((spec.securityDefinitions[sd] as OAuth2AccessCodeSecurity).scopes) {
          const sec = spec.securityDefinitions[sd] as IBaseSecurityExtended;
          sec._callbackUrl = null;
          sec._clientId = null;
          sec._clientSecret = null;
          sec._accessToken = null;
          sec._expiresIn = null;
          sec._validFrom = null;
          sec._apiKey = null;
          sec._user = null;
          sec._password = null;
          for (const scope in (spec.securityDefinitions[sd] as any).scopes) {
            if ((spec.securityDefinitions[sd] as any).scopes.hasOwnProperty(scope)) {
              sec._scopes = sec._scopes || {};
              sec._scopes[scope] = true;
            }
          }
        }
      }
    }
  }
}
