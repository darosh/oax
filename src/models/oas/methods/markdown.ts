import {IParameterExtended} from '../interfaces/IParameterExtended';
import {ISpecExtended} from '../interfaces/ISpecExtended';

import {trim, summary} from '../../../services/md-converter';

export function mdTags(spec: ISpecExtended) {
  for (const tag of spec.tags) {
    tag._md_description = trim(tag.description);
  }
}

export function mdOperations(spec: ISpecExtended) {
  for (const op of spec._operations) {
    if (op.description) {
      op._md_description = trim(op.description);
    }

    if (!op.summary && op.description) {
      op.summary = summary(op._md_description)
    }

    if (op.summary) {
      op._md_summary = trim(op.summary);
    }

    if (op._md_summary === op._md_description) {
      delete op._md_description;
      delete op.description;
    }
  }
}

export function mdParameters(spec: ISpecExtended) {
  for (const op of spec._operations) {
    if (op.parameters) {
      for (const param of (op.parameters as any as IParameterExtended[])) {
        if ((param as any).description) {
          (param as any)._md_description = trim((param as any).description);
        }
      }
    }
  }
}

export function mdResponses(spec: ISpecExtended) {
  for (const op of spec._operations) {
    if (op.responses) {
      for (const respName in op.responses) {
        if (op.responses[respName].description) {
          (op.responses[respName] as any)._md_description = trim(op.responses[respName].description);
        }
      }
    }
  }
}
