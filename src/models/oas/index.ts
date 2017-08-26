import {metas} from '../metas/index';
import {ISpecExtended} from './interfaces/ISpecExtended';
import {info} from './methods/info';
import {operations} from './methods/operations';
import {security} from './methods/security';
import {tags} from './methods/tags';
import {mdOperations, mdResponses, mdParameters, mdTags} from './methods/markdown';

const phase = {
  info: [1, 'info'],
  meta: [2, 'meta'],
  tags: [3, 'tags'],
  operations: [4, 'operations'],
  security: [5, 'security'],
  mdTags: [6, 'tags', 'Markdown'],
  mdOperations: [7, 'operations', 'Markdown'],
  mdParameters: [8, 'parameters', 'Markdown'],
  mdResponses: [9, 'responses', 'Markdown'],
  done: [10, '', 'Finishing']
}

const phases = Object.keys(phase).length

function log(ph: any, progress: any) {
  if (progress) {
    progress({text: ph[1], loaded: ph[0], phases, section: ph[2]})
  }
}

export function OAS(spec: ISpecExtended,
                    // url: string,
                    progress: any = null,
                    defaultContentType: string = 'application/json') {

  log(phase.info, progress);
  info(spec, /*url, */ defaultContentType);

  log(phase.meta, progress);
  spec._metas = metas(spec);

  log(phase.tags, progress);
  tags(spec);

  log(phase.operations, progress);
  operations(spec);

  log(phase.security, progress);
  security(spec);

  log(phase.mdTags, progress);
  mdTags(spec);

  log(phase.mdOperations, progress);
  mdOperations(spec);

  log(phase.mdResponses, progress);
  mdResponses(spec);

  log(phase.mdParameters, progress);
  mdParameters(spec);

  log(phase.done, progress);
}
