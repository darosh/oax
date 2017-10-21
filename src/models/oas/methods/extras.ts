// TODO this is slower than expected (without iter/level limit)

let index: any[] = null;

export function extras(obj: any) {
  index = [];
  iter(obj);
  index = null;
}

function iter(obj: any, level = 0) {
  const keys = Object.keys(obj);

  for (const ki of keys) {
    const o = obj[ki];

    if (ki[0] === 'x' && ki[1] === '-') {
      delete obj[ki];
    } else if ((level < 3) && o && (typeof o === 'object') && (index.indexOf(o) === -1)) {
      index.unshift(o);
      iter(o, level + 1);
    }
  }
}
