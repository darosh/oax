import isArray from 'lodash-es/isArray'
import union from 'lodash-es/union'
import defaults from 'lodash-es/defaults'
import mergeWith from 'lodash-es/mergeWith'
import CircularJSON from 'circular-json'

export default function allOf (item) {
  return resolveAllOf(CircularJSON.parse(CircularJSON.stringify(item)))
}

// based on https://www.npmjs.com/package/json-schema-resolve-allof
function resolveAllOf (inputSpec) {
  // const out;
  if (inputSpec && typeof inputSpec === 'object') {
    if (inputSpec.allOf) {
      const allOf = inputSpec.allOf
      delete inputSpec.allOf
      const nested = mergeWith({}, ...allOf, customizer)
      defaults(inputSpec, nested, customizer)
      // out = _.defaults(inputSpec, nested, customizer);
    } // else {
    // out = inputSpec;
    // }
    // Object.keys(out).forEach((key) => {
    //   out[key] = resolveAllOf(out[key]);
    // });
  }

  return inputSpec
}

function customizer (objValue, srcValue) {
  if (isArray(objValue)) {
    return union(objValue, srcValue)
  }
}
