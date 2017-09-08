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
    methods: {
      position,
      highlight (el) {
        const pos = this.position(el)
        this.top = pos.top + 'px'
        this.left = pos.left + 'px'
        this.width = Math.max(pos.width, pos.height) + 'px'
        this.height = Math.max(pos.width, pos.height) + 'px'
        this.visible = true
      }
    }
  }
</script>

<style scoped lang="stylus">
  div.focus
    height: 0
    width: 0
    border-radius: 50%
    position: absolute
    z-index: 9999

    transform: translate(-50%, -50%)

    transition-property: top, left, height, width, box-shadow
    transition-duration: .25s, .25s,.25s, .25s, .5s
    transition-delay: .25s, .25s, .25s, .25s, .75s

    top: 50%
    left: 50%

    // box-shadow: 0 0 0 120vmax rgba(0, 0, 0, 0.9)
    box-shadow: rgba(66, 165, 245, 0.8) 0px 0px 0px 125vmax
</style>
