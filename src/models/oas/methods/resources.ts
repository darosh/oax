import {Spec} from 'swagger-schema-official';
import {IMap} from '../interfaces/IMap';
import {IResource} from '../interfaces/IResource';

export function resources(spec: Spec, map: IMap): IResource[] {
  const resourcesArray: IResource[] = [];

  if (!spec.tags || (spec.tags.length === 0)) {
    resourcesArray.push({
      _display: true,
      _opened: true,
      name: 'default'
    });
    map.default = 0;
  } else {
    for (let i = 0, l = spec.tags.length; i < l; i++) {
      const tag = spec.tags[i];
      (tag as IResource)._opened = true;
      (tag as IResource)._display = true;
      resourcesArray.push(tag);
      map[tag.name] = i;
    }
  }

  return resourcesArray;
}

export function openAll(resourcesArray: IResource[], opened = true) {
  for (const r of resourcesArray) {
    r._opened = opened;
  }
}
