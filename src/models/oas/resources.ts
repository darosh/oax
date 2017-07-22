import {Spec} from 'swagger-schema-official';
import {IMap} from './IMap';
import {IResource} from './IResource';

export function resources(spec: Spec, map: IMap): IResource[] {
  const resources: IResource[] = [];

  if (!spec.tags || (spec.tags.length === 0)) {
    resources.push({
      name: 'default',
      _opened: true,
      _display: true
    });
    map.default = 0;
  } else {
    for (let i = 0, l = spec.tags.length; i < l; i++) {
      const tag = spec.tags[i];
      (tag as IResource)._opened = true;
      (tag as IResource)._display = true;
      resources.push(tag);
      map[tag.name] = i;
    }
  }

  return resources;
}

export function openAll(resources: IResource[], opened = true) {
  for (const r in resources) {
    resources[r]._opened = opened;
  }
}
