<template lang="pug">
  v-dialog(v-model="active" width="360")
    v-card
      v-toolbar.elevation-0
        v-spacer
        v-toolbar-title
          span.subheader HTTP Header
      v-card-text
        div.pb-3.headline {{header[0]}}
        | {{header[1]}}
      v-card-actions
        v-btn(flat icon @click.native.stop="next(true)")
          v-icon keyboard_arrow_left
        v-btn(flat icon to="http-headers" tag="a")
          v-icon list
        v-btn(flat icon @click.native.stop="next()")
          v-icon keyboard_arrow_right
        v-spacer
        a.btn.btn--flat.primary--text(v-if="header[3]" target="_blank", @click.native.stop="active = false", :href="header[3]")
          .btn__content {{ref}}
        v-btn(flat @click.native.stop="active = false") Close
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import * as types from '../../store/types'
  import limit from '../../services/limit'

  const headers = () => import('../../assets/http-header.json')

  export default {
    data () {
      return {
        type: '',
        header: [],
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
          return this.DIALOG_IS('header')
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
      show (param) {
        this.type = param.toLowerCase()
        headers().then((res) => {
          this.header = res[this.type] || [param, 'Unknown header', '', '']
          this.ref = limit(this.header[2])
        })
      },
      next (prev) {
        headers().then((res) => {
          const ms = Object.keys(res)
          let ind = ms.indexOf(this.type) + (prev ? -1 : 1)
          ind = ind < 0 ? ms.length - 1 : ind >= ms.length ? 0 : ind
          this.show(ms[ind])
        })
      }
    }
  }
</script>
