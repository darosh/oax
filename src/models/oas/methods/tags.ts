import {Path, Spec} from 'swagger-schema-official';
import {HttpMethods} from '../constants/HttpMethods';
import {IExtra} from '../interfaces/IExtra';
import {IMap} from '../interfaces/IMap';
import {IOperationExtended} from '../interfaces/IOperationExtended';
import {ISpecExtended} from '../interfaces/ISpecExtended';
import {ITagExtended} from '../interfaces/ITagExtended';

export function tags(spec: ISpecExtended) {
  spec.tags = Array.isArray(spec.tags) ? spec.tags : [];
  spec._operations = operations(spec);
  spec._map = indexTags(spec);
  addOpsTags(spec);
  extendTags(spec);
  addTagOperations(spec);
  removeUnusedTags(spec);
  const untagged = getUntagged(spec);

  if (untagged.length) {
    const dt = getDefaultTag(spec);
    addDefaultTag(untagged, dt);
  }
}

export function addDefaultTag(ops: IOperationExtended[], dt: ITagExtended) {
  for (const op of ops) {
    op.tags.push(dt.name);
  }
}

export function getDefaultTag(spec: ISpecExtended) {
  return spec.tags.find((o) => (o.name.toLowerCase() === 'default')) || {
    _display: true,
    _opened: true,
    _operations: [],
    name: 'default'
  };
}

export function getUntagged(spec: ISpecExtended) {
  return spec._operations.filter((o) => !o.tags.length);
}

export function removeUnusedTags(spec: ISpecExtended) {
  let remap = false;

  for (let i = 0; i < spec.tags.length; i++) {
    const tag = spec.tags[i];

    if (!tag._operations.length) {
      spec.tags.splice(i, 1);
      i--;
      remap = true;
    }
  }

  if (remap) {
    spec._map = indexTags(spec);
  }
}

export function addTagOperations(spec: ISpecExtended) {
  for (const op of spec._operations) {
    for (const tagName of op.tags) {
      spec.tags[spec._map[tagName]]._operations.push(op);
    }
  }
}

export function extendTags(spec: ISpecExtended) {
  for (const tag of spec.tags) {
    tag._operations = tag._operations || [];
    tag._display = true;
    tag._opened = true;
  }
}

export function addOpsTags(spec: ISpecExtended) {
  for (const op of spec._operations) {
    for (const tagName of op.tags) {
      if (!spec._map[tagName]) {
        spec._map[tagName] = spec.tags.length;
        spec.tags.push({
          name: tagName
        });
      }
    }
  }
}

export function indexTags(spec: Spec): IMap {
  const map: IMap = {};

  for (const index in spec.tags) {
    if (spec.tags.hasOwnProperty(index)) {
      map[spec.tags[index].name] = index as any as number;
    }
  }

  return map;
}

export function operations(spec: Spec) {
  const ops: IOperationExtended[] = [];

  for (const pathName in spec.paths) {
    if (spec.paths.hasOwnProperty(pathName)) {
      const path: Path = spec.paths[pathName];

      for (const httpMethod in path) {
        if (HttpMethods[httpMethod]) {
          const operation: IOperationExtended = (path as IExtra)[httpMethod];
          operation.tags = operation.tags || [];
          operation._method = httpMethod;
          operation._pathName = pathName;
          ops.push(operation);
        }
      }
    }
  }

  return ops;
}

export function openAll(resourcesArray: ITagExtended[], opened = true) {
  for (const r of resourcesArray) {
    r._opened = opened;
  }
}
