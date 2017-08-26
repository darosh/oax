export default {
  inserted: function (el, binding, vnode) {
    if (binding.value) {
      const name = binding.modifiers.summary ? 'summary' : 'description'

      if (binding.value[name]) {
        const mname = '_md_' + name
        el.innerHTML = binding.value[mname]
        el.className += ' markdown-body'
      }
    }
  }
}
