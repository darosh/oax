import {Operation, Path, Spec} from 'swagger-schema-official';
import {HttpMethods} from '../constants/HttpMethods';
import {IExtra} from '../interfaces/IExtra';

export function usedTags(spec: Spec) {
  const dic: IExtra = {};

  for (const pathName in spec.paths) {
    const path: Path = spec.paths[pathName];

    for (const method in path) {
      if (HttpMethods[method]) {
        const operation: Operation = (path as IExtra)[method];

        if (operation.tags) {
          for (const tag in operation.tags) {
            dic[operation.tags[tag]] = true;
          }
        }
      }
    }
  }
}
