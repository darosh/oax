import {IParameterExtended} from '../interfaces/IParameterExtended';
import {ISpecExtended} from '../interfaces/ISpecExtended';
// const sampler = require('openapi-sampler');

export function operations(spec: ISpecExtended) {
  for (const op of spec._operations) {
    op.produces = op.produces || spec.produces;

    op._ = {
      _display: true,
      _error: null,
      _produces: op.produces[0],
      _result: null,

      description: op.description,
      description_html: false,
      summary: op.summary,
      summary_html: false
    };

    delete op.description;
    delete op.summary;

    if (op.parameters) {
      for (const param of (op.parameters as any as IParameterExtended[])) {
        param._ = {
          _value: null,
          description: param.description,
          description_html: false
        };
        delete param.description;
      }
    }

    if (op.responses) {
      for (const respName in op.responses) {
        if (op.responses.hasOwnProperty(respName)) {
          const resp = op.responses[respName];
          resp._ = {
            description: resp.description,
            description_html: false
          };
          delete  resp.description;

          // if(resp.schema) {
          //   if(resp.schema.properties && !resp.schema.type) {
          //     resp.schema.type = 'object'
          //   }
          //
          //   (resp as any)._sampler = sampler.sample(resp.schema)
          //   console.log(JSON.stringify((resp as any)._sampler), resp.schema)
          // }
        }
      }
    }
  }
}
