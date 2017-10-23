<template lang="pug">
  div
    div.focus(:style="{width: width, height: height, top: top, left: left, visibility: visible ? 'visible' : 'hidden'}")
    div.text.display-3(:style="{width: tw + 'px', height: th + 'px', top: tt + 'px', left: tl + 'px', visibility: text ? 'visible' : 'hidden'}") {{text}}
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../../../store/types'

  import position from '../../../assets/scripts/utils/element-position'
  import { select } from '../../../assets/scripts/utils/select'

  export default {
    data () {
      return {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        visible: false,
        text: 'Text',
        tw: 100,
        th: 100,
        tt: 0,
        tl: 0
      }
    },
    created () {
      this.view(this.UI_HIGHLIGHT)
    },
    computed: {
      ...mapGetters([
        types.UI_HIGHLIGHT
      ])
    },
    watch: {
      UI_HIGHLIGHT (value) {
        this.view(value)
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
      },
      view (value) {
        if (!value) {
          return
        }

        const el = select(value.el)
        this.highlight(el)
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
    transition-duration: .25s, .25s, .25s, .25s, .5s
    transition-delay: .25s, .25s, .25s, .25s, .75s

    top: 50%
    left: 50%

    box-shadow: rgba(66, 165, 245, 0.8) 0px 0px 0px 125vmax

  div.text
    position: absolute
    z-index: 9999
    color: #fff
</style>
