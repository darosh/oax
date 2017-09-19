<!-- Modified version of node_modules/vuetify/src/components/VIcon/VIcon.vue -->
<!-- Adding inline SVG icon support -->
<!-- Removing icon font support -->
<!-- Fill styles may be missing -->

<script>
  import Themeable from '../../mixins/themeable'
  import Contextualable from '../../mixins/contextualable'
  import * as icons from '../../../../../src/utils/icons'

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
      // if (props.fa || props.mdi) console.warn(
      // `The v-icon prop 'fa' and 'mdi' will be deprecated in the next release. Use 'fa' or 'mdi' prefix in icon name instead.`)
      let iconName = ''
      // let iconType = 'material-icons'
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

      // const thirdPartyIcon = iconName.indexOf('-') > -1
      // if (thirdPartyIcon) iconType = iconName.slice(0, iconName.indexOf('-'))

      // To keep things backwards compatible for now
      // iconType = props.fa ? 'fa' : props.mdi ? 'mdi' : iconType

      data.staticClass = (`${iconType} icon ${data.staticClass || ''}`).trim()
      data.attrs = data.attrs || {}

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

      // To keep things backwards compatible for now
      // if (props.fa || props.mdi) {
      // const comparison = props.fa ? 'fa' : 'mdi'

      // if (iconName.indexOf(' ') > -1) data.staticClass += ` ${comparison}-${iconName}`
      // else data.staticClass += ` ${comparison}-${iconName.split(' ').join('-')}`
      // }

      // if (thirdPartyIcon) data.staticClass += ` ${iconName}`
      if (props.disabled) data.attrs.disabled = props.disabled
      // !(thirdPartyIcon || props.fa || props.mdi) && children.push(iconName)

      const svgData = {attrs: {}}
      svgData.attrs.width = 24
      svgData.attrs.height = 24
      svgData.attrs.viewBox = '0 0 24 24'
      svgData.attrs.version = '1.1'
      svgData.attrs.xmlns = 'http://www.w3.org/2000/svg'

      if (!icons[iconName]) {
        console.info(`Missing icon ${iconName}.`)
      }

      // return h('i', data, children)
      return h('i', data,
        [h('svg', svgData, [h('path', {attrs: {d: icons[iconName]}})])]
      )
    }
  }
</script>

<style lang="stylus" src="../../stylus/components/_icons.styl"></style>
<style lang="stylus">
  @import '../../stylus/bootstrap'
  @import '../../stylus/theme'

  icon($material)
    fill: $material.icons.active

    &:disabled
      fill: $material.icons.inactive

  theme(icon, "icon")

  .white--text
  .white--text .icon
    fill: #fff !important

  svg.icon
    display: inline-block

  .icon--large
    transform: scale(1.5)
    transform-origin: left top

  .application--light .stepper .stepper__step__step .icon
    fill: #fff

  .stepper__step__step .icon
    transform: scale(0.75)

  .application .theme--dark.btn .icon
    fill: #fff

  .datatable thead th .icon svg
    width: 16px
    height: 16px
    margin-top -1px

  .datatable thead th.column.sortable.active.desc i
    transform-origin: center 9px !important
</style>
