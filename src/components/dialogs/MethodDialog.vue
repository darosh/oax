<template lang="pug">
  v-dialog(v-model="active" width="360")
    v-card.elevation-0
      v-toolbar.elevation-0(:class="color" dark)
        v-toolbar-title
          span(class="main-title upper") {{type}}
        v-spacer
        v-toolbar-title
          span.subheader.white--text HTTP Method
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
        v-btn(flat icon to="http-methods" tag="a")
          v-icon list
        v-btn(flat icon @click.native.stop="next()")
          v-icon keyboard_arrow_right
        v-spacer
        a(class="btn btn--flat primary--text" target="_blank", :href="method[2]")
          div(class="btn__content") Spec
        v-btn(flat @click.native.stop="UI_SET_DIALOG()") Close
</template>

<script>
  import { MethodStyle } from '../../services/method-style'
  import limit from '../../utils/limit'
  import dialog from '../../mixins/dialog'

  const methods = () => import('../../assets/http-method.json')

  export default {
    mixins: [dialog],
    data () {
      return {
        dialog: 'method',
        method: []
      }
    },
    methods: {
      show (method) {
        methods().then((res) => {
          this.initialized = true
          this.type = method
          this.method = res[method]
          this.ref = limit(this.method[1])
          this.color = MethodStyle[method]
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
    }
  }
</script>

<style scoped lang="stylus">
  .group
    display: flex
    flex: 1
    justify-content: space-between

  .upper
    text-transform uppercase

  .capitalize::first-letter
    text-transform uppercase
</style>
