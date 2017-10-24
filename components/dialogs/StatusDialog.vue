<template lang="pug">
  v-dialog(v-model="active" max-width="360" content-class="dialog--info")
    v-card
      v-toolbar.elevation-0(:class="color" dark)
        v-toolbar-title.main-title {{type}}
        v-spacer
        v-toolbar-title
          span.white--text.subheader HTTP Status
      v-card-text
        div(v-if="status[0]" class="title mb-3 mt-2" v-html="status[0]")
        div(class="capitalize" v-html="status[1]")
      v-card-actions
        v-btn(flat icon @click.native.stop="next(true)")
          v-icon keyboard_arrow_left
        v-btn(flat icon to="statuses" tag="a")
          v-icon list
        v-btn(flat icon @click.native.stop="next()")
          v-icon keyboard_arrow_right
        v-spacer
        v-btn.btn--short.primary--text(flat v-if="status[2]" target="_blank" rel="noopener", :href="status[3]") Spec
        v-btn.btn--short(flat @click.native.stop="UI_SET_DIALOG()") Close
</template>

<script>
  import { ResponseStyle } from '../../assets/scripts/services/response-style'
  import limit from '../../assets/scripts/utils/limit'
  import dialog from '../mixins/dialog'

  const json = () => import('../../assets/data/http-status.json')

  export default {
    mixins: [dialog],
    data () {
      return {
        dialog: 'status',
        status: {}
      }
    },
    methods: {
      show (code) {
        json().then((res) => {
          this.initialized = true
          this.type = code
          this.status = res[code]

          if (code === 'default') {
            this.status = [
              '',
              '“Default” means this response is used for all HTTP codes that are not covered individually for this operation.',
              '',
              '']
          }

          if (!this.status) {
            this.type = (code)[0] + 'xx'
            this.status = res[this.type]
          }

          this.status[1] = this.status[1]
          this.ref = limit(this.status[2])
          this.color = ResponseStyle[this.type[0]]
          this.active = true
        })
      },
      next (prev) {
        json().then((res) => {
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
  .main-title.toolbar__title
    max-width: 220px
    font-family "Roboto Mono", monospace

  .capitalize::first-letter
    text-transform uppercase

  >>> p
    margin 0
</style>
