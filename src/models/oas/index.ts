import {metas} from '../metas/index';
import {ISpecExtended} from './interfaces/ISpecExtended';
import {info} from './methods/info';
import {operations} from './methods/operations';
import {security} from './methods/security';
import {tags} from './methods/tags';
import {mdOperations, mdResponses, mdParameters, mdTags, mdInfo} from './methods/markdown';

const phase = {
  info: [1, 'info'],
  meta: [2, 'meta'],
  tags: [3, 'tags'],
  operations: [4, 'operations'],
  security: [5, 'security'],
  mdInfo: [6, 'tags', 'Info'],
  mdTags: [7, 'tags', 'Markdown'],
  mdOperations: [8, 'operations', 'Markdown'],
  mdParameters: [9, 'parameters', 'Markdown'],
  mdResponses: [10, 'responses', 'Markdown'],
  done: [11, '', 'Finishing']
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

  log(phase.mdInfo, progress);
  mdInfo(spec);

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
