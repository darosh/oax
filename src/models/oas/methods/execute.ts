import axios, {AxiosPromise} from 'axios';
import {Spec} from 'swagger-schema-official';
import {IExtra} from '../interfaces/IExtra';
import {IOperationExtended} from '../interfaces/IOperationExtended';

export function configure(operation: IOperationExtended, spec: Spec) {
  let path: string = operation._pathName;
  const query: IExtra = {};
  const headers: IExtra = {};
  let body: any = null;

  for (const paramIndex in operation.parameters) {
    const param = operation.parameters[paramIndex];
    const value = param._value;

    if (!value || (param.in !== 'path')) {
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

  const config = {
    method: operation._method,
    baseURL: spec.schemes[0] + '://' + spec.host + spec.basePath + path,
    headers,
    params: query,
    data: body
  };

  return config;
}

export function execute(operation: IOperationExtended, spec: Spec): AxiosPromise {
  const config = configure(operation, spec);
  return axios.request(config);
}
