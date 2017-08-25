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
  const total = 6
  let loaded = 0

  if(progress) {
    loaded++
    progress({text: 'info', loaded, total})
  }

  info(spec, /*url, */ defaultContentType);

  if(progress) {
    loaded++
    progress({text: 'meta', loaded, total})
  }

  spec._metas = metas(spec);

  if(progress) {
    loaded++
    progress({text: 'tags', loaded, total})
  }

  tags(spec);

  if(progress) {
    loaded++
    progress({text: 'operations', loaded, total})
  }

  operations(spec);

  if(progress) {
    loaded++
    progress({text: 'security', loaded, total})
  }

  security(spec);

  if(progress) {
    loaded++
    progress({text: 'done', loaded, total})
  }
}
