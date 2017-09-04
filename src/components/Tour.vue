<template lang="pug">
  div.focus(:style="{width: width, height: height, top: top, left: left, visibility: visible ? 'visible' : 'hidden'}")
</template>

<script>
  import position from '../utils/element-position'

  export default {
    data () {
      return {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        visible: false
      }
    },
    created () {
      setTimeout(() => {
        this.highlight(document.querySelector('#app > nav > div > button:nth-child(1) .icon'))
      }, 3000)
      setTimeout(() => {
        this.highlight(document.querySelector('.expansion-panel__header'))
      }, 4000)
      setTimeout(() => {
        this.highlight(document.querySelector('.list--single'))
      }, 5000)
    },
    methods: {
      position,
      highlight (el) {
        const pos = this.position(el)
        this.top = pos.top + 'px'
        this.left = pos.left + 'px'
        this.width = pos.width + 'px'
        this.height = pos.height + 'px'
        this.visible = true
      }
    }
  }
</script>

<style scoped lang="stylus">
  div.focus
    height: 0
    width: 0
    border-radius: 5px
    position: absolute
    z-index: 9999

    transform: translate(-50%, -50%)

    transition-property: top, left, height, width, box-shadow
    transition-duration: .25s, .25s,.25s, .25s, .5s
    transition-delay: .25s, .25s, .25s, .25s, .75s

    top: 50%
    left: 50%
    // box-shadow: 0 0 0 120vmax rgba(0, 0, 0, 0.9)
    box-shadow: rgba(64, 64, 64, 0.8) 0px 0px 0px 125vmax
</style>
