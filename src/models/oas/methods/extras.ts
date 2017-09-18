// TODO this is slower than expected (without iter/level limit)

let index: any[] = null;

export function extras(obj: any) {
  index = [];
  iter(obj);
  index = null;
}

function iter(obj: any, level = 0) {
  const keys = Object.keys(obj);

  for (let i = 0; i < keys.length; i++) {
    const o = obj[keys[i]];

    if (keys[i][0] === 'x' && keys[i][1] === '-') {
      delete obj[keys[i]];
    } else if ((level < 3) && o && (typeof o === 'object') && (index.indexOf(o) === -1)) {
      index.unshift(o);
      iter(o, level + 1);
    }
  }
}
