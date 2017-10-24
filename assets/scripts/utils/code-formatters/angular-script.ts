import {IOperationExtended} from '../../specification/interfaces/IOperationExtended';
import {ISpecExtended} from '../../specification/interfaces/ISpecExtended';
import {configure} from '../../specification/methods/execute';

export default function angularScript(operation: IOperationExtended, spec: ISpecExtended): string {
  return '$http(' + JSON.stringify(configure(operation, spec), null, 2) + ')';
}
