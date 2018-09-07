import axios, {AxiosPromise} from 'axios';
import {Parameter} from 'swagger-schema-official';
import {IExtra} from '../interfaces/IExtra';
import {IOperationExtended} from '../interfaces/IOperationExtended';
import {IParameterExtended} from '../interfaces/IParameterExtended';
import {ISpecExtended} from '../interfaces/ISpecExtended';
import {configuration} from '../../services/configuration'

export function configure(operation: IOperationExtended, spec: ISpecExtended, region: String) {
  let path: string = operation._pathName;
  const query: IExtra = {};
  const headers: IExtra = {};
  let body: any = null;

  headers['Content-Type'] = operation._._produces;

  for (const param of (operation.parameters as Parameter[]) || []) {
    console.log('going to assemble parameters')
    console.log(param)
    // This is my 1st as-any-as ever! :-)))
    const value = (param as any as IParameterExtended)._._value;
    console.log(value)
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
        console.log('this is in assembly request body')
        // body = body || value;
        body = body || {}
        body[param.name] = value
        break;
    }
  }

  const config: any = {
    method: operation._method,
    url: merge(spec.basePath, path).replace(/\/$/, '')
  };

  if (Object.keys(headers).length) {
    config.headers = headers;
  }

  if (Object.keys(query).length) {
    config.parameter = query;
  }

  if (body) {
    config.body = body;
  }

  config.region = region

  // TODO: update this to reflect real service
  config.service = 'nova'


  return config;
}

function merge(a = '', b = '') {
  if (!a || !b) {
    return a + b;
  } else if (a[a.length - 1] === '/' && b[0] === '/') {
    return a + b.substr(1);
  } else if (a[a.length - 1] !== '/' && b[0] !== '/') {
    return a + '/' + b;
  } else {
    return a + b;
  }
}

export function execute(operation: IOperationExtended, spec: ISpecExtended, region: String): AxiosPromise {
  console.log('starting to execute command')
  console.log(operation)
  const config = configure(operation, spec, region)
  console.log(config)
  return axios.post(configuration.proxyUrl, config)
}
