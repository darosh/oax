import {HttpMethods} from '../constants/HttpMethods';
import {IResource} from '../interfaces/IResource';

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

export function filterSearch(resources: IResource[], searchObject: any) {
  for (const r of resources) {
    r._display = false;
    r._opened = false;

    for (const o of r._operations) {

      if ((searchObject.method ? searchObject.method === o._method : true) &&
        (searchObject.path ? o._pathName.toLowerCase().indexOf(searchObject.path) > -1 : true)) {
        o._display = true;
        r._display = true;
        r._opened = true;
      } else {
        o._display = false;
      }
    }
  }
}
