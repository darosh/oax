import {metas} from '../metas/index';
import {ISpecExtended} from './interfaces/ISpecExtended';
import {info} from './methods/info';
import {operations} from './methods/operations';
import {tags} from './methods/tags';

export function OAS(spec: ISpecExtended,
                    url: string,
                    defaultContentType: string = 'application/json',
                    validatorUrl: string = 'http://online.swagger.io/validator') {

  info(spec, url, defaultContentType);
  spec._metas = metas(spec, url, validatorUrl);
  tags(spec);
  operations(spec);
}
