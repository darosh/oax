import {HttpMethods} from './HttpMethods';
import {IResource} from './IResource';

export default function search(resources: IResource[], text: string) {
  filterSearch(resources, getSearch(text));
}

export function getSearch(text: string) {
  if (!text) {
    return {};
  } else {
    const trimmed = text.toLowerCase().trim();
    const parts = trimmed.split(' ');
    const isMethod = HttpMethods[parts[0]];
    const method = (parts.length > 1) ? parts[0] : (isMethod ? parts[0] : '');
    const path = (parts.length > 1) ? parts[1] : (isMethod ? '' : parts[0]);

    return {method, path};
  }
}

export function filterSearch(resources: IResource[], search: any) {
  for (let i = 0; i < resources.length; i++) {
    const r = resources[i];

    r._display = false;
    r._opened = false;

    for (let j = 0; j < r._operations.length; j++) {
      const o = r._operations[j];

      if ((search.method ? search.method === o._method : true) &&
        (search.path ? o._pathName.toLowerCase().indexOf(search.path) > -1 : true)) {
        o._display = true;
        r._display = true;
        r._opened = true;
      } else {
        o._display = false;
      }
    }
  }
}
