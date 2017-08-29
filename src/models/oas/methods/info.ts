import {ISpecExtended} from '../interfaces/ISpecExtended';

export  function info(spec: ISpecExtended, url: {protocol: string, host: string}, defaultContentType: string) {
  spec.schemes = spec.schemes || [];

  if (spec.schemes.length === 0) {
    spec.schemes.push(url.protocol);
  }

  spec._scheme = spec.schemes.indexOf('https') >= 0 ? 'https' : spec.schemes[0];

  spec.host = spec.host || url.host;
  spec.consumes = spec.consumes || [defaultContentType];
  spec.produces = spec.produces || [defaultContentType];
}
