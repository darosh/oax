import {IParameterExtended} from '../interfaces/IParameterExtended';
import {ISpecExtended} from '../interfaces/ISpecExtended';

import {summary, text, trim} from '../../../services/markdown';
import {IOperationExtended} from '../interfaces/IOperationExtended';
import {IBaseSecurityExtended} from '../interfaces/ISecurityExtended';

export function mdInfo(spec: ISpecExtended) {
  if (spec.info.description) {
    (spec.info as any)._md_description = trim(spec.info.description);
  }
}

export function mdSecurity(spec: ISpecExtended) {
  if (spec.securityDefinitions) {
    for (const key in spec.securityDefinitions) {
      (spec.securityDefinitions[key] as IBaseSecurityExtended)._._md_description = trim(spec.securityDefinitions[key].description);
    }
  }
}

export function mdTags(spec: ISpecExtended, max: number) {
  let n = 0;

  for (const tag of spec.tags) {
    tag._._md_description = tag._._md_description || trim(tag.description);

    if (n++ === max) {
      return;
    }
  }
}

function mdOperation(op: IOperationExtended) {
  if (op.description) {
    op._._md_description = op._._md_description || trim(op.description);
  }

  if (!op.summary && op.description) {
    op.summary = op.summary || summary(text(op._._md_description));
  }

  if (op.summary) {
    op._._md_summary = op._._md_summary || trim(op.summary);
  }

  if (op._._md_summary === op._._md_description) {
    delete op._._md_description;
    delete op.description;
  }
}

export function mdOperations(spec: ISpecExtended, max: [number, number]) {
  let n = 0;

  for (const tag of spec.tags) {
    for (const op of tag._operations) {
      let m = 0;
      mdOperation(op);

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
        if (param.description) {
          param._._md_description = param._._md_description || trim(param.description);
        }
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
        if (op.responses[respName].description) {
          op.responses[respName]._._md_description = op.responses[respName]._._md_description || trim(op.responses[respName].description);
        }
      }
    }

    if (n++ === max) {
      return;
    }
  }
}
