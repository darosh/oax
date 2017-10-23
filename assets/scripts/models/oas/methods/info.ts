import {ISpecExtended} from '../interfaces/ISpecExtended';

export function info(spec: ISpecExtended, url: string, defaultContentType: string) {
  spec.schemes = spec.schemes || [];

  const parsedUrl = new URL(url);

  if (spec.schemes.length === 0) {
    const proto = parsedUrl.protocol.substr(0, parsedUrl.protocol.length - 1);
    spec.schemes.push(proto);
  }

  spec._ = {
    _scheme: spec.schemes.indexOf('https') >= 0 ? 'https' : spec.schemes[0]
  };

  spec.info = spec.info || {} as any;
  spec.info._ = {description: spec.info.description, description_html: false};
  delete spec.info.description;

  let subUrl;

  try {
    subUrl = new URL(parsedUrl.pathname.substr(1));
    spec.basePath = subUrl.origin + (spec.basePath || '');
  } catch (ign) {
    // tslint:disable-next-line:empty-block
  }

  spec.host = spec.host || parsedUrl.host;
  spec.consumes = spec.consumes || [defaultContentType];
  spec.produces = spec.produces || [defaultContentType];
}
