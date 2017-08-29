import {ISpecExtended} from '../interfaces/ISpecExtended';

export  function info(spec: ISpecExtended, /*url: string, */defaultContentType: string) {
  // const a: any = document.createElement('a');
  // a.href = url;

  spec.schemes = spec.schemes || [];

  // if (spec.schemes.length === 0) {
    // spec.schemes.push(a.protocol.replace(':', ''));
  // }

  spec._scheme = spec.schemes.indexOf('https') >= 0 ? 'https' : spec.schemes[0];

  // spec.host = spec.host || a.host;
  spec.consumes = spec.consumes || [defaultContentType];
  spec.produces = spec.produces || [defaultContentType];
}
