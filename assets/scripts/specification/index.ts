import {metas} from '../utils/metas';
import {ISpecExtended} from './interfaces/ISpecExtended';
import {base} from './methods/base';
import {info} from './methods/info';
import {mdInfo, mdOperations, mdParameters, mdResponses, mdSecurity, mdTags} from './methods/markdown';
import {operations} from './methods/operations';
import {security} from './methods/security';
import {tags} from './methods/tags';
// import {extras} from "./methods/extras";
// import {observables} from './methods/observables';

// TODO: this is export for worker code splitting
export {trim, summary} from '../services/markdown';

/* tslint:disable */
const phase = {
  info: [0, 'info', 'Parsing'],
  base: [1, 'base', 'Parsing'],
  tags: [2, 'tags', 'Parsing'],
  operations: [3, 'operations', 'Parsing'],
  security: [4, 'security', 'Parsing'],
  meta: [5, 'meta', 'Parsing'],
  mdInfo: [6, 'info', 'Markdown'],
  mdSecurity: [7, 'security', 'Markdown'],
  mdTags: [8, 'tags', 'Markdown'],
  mdOperations: [9, 'operations', 'Markdown'],
  mdParameters: [10, 'parameters', 'Markdown'],
  mdResponses: [11, 'responses', 'Markdown'],
  // extras: [12, 'extras', 'Cleaning']
  // observables: [13, 'observables', 'Collecting']
};
/* tslint:enable */

const phases = Object.keys(phase).length - 1;

// let last = Date.now();

function log(ph: any, progress: any) {
  // const now = Date.now()
  // console.log(ph[1] + ' ' + ph[2], now - last)
  // last = now

  if (progress) {
    progress({text: ph[1], loaded: ph[0], total: phases, section: ph[2]});
  }
}

export function OAS(spec: ISpecExtended,
                    url: string,
                    progress: any = null,
                    defaultContentType: string = 'application/json') {
  log(phase.info, progress);
  info(spec, url, defaultContentType);

  log(phase.base, progress);
  base(spec);

  log(phase.tags, progress);
  tags(spec);

  log(phase.operations, progress);
  operations(spec);

  log(phase.security, progress);
  security(spec);

  log(phase.meta, progress);
  spec._metas = metas(spec);

  log(phase.mdInfo, progress);
  mdInfo(spec);

  log(phase.mdSecurity, progress);
  mdSecurity(spec);

  log(phase.mdTags, progress);
  mdTags(spec, 10);

  log(phase.mdOperations, progress);
  mdOperations(spec, [Infinity, Infinity]);

  log(phase.mdParameters, progress);
  mdParameters(spec, 10);

  log(phase.mdResponses, progress);
  mdResponses(spec, 10);

  // log(phase.extras, progress);
  // extras(spec);

  // log(phase.observables, progress);
  // (spec as any)._observables = observables(spec);
}
