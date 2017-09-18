import _ from 'lodash'
import CircularJSON from 'circular-json'

export default function allOf (item) {
  return resolveAllOf(CircularJSON.parse(CircularJSON.stringify(item)))
}

function resolveAllOf (inputSpec) {
  // const out;
  if (inputSpec && typeof inputSpec === 'object') {
    if (inputSpec.allOf) {
      const allOf = inputSpec.allOf
      delete inputSpec.allOf
      const nested = _.mergeWith({}, ...allOf, customizer)
      _.defaults(inputSpec, nested, customizer)
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
  if (_.isArray(objValue)) {
    return _.union(objValue, srcValue)
  }
}
