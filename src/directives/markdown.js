import { markdown, summary } from '../worker'

// const loading = 'Loading&hellip;'

function update (elo, binding) {
  if (binding.value === binding.oldValue) {
    return
  }

  const el = !binding.modifiers.hint ? elo : elo.querySelector('.input-group__hint')
  const name = binding.modifiers.summary ? 'summary' : 'description'
  const v = binding.value

  if (typeof v === 'string') {
    el.textContent = v
  } else if (v[name]) {
    const nameH = name + '_html'
    const nameJ = name + '_job'

    if (v[nameH]) {
      el.innerHTML = v[name]
      el.className += ' markdown'
    } else {
      // el.innerHTML = loading
      el.className += ' markdown';
      (v[nameJ] || (v[nameJ] = markdown(v[name]))).then(md => {
        delete v[nameJ]
        el.innerHTML = v[name] = md
        v[nameH] = true
      })
    }
  } else if (binding.modifiers.summary && v.description) {
    // el.innerHTML = loading
    if (v.description_html) {
      sum(el, binding)
    } else {
      const nameJ = 'description_job';
      (v[nameJ] || (v[nameJ] = markdown(v.description))).then(md => {
        delete v[nameJ]
        v.description = md
        v.description_html = true
        sum(el, binding)
      })
    }
  }
}

function sum (el, binding) {
  summary(binding.value.description).then(s => {
    binding.value.summary = s
    update(el, binding)
  })
}

export default {
  update (el, binding) {
    // if (binding.value !== binding.oldValue) {
    update(el, binding)
    // }
  },
  bind (el, binding) {
    // if (binding.value !== binding.oldValue) {
    update(el, binding)
    // }
  }
  // inserted: function (el, binding) {
  //   if (binding.value) {
  //   update(el, binding)
  // }
  // }
}
