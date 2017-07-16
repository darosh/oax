<template lang="pug">
  v-dialog(v-model="active" width="360")
    v-card
      v-toolbar(:class="color")
        v-toolbar-title
          span(class="headline upper") {{type}}
        v-spacer
        v-toolbar-title
          span(class="subheader") HTTP Method
      v-card-text
        div(class="group")
          div
            v-icon {{method[3] ? 'check_box' : 'check_box_outline_blank'}}
            |  Safe
          div
            v-icon {{method[4] ? 'check_box' : 'check_box_outline_blank'}}
            |  Idempotent
          div
            v-icon {{method[5] ? 'check_box' : 'check_box_outline_blank'}}
            |  Cacheable
      v-divider
      v-card-text(class="capitalize") {{method[0]}}
      v-card-actions
        v-btn(flat icon @click.native.stop="next(true)")
          v-icon keyboard_arrow_left
        v-btn(flat icon @click.native.stop="next()")
          v-icon keyboard_arrow_right
        v-spacer
        a(class="btn btn--flat primary--text" target="_blank" @click.native="active = false" :href="method[2]")
          div(class="btn__content") {{method[1]}}
        v-btn(flat @click.native="active = false") Close
</template>

<script>
  import { bus } from '../services/bus'
  import { MethodStyle } from '../services/method-syle'
  const methods = () => import('../assets/http-method.json')

  export default {
    data () {
      return {
        active: false,
        method: {},
        type: '',
        color: ''
      }
    },
    methods: {
      show (method) {
        methods().then((res) => {
          this.type = method
          this.method = res[method]
          this.color = MethodStyle[method]
          this.active = true
        })
      },
      next (prev) {
        methods().then((res) => {
          const ms = Object.keys(res)
          let ind = ms.indexOf(this.type) + (prev ? -1 : 1)
          ind = ind < 0 ? ms.length - 1 : ind >= ms.length ? 0 : ind
          this.show(ms[ind])
        })
      }
    },
    created () {
      bus.$on('dialog:method', this.show)
    },
    destroyed () {
      bus.$off('dialog:method', this.show)
    }
  }
</script>

<style lang="stylus">
  .group
    display: flex
    flex: 1
    justify-content: space-between

  .upper
    text-transform uppercase

  .capitalize::first-letter
    text-transform uppercase
</style>
