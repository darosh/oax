import axios, {AxiosPromise} from 'axios';
import {Parameter, Spec} from 'swagger-schema-official';
import {IExtra} from '../interfaces/IExtra';
import {IOperationExtended} from '../interfaces/IOperationExtended';
import {IParameterExtended} from '../interfaces/IParameterExtended';

export function configure(operation: IOperationExtended, spec: Spec) {
  let path: string = operation._pathName;
  const query: IExtra = {};
  const headers: IExtra = {};
  let body: any = null;

  for (const param of (operation.parameters as Parameter[])) {
    // This is my 1st as-any-as ever! :-)))
    const value = (param as any as IParameterExtended)._value;

    if (!value || (!value && (param.in !== 'path'))) {
      continue;
    }

    switch (param.in as string) {
      case 'query':
        query[param.name] = value;
        break;
      case 'path':
        path = path.replace('{' + param.name + '}', encodeURIComponent(value));
        break;
      case 'header':
        headers[param.name] = value;
        break;
      case 'formData':
        body = body || new FormData();
        // values.contentType = (param.type === 'file') ? undefined : values.contentType;
        body.append(param.name, value);
        break;
      case 'body':
        body = body || value;
        break;
    }
  }

  const config: any = {
    url: spec.schemes[0] + '://' + spec.host + spec.basePath + path,
    method: operation._method
  };

  if (Object.keys(headers).length) {
    config.headers = headers;
  }

  if (Object.keys(query).length) {
    config.params = query;
  }

  if (body) {
    config.data = body;
  }

  return config;
}

export function execute(operation: IOperationExtended, spec: Spec): AxiosPromise {
  const config = configure(operation, spec);
  return axios.request(config);
}
