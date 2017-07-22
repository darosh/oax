import {Path, Spec} from 'swagger-schema-official';
import {HttpMethods} from '../constants/HttpMethods';
import {IExtra} from '../interfaces/IExtra';
import {IMap} from '../interfaces/IMap';
import {IOperationExtended} from '../interfaces/IOperationExtended';
import {IResource} from '../interfaces/IResource';

export function operations(spec: Spec, resources: IResource[], map: IMap/*, form, map, defaultContentType, openPath*/) {
  let operationId: number = 0;
  const operationsArray: IOperationExtended[] = [];

  for (const pathName in spec.paths) {
    if (!spec.paths.hasOwnProperty(pathName)) {
      continue;
    }

    const path: Path = spec.paths[pathName];
    // const pathParameters: Parameter[] = path.parameters || [];

    for (const httpMethod in path) {
      if (!HttpMethods[httpMethod]) {
        continue;
      }

      const operation: IOperationExtended = (path as IExtra)[httpMethod];

      operation._id = operationId;
      operation.produces = operation.produces || spec.produces;
      // form[operationId] = {
      //   responseType: defaultContentType
      // };

      operation._produces = operation.produces[0];

      operation._method = httpMethod;
      operation._pathName = pathName;
      operation._display = true;
      operation._result = null;
      operation._error = null;

      // parseParameters(spec, operation, pathParameters, form, defaultContentType);
      // OAS.parseResponses(spec, operation);

      operation.tags = (!operation.tags || !operation.tags.length) ? ['default'] : operation.tags;

      const tag = operation.tags[0];

      if (typeof map[tag] === 'undefined') {
        map[tag] = resources.length;
        resources.push({
          name: tag
        });
      }

      const resource: IResource = resources[map[operation.tags[0]]];

      // operation.open = openPath && openPath === operation.operationId || openPath === resource.name + '*';

      resource._operations = resource._operations || [];
      resource._operations.push(operation);

      // if (operation.open) {
      //   resource.open = true;
      // }

      operationsArray.push(operation);

      operationId++;
    }
  }

  return operationsArray;
}
