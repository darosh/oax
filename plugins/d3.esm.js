import { default as select } from 'd3-selection/src/select'
import { default as line } from 'd3-shape/src/line'

export { format } from 'd3-format/src/defaultLocale'
export { default as arc } from 'd3-shape/src/arc'
export { default as pie } from 'd3-shape/src/pie'
export { default as extent } from 'd3-array/src/extent'
export { default as histogram } from 'd3-array/src/histogram'
export { default as scaleLinear } from 'd3-scale/src/linear'
// export { scaleLinear } from 'd3-scale'
export { default as select } from 'd3-selection/src/select'
// export { default as curveBasis } from 'd3-shape/src/curve/basis'
export { monotoneX } from 'd3-shape/src/curve/monotone'
export { default as line } from 'd3-shape/src/line'

const d3 = {
  select,
  line
}

export default d3
