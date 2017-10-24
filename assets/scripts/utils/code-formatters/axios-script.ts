import {IOperationExtended} from '../../specification/interfaces/IOperationExtended';
import {ISpecExtended} from '../../specification/interfaces/ISpecExtended';
import {configure} from '../../specification/methods/execute';

export default function axiosScript(operation: IOperationExtended, spec: ISpecExtended): string {
  return 'axios.request(' + JSON.stringify(configure(operation, spec), null, 2) + ')';
}
