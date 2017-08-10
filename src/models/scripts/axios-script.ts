import {IOperationExtended} from '../oas/interfaces/IOperationExtended';
import {configure} from '../oas/methods/execute';
import {ISpecExtended} from "../oas/interfaces/ISpecExtended";

export default function axiosScript(operation: IOperationExtended, spec: ISpecExtended): string {
  return 'axios.request(' + JSON.stringify(configure(operation, spec), null, 2) + ')';
}
