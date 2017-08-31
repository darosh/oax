import {IParameterExtended} from '../interfaces/IParameterExtended';
import {ISpecExtended} from '../interfaces/ISpecExtended';

export function operations(spec: ISpecExtended) {
  for (const op of spec._operations) {
    op.produces = op.produces || spec.produces;

    op._ = {
      _display: true,
      _result: null,
      _error: null,
      _produces: op.produces[0],

      description: op.description,
      summary: op.summary
    };

    delete op.description;
    delete op.summary;

    if (op.parameters) {
      for (const param of (op.parameters as any as IParameterExtended[])) {
        param._ = {
          _value: null
        };
      }
    }

    if (op.responses) {
      for (const respName in op.responses) {
        op.responses[respName]._ = {};
      }
    }
  }
}
