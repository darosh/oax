function update (el, binding) {
  const input = el.querySelector('input')

  if (input && (window.innerWidth > 1200)) {
    if (binding.modifiers.wait) {
      setTimeout(() => {
        input.focus()
        input.select()
      }, 320)
    } else {
      input.focus()
      input.select()
    }
  }
}

export default {
  update (el, binding) {
    if (binding.value && !binding.oldValue) {
      update(el, binding)
    }
  },
  componentUpdated (el, binding) {
    if (binding.value && !binding.oldValue) {
      update(el, binding)
    }
  },
  inserted: function (el, binding) {
    if (binding.value) {
      update(el, binding)
    }
  }
}
