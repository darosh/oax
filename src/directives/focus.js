function update (el, binding) {
  const input = el.querySelector('input')

  if (input) {
    if (binding.modifiers.wait) {
      setTimeout(() => {
        input.focus()
      }, 300)
    } else {
      input.focus()
    }
  }
}

export default {
  update (el, binding) {
    if (binding.value) {
      update(el, binding)
    }
  },
  componentUpdated (el, binding) {
    if (binding.value) {
      update(el, binding)
    }
  },
  inserted: function (el, binding) {
    if (binding.value) {
      update(el, binding)
    }
  }
}
