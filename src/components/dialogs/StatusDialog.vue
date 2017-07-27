<template lang="pug">
  v-dialog(v-model="active" width="360")
    v-card
      v-toolbar.elevation-0(:class="color" dark)
        v-toolbar-title(class="main-title") {{type}}
        v-spacer
        v-toolbar-title
          span(class="subheader") HTTP Status
      v-card-text
        div(v-if="status[0]" class="title mb-3 mt-2") {{status[0]}}
        div(class="capitalize" v-html="status[1]")
      v-card-actions
        v-btn(flat icon @click.native.stop="next(true)")
          v-icon keyboard_arrow_left
        v-btn(flat icon to="http-statuses" tag="a")
          v-icon list
        v-btn(flat icon @click.native.stop="next()")
          v-icon keyboard_arrow_right
        v-spacer
        a(v-if="status[2]" class="btn btn--flat primary--text" target="_blank" :href="status[3]")
          div(class="btn__content btn--short") Spec
        v-btn(flat @click.native.stop="SET_DIALOG()") Close
</template>

<script>
  import { ResponseStyle } from '../../services/response-style'
  import { toHtml } from '../../services/markdown'
  import { mapMutations, mapGetters } from 'vuex'
  import * as types from '../../store/types'
  import limit from '../../services/limit'

  const json = () => import('../../assets/http-status.json')

  export default {
    data () {
      return {
        status: {},
        type: '',
        color: '',
        ref: ''
      }
    },
    created () {
      if (this.DIALOG_PARAM && this.active) {
        this.show(this.DIALOG_PARAM)
      }
    },
    computed: {
      ...mapGetters([
        types.DIALOG_IS,
        types.DIALOG_PARAM
      ]),
      active: {
        get () {
          return this.DIALOG_IS('status')
        },
        set (value) {
          if (!value) {
            this.SET_DIALOG()
          }
        }
      }
    },
    watch: {
      active: function (val) {
        if (val) {
          this.show(this.DIALOG_PARAM)
        }
      }
    },
    methods: {
      ...mapMutations([
        types.SET_DIALOG
      ]),
      show (code) {
        json().then((res) => {
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

          this.status[1] = toHtml(this.status[1])
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
</style>
