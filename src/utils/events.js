export function throttle (type, name, time = 200, obj = window) {
  let running = false

  const func = function () {
    if (running) {
      return
    }

    running = true

    setTimeout(function () {
      obj.dispatchEvent(new CustomEvent(name))
      running = false
    }, time)
  }

  obj.addEventListener(type, func)
}
