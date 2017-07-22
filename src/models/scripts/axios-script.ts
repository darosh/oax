import {configure} from '../oas/methods/execute'

export function axiosScript(operation: IOperationExtended, spec: Spec): string {
  return 'axios.request(' + JSON.stringify(configure(operation, spec), null, 2) + ')';
}
