import {IOperationExtended} from '../oas/interfaces/IOperationExtended';
import {configure} from '../oas/methods/execute';
import {ISpecExtended} from "../oas/interfaces/ISpecExtended";

export default function angularScript(operation: IOperationExtended, spec: ISpecExtended): string {
  return '$http(' + JSON.stringify(configure(operation, spec), null, 2) + ')';
}
