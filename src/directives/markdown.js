import { markdown } from '../workers/main'

function update (el, binding) {
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

export default {
  update (el, binding) {
    if (binding.value !== binding.oldValue) {
      update(el, binding)
    }
  },
  // componentUpdated (el, binding) {
  //   if (binding.value !== binding.oldValue) {
  //     update(el, binding)
  //   }
  // },
  inserted: function (el, binding) {
    if (binding.value) {
      update(el, binding)
    }
  }
}
