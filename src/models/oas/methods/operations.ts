import {IParameterExtended} from '../interfaces/IParameterExtended';
import {ISpecExtended} from '../interfaces/ISpecExtended';

import {/*el, */trim} from '../../../services/md-converter';

export function operations(spec: ISpecExtended) {
  for (const op of spec._operations) {
    op._display = true;
    op._result = null;
    op._error = null;
    op.produces = op.produces || spec.produces;
    op._produces = op.produces[0];

    if (op.parameters) {
      for (const param of (op.parameters as any as IParameterExtended[])) {
        param._value = null;

        if ((param as any).description) {
          (param as any)._md_description = trim((param as any).description);
        }
      }
    }

    if (op.responses) {
      for (const respName in op.responses) {
        if (op.responses[respName].description) {
          (op.responses[respName] as any)._md_description = trim(op.responses[respName].description);
        }
      }
    }

    if (op.description) {
      op._md_description = trim(op.description);
    }

    if (!op.summary && op.description) {
      // el.innerHTML = op._md_description;
      // const text = el.textContent.replace(/\n/g, ' ').replace(/  +/g, ' ').trim();
      const text = op._md_description

      const dot = text.indexOf('.') + 1;
      op.summary = text.substr(0, (dot > 3 && dot < 120) ? dot : 120);
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
