import {IParameterExtended} from '../interfaces/IParameterExtended';
import {ISpecExtended} from '../interfaces/ISpecExtended';

export function operations(spec: ISpecExtended) {
  for (const op of spec._operations) {
    op._display = true;
    op._result = null;
    op.produces = op.produces || spec.produces;
    op._produces = op.produces[0];

    for (const param of (op.parameters as any as IParameterExtended[])) {
      param._value = null;
    }
  }
}
