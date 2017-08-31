import { trim } from './markdown'

export function md (obj, key = 'description') {
  const mkey = '_md_' + key

  if (!obj._[mkey]) {
    obj._[mkey] = trim(obj._[key])
  }

  return obj._[mkey]
}
