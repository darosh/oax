import worker from '../../assets/worker/index'
import * as types from '../../store/types'

function update (elo, binding, $store) {
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
      el.className += ' markdown'

      $store.commit(types.SPEC_FNC, () => {
        (v[nameJ] || (v[nameJ] = worker({md: v[name]}))).then(md => {
          $store.commit(types.SPEC_FNC, () => {
            delete v[nameJ]
            el.innerHTML = v[name] = md
            v[nameH] = true
          })
        })
      })
    }
  } else if (binding.modifiers.summary && v.description) {
    if (v.description_html) {
      sum(el, binding)
    } else {
      const nameJ = 'description_job'
      $store.commit(types.SPEC_FNC, () => {
        (v[nameJ] || (v[nameJ] = worker({md: v.description}))).then(md => {
          $store.commit(types.SPEC_FNC, () => {
            delete v[nameJ]
            v.description = md
            v.description_html = true
            sum(el, binding)
          })
        })
      })
    }
  }
}

function sum (el, binding, $store) {
  worker({summary: binding.value.description}).then(s => {
    $store.commit(types.SPEC_FNC, () => {
      binding.value.summary = s
    })
    update(el, binding)
  })
}

export default {
  update (el, binding, {context: {$store}}) {
    update(el, binding, $store)
  },
  bind (el, binding, {context: {$store}}) {
    update(el, binding, $store)
  }
}
