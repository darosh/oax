import { markdown, summary } from '../worker'

// const loading = 'Loading&hellip;'

function update (el, binding) {
  if (binding.value === binding.oldValue) {
    return
  }

  const name = binding.modifiers.summary ? 'summary' : 'description'
  const v = binding.value

  if (v[name] || v._[name]) {
    const mname = '_md_' + name
    const jname = mname + '_job'

    if (!v._) {
      v._ = {}
    }

    if (v._[mname]) {
      el.innerHTML = v._[mname]
      el.className += ' markdown'
    } else {
      // el.innerHTML = loading
      el.className += ' markdown';
      (v._[jname] || (v._[jname] = markdown(v[name] || v._[name]))).then(md => {
        delete v._[jname]
        el.innerHTML = v._[mname] = md
      })
    }
  } else if (binding.modifiers.summary && v._.description) {
    // el.innerHTML = loading
    if (v._._md_description) {
      sum(el, binding)
    } else {
      const jname = '_md_description_job';
      (v._[jname] || (v._[jname] = markdown(v._.description))).then(md => {
        delete v._[jname]
        v._._md_description = md
        sum(el, binding)
      })
    }
  }
}

function sum (el, binding) {
  summary(binding.value._._md_description).then(s => {
    binding.value._.summary = s
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
