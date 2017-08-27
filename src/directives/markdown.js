import { markdown, summary } from '../workers/main'

function update (el, binding) {
  const name = binding.modifiers.summary ? 'summary' : 'description'
  const v = binding.value

  if (v[name]) {
    const mname = '_md_' + name
    const jname = mname + '_job'

    if (v[mname]) {
      el.innerHTML = v[mname]
      el.className += ' markdown-body'
    } else {
      el.className += ' markdown-body';
      (v[jname] || (v[jname] = markdown(v[name]))).then(md => {
        delete v[jname]
        el.innerHTML = v[mname] = md
      })
    }
  } else if (binding.modifiers.summary && v.description) {
    if (v._md_description) {
      sum(el, binding)
    } else {
      const jname = '_md_description_job';
      (v[jname] || (v[jname] = markdown(v.description))).then(md => {
        delete v[jname]
        v._md_description = md
        sum(el, binding)
      })
    }
  }
}

function sum (el, binding) {
  summary(binding.value._md_description).then(s => {
    binding.value.summary = s
    update(el, binding)
  })
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
