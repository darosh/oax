import {Spec} from 'swagger-schema-official';
import {IOperationExtended} from '../oas/interfaces/IOperationExtended';
import {configure} from '../oas/methods/execute';

export default function axiosScript(operation: IOperationExtended, spec: Spec): string {
  return 'axios.request(' + JSON.stringify(configure(operation, spec), null, 2) + ')';
}
