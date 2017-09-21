export function next (current, array) {
  return array[(array.indexOf(current) + 1) % array.length]
}
