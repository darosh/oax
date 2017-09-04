import {metas} from '../metas/index';
import {ISpecExtended} from './interfaces/ISpecExtended';
import {info} from './methods/info';
import {mdInfo, mdOperations, mdParameters, mdResponses, mdSecurity, mdTags} from './methods/markdown';
import {operations} from './methods/operations';
import {security} from './methods/security';
import {tags} from './methods/tags';
import {extras} from "./methods/extras";
import {base} from "./methods/base";
// import {observables} from './methods/observables';

/* tslint:disable */
const phase = {
  info: [0, 'info', 'Parsing'],
  base: [1, 'base', 'Parsing'],
  meta: [2, 'meta', 'Parsing'],
  tags: [3, 'tags', 'Parsing'],
  operations: [4, 'operations', 'Parsing'],
  security: [5, 'security', 'Parsing'],
  mdInfo: [6, 'info', 'Markdown'],
  mdSecurity: [7, 'security', 'Markdown'],
  mdTags: [8, 'tags', 'Markdown'],
  mdOperations: [9, 'operations', 'Markdown'],
  mdParameters: [10, 'parameters', 'Markdown'],
  mdResponses: [11, 'responses', 'Markdown'],
  extras: [12, 'extras', 'Cleaning']
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

  const parsedUrl = {
    host: url.replace(/^[^/]+:\/\//, '').replace(/\/.*$/, ''),
    protocol: url.replace(/:.*/, '')
  };

  log(phase.info, progress);
  info(spec, parsedUrl, defaultContentType);

  log(phase.base, progress);
  base(spec);

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

  log(phase.mdSecurity, progress);
  mdSecurity(spec);

  log(phase.mdTags, progress);
  mdTags(spec, 10);

  log(phase.mdOperations, progress);
  mdOperations(spec, [5, 5]);

  log(phase.mdParameters, progress);
  mdParameters(spec, 10);

  log(phase.mdResponses, progress);
  mdResponses(spec, 10);

  log(phase.extras, progress);
  extras(spec);


  // log(phase.observables, progress);
  // (spec as any)._observables = observables(spec);
}
