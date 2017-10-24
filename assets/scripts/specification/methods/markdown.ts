import {IParameterExtended} from '../interfaces/IParameterExtended';
import {ISpecExtended} from '../interfaces/ISpecExtended';

import {description, summary, summaryHtml, text} from '../../services/markdown';
import {IOperationObservable} from '../interfaces/IOperationExtended';
import {IBaseSecurityExtended} from '../interfaces/ISecurityExtended';

export function mdInfo(spec: ISpecExtended) {
  description(spec.info._);
}

export function mdSecurity(spec: ISpecExtended) {
  if (spec.securityDefinitions) {
    for (const key in spec.securityDefinitions) {
      if (spec.securityDefinitions.hasOwnProperty(key)) {
        description((spec.securityDefinitions[key] as IBaseSecurityExtended)._);
      }
    }
  }
}

export function mdTags(spec: ISpecExtended, max: number) {
  let n = 0;

  for (const tag of spec.tags) {
    description(tag._);

    if (n++ === max) {
      return;
    }
  }
}

function mdOperation(op: IOperationObservable) {
  description(op);

  if (!op.summary && op.description) {
    op.summary = summary(op.description);
  }

  summaryHtml(op);

  if (op.summary && op.description && (op.summary === text(op.description))) {
    delete op.description;
    delete op.description_html;
  }
}

export function mdOperations(spec: ISpecExtended, max: [number, number]) {
  let n = 0;

  for (const tag of spec.tags) {
    for (const op of tag._operations) {
      let m = 0;
      mdOperation(op._);

      if (max && (m++ === max[1])) {
        return;
      }
    }

    if (n++ === max[0]) {
      return;
    }
  }
}

export function mdParameters(spec: ISpecExtended, max: number) {
  let n = 0;

  for (const op of spec._operations) {
    if (op.parameters) {
      for (const param of (op.parameters as any as IParameterExtended[])) {
        description(param._);
      }
    }

    if (n++ === max) {
      return;
    }
  }
}

export function mdResponses(spec: ISpecExtended, max: number) {
  let n = 0;

  for (const op of spec._operations) {
    if (op.responses) {
      for (const respName in op.responses) {
        if (op.responses.hasOwnProperty(respName)) {
          description(op.responses[respName]._);
        }
      }
    }

    if (n++ === max) {
      return;
    }
  }
}
