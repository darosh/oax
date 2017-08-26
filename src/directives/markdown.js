import { markdown } from '../workers/main'

export default {
  inserted: function (el, binding, vnode) {
    if (binding.value) {
      const name = binding.modifiers.summary ? 'summary' : 'description'

      if (binding.value[name]) {
        const mname = '_md_' + name

        if (binding.value[mname]) {
          el.innerHTML = binding.value[mname]
          el.className += ' markdown-body'
        } else {
          el.className += ' markdown-body'
          markdown(binding.value[name]).then(md => {
            el.innerHTML = binding.value[mname] = md
          })
        }
      }
    }
  }
}
