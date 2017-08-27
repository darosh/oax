import { markdown } from '../workers/main'

function update (el, binding) {
  const name = binding.modifiers.summary ? 'summary' : 'description'
  const v = binding.value

  if (v[name]) {
    const mname = '_md_' + name

    if (v[mname]) {
      el.innerHTML = v[mname]
      el.className += ' markdown-body'
    } else {
      el.className += ' markdown-body'
      markdown(v[name]).then(md => {
        el.innerHTML = v[mname] = md
      })
    }
  } else if (binding.modifiers.summary && v.description) {
    // todo summary
  }
}

export default {
  update (el, binding) {
    if (binding.value !== binding.oldValue) {
      update(el, binding)
    }
  },
  componentUpdated (el, binding) {
    if (binding.value !== binding.oldValue) {
      update(el, binding)
    }
  },
  inserted: function (el, binding) {
    if (binding.value) {
      update(el, binding)
    }
  }
}
