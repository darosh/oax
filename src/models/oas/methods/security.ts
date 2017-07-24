import {OAuth2AccessCodeSecurity, Spec} from 'swagger-schema-official';
import {IBaseSecurityExtended} from '../interfaces/ISecurityExtended';

export function security(spec: Spec) {
  if (spec.securityDefinitions) {
    for (const sd in spec.securityDefinitions) {
      if (spec.securityDefinitions.hasOwnProperty(sd)) {
        if ((spec.securityDefinitions[sd] as OAuth2AccessCodeSecurity).scopes) {
          for (const scope in (spec.securityDefinitions[sd] as any).scopes) {
            if ((spec.securityDefinitions[sd] as any).scopes.hasOwnProperty(scope)) {
              (spec.securityDefinitions[sd] as IBaseSecurityExtended)._scopes =
                (spec.securityDefinitions[sd] as IBaseSecurityExtended)._scopes || {};
              (spec.securityDefinitions[sd] as IBaseSecurityExtended)._scopes[scope] = true;
            }
          }
        }
      }
    }
  }
}
