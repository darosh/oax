import { trim } from './md-converter'

export function md (obj, key = 'description') {
  if (!obj['_md_' + key]) {
    obj['_md_' + key] = trim(obj[key].trim())
  }

  return obj['_md_' + key]
}

// import { run } from '../workers/md-service'
// import Vue from 'vue'
//
// export function md (obj, key = 'description') {
//   const mk = '_md_' + key
//
//   if (obj[mk]) {
//     return obj[mk]
//   } else {
//     const q = run(obj[key])
//
//     q.then(r => {
//       obj[mk] = r
    // })
    //
    // Vue.set(obj, mk, '')
    //
    // return obj[mk]
  // }
// }
