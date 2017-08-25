import {metas} from '../metas/index';
import {ISpecExtended} from './interfaces/ISpecExtended';
import {info} from './methods/info';
import {operations} from './methods/operations';
import {security} from './methods/security';
import {tags} from './methods/tags';

export function OAS(spec: ISpecExtended,
                    // url: string,
                    progress: any = null,
                    defaultContentType: string = 'application/json') {
  if(progress) {
    progress('info')
  }

  info(spec, /*url, */ defaultContentType);

  if(progress) {
    progress('meta')
  }

  spec._metas = metas(spec);

  if(progress) {
    progress('tags')
  }

  tags(spec);

  if(progress) {
    progress('operations')
  }

  operations(spec);

  if(progress) {
    progress('security')
  }

  security(spec);

  if(progress) {
    progress('done')
  }
}
