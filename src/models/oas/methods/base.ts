import {ISpecExtended} from '../interfaces/ISpecExtended';

export function base(spec: ISpecExtended) {
  const extracted = extract(spec);

  if (extracted) {
    spec.basePath = spec.basePath || '/';
    spec.basePath += (spec.basePath.length && (spec.basePath[spec.basePath.length - 1] === '/') ? '' : '/') + extracted;
  }
}

export function extract(spec: ISpecExtended): string {
  const parts: { [index: string]: string[] } = {};
  let level = 0;
  const current: string[] = [];
  const paths = Object.keys(spec.paths || {});
  let done: any = false;

  if (!paths.length) {
    return '';
  }

  while (true) {
    for (const pathName of paths) {
      if (!parts[pathName]) {
        parts[pathName] = pathName.split('/');
        parts[pathName].shift();

        for (let i = 0; i < parts[pathName].length; i++) {
          if (parts[pathName][i].indexOf('{') > -1) {
            parts[pathName].splice(i);
            break;
          }
        }
      }

      const part = parts[pathName][level];

      if (!part) {
        done = current.slice(0, level);
        break;
      }

      if (!current[level]) {
        current[level] = part;
      } else if (current[level] !== part) {
        done = current.slice(0, level);
        break;
      }
    }

    if (done) {
      break;
    }

    level++;
  }

  if (!done.length) {
    return '';
  }

  const b = done.join('/');

  for (const pathName of paths) {
    let newName = pathName.substr(b.length + 1);
    newName = newName[0] !== '/' ? '/' + newName : newName;
    const t = spec.paths[pathName];
    spec.paths[newName] = t;
    delete spec.paths[pathName];
  }

  return b;
}
