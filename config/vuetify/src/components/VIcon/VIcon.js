require('../../stylus/components/_icons.styl')

import Themeable from '../../mixins/themeable'
import Contextualable from '../../mixins/contextualable'
import * as icons from '../../../../../assets/utils/icons'

export default {
  name: 'v-icon',

  functional: true,

  mixins: [Themeable, Contextualable],

  props: {
    disabled: Boolean,
    fa: Boolean,
    mdi: Boolean,
    large: Boolean,
    left: Boolean,
    medium: Boolean,
    right: Boolean,
    xLarge: Boolean
  },

  render (h, { props, data, children = [] }) {
    let iconName = ''
    let iconType = 'svg'

    if (children.length) {
      iconName = children.pop().text
    } else if (data.domProps && data.domProps.textContent) {
      iconName = data.domProps.textContent
      delete data.domProps.textContent
    } else if (data.domProps && data.domProps.innerHTML) {
      iconName = data.domProps.innerHTML
      delete data.domProps.innerHTML
    }

    data.staticClass = ('icon ' + (data.staticClass || '')).trim();

    const classes = {
      'icon--large': props.large,
      'icon--left': props.left,
      'icon--medium': props.medium,
      'icon--right': props.right,
      'icon--x-large': props.xLarge,
      'primary--text': props.primary,
      'secondary--text': props.secondary,
      'success--text': props.success,
      'info--text': props.info,
      'warning--text': props.warning,
      'error--text': props.error,
      'theme--dark': props.dark,
      'theme--light': props.light
    }

    const iconClasses = Object.keys(classes).filter(k => classes[k]).join(' ')
    iconClasses && (data.staticClass += ` ${iconClasses}`)

    if (props.disabled) data.attrs.disabled = props.disabled

    const svgData = {attrs: {}}
    svgData.attrs.width = 24
    svgData.attrs.height = 24
    svgData.attrs.viewBox = '0 0 24 24'
    svgData.attrs.version = '1.1'
    svgData.attrs.xmlns = 'http://www.w3.org/2000/svg'

    if (!icons[iconName]) {
      console.info(`Missing icon ${iconName}.`)
    }

    return h('i', data,
      [h('svg', svgData, [h('path', {attrs: {d: icons[iconName]}})])]
    )
  }
}
