import {IParameterExtended} from '../interfaces/IParameterExtended';
import {IBaseSecurityExtended} from '../interfaces/ISecurityExtended';
import {ISpecExtended} from '../interfaces/ISpecExtended';

export function observables(spec: ISpecExtended) {
  const list = [];

  list.push(spec._);

  if (spec.securityDefinitions) {
    for (const key in spec.securityDefinitions) {
      if (spec.securityDefinitions.hasOwnProperty(key)) {
        list.push((spec.securityDefinitions[key] as IBaseSecurityExtended)._);
      }
    }
  }

  for (const tag of spec.tags) {
    list.push(tag._);
  }

  for (const op of spec._operations) {
    list.push(op._);

    if (op.parameters) {
      for (const param of (op.parameters as any as IParameterExtended[])) {
        list.push(param._);
      }
    }

    if (op.responses) {
      for (const respName in op.responses) {
        if (op.responses.hasOwnProperty(respName)) {
          list.push(op.responses[respName]._);
        }
      }
    }
  }

  return list;
}
