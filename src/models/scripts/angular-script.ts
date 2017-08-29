import {IOperationExtended} from '../oas/interfaces/IOperationExtended';
import {ISpecExtended} from '../oas/interfaces/ISpecExtended';
import {configure} from '../oas/methods/execute';

export default function angularScript(operation: IOperationExtended, spec: ISpecExtended): string {
  return '$http(' + JSON.stringify(configure(operation, spec), null, 2) + ')';
}
