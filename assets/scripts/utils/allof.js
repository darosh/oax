import { isArray, union, defaults, mergeWith } from '../../../plugins/lodash'

import CircularJSON from 'circular-json'

export function allOf (item) {
  return resolveAllOf(CircularJSON.parse(CircularJSON.stringify(item)))
}

// based on https://www.npmjs.com/package/json-schema-resolve-allof
function resolveAllOf (inputSpec) {
  mergeAllOf(inputSpec)
  const allOf = inputSpec.allOf
  delete inputSpec.allOf
  const nested = mergeWith({}, ...allOf, customizer)
  defaults(inputSpec, nested, customizer)

  return inputSpec
}

function customizer (objValue, srcValue) {
  if (isArray(objValue)) {
    return union(objValue, srcValue)
  }
}

export function mergeAllOf (spec) {
  for (let i = 0; i < spec.allOf.length; i++) {
    if (spec.allOf[i].allOf) {
      Array.prototype.splice.apply(spec.allOf, [i, 1].concat(spec.allOf[i].allOf))
      i--
    }
  }

  return spec
}
