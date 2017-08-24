import {metas} from '../metas/index';
import {ISpecExtended} from './interfaces/ISpecExtended';
import {info} from './methods/info';
import {operations} from './methods/operations';
import {security} from './methods/security';
import {tags} from './methods/tags';

export function OAS(spec: ISpecExtended,
                    // url: string,
                    defaultContentType: string = 'application/json') {

  info(spec, /*url, */ defaultContentType);
  spec._metas = metas(spec);
  tags(spec);
  operations(spec);
  security(spec);
}
