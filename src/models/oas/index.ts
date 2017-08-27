import {metas} from '../metas/index';
import {ISpecExtended} from './interfaces/ISpecExtended';
import {info} from './methods/info';
import {operations} from './methods/operations';
import {security} from './methods/security';
import {tags} from './methods/tags';
import {mdOperations, mdResponses, mdParameters, mdTags, mdInfo} from './methods/markdown';

const phase = {
  info: [0, 'info', 'Parsing'],
  meta: [1, 'meta', 'Parsing'],
  tags: [2, 'tags', 'Parsing'],
  operations: [3, 'operations', 'Parsing'],
  security: [4, 'security', 'Parsing'],
  mdInfo: [5, 'info', 'Markdown'],
  mdTags: [6, 'tags', 'Markdown'],
  mdOperations: [7, 'operations', 'Markdown'],
  mdParameters: [8, 'parameters', 'Markdown'],
  mdResponses: [9, 'responses', 'Markdown'],
}

const phases = Object.keys(phase).length - 1

function log(ph: any, progress: any) {
  if (progress) {
    progress({text: ph[1], loaded: ph[0], total: phases, section: ph[2]})
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
  mdTags(spec, 10);

  log(phase.mdOperations, progress);
  mdOperations(spec, 0);

  log(phase.mdParameters, progress);
  mdParameters(spec, 10);

  log(phase.mdResponses, progress);
  mdResponses(spec, 10);
}
