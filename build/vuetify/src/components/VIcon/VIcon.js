require('../../stylus/components/_icons.styl')

import Themeable from '../../mixins/themeable'
import Contextualable from '../../mixins/contextualable'
import Vue from 'vue'

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

  render (h, {props, data, children = []}) {
    let iconName = ''

    if (children.length) {
      iconName = children.pop().text
    } else if (data.domProps && data.domProps.textContent) {
      iconName = data.domProps.textContent
      delete data.domProps.textContent
    } else if (data.domProps && data.domProps.innerHTML) {
      iconName = data.domProps.innerHTML
      delete data.domProps.innerHTML
    }

    data.staticClass = ('icon ' + (data.staticClass || '')).trim()

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

    if (props.disabled) {
      data.attrs = data.attrs || {}
      data.attrs.disabled = props.disabled
    }

    const svgData = {attrs: {}}
    svgData.attrs.width = 24
    svgData.attrs.height = 24
    svgData.attrs.viewBox = '0 0 24 24'
    svgData.attrs.version = '1.1'
    svgData.attrs.xmlns = 'http://www.w3.org/2000/svg'

    const $icons = typeof window !== 'undefined' ? window.$icons : global.$icons

    if (!$icons || !$icons[iconName]) {
      console.warn(`Missing icon ${iconName}.`)
    }

    const pathData = ($icons && $icons[iconName]) || 'M4 4 H 20 V 20 H 4 L 4 4'

    svgData.domProps = {
      innerHTML: pathData[0] === '<' ? `<g>${pathData}</g>` : `<path d="${pathData}" />`
    }

    return h('i', data, [h('svg', svgData)])
  }
}
