<template lang="pug">
  v-dialog(v-model="active" width="360")
    v-card
      v-toolbar(:class="color")
        v-toolbar-title {{type}}: {{status[0]}}
        v-spacer
        v-toolbar-title
          span(class="subheader") HTTP Status
      v-card-text(class="capitalize" v-html="status[1]")
      v-card-actions
        v-btn(flat icon @click.native.stop="next(true)")
          v-icon keyboard_arrow_left
        v-btn(flat icon @click.native.stop="next()")
          v-icon keyboard_arrow_right
        v-spacer
        a(class="btn btn--flat primary--text" target="_blank" @click.native="active = false" :href="status[3]")
          div(class="btn__content btn--short") {{status[2]}}
        v-btn(flat @click.native="active = false") Close
</template>

<script>
  import { bus } from '../services/bus'
  import { ResponseStyle } from '../services/response-style'
  import { toHtml } from '../services/markdown'
  const data = () => import('../assets/http-status.json')

  export default {
    data () {
      return {
        active: false,
        status: {},
        type: '',
        color: ''
      }
    },
    methods: {
      show (code) {
        data().then((res) => {
          this.type = code
          this.status = res[code] || ['', '', '', '']
          this.status[1] = toHtml(this.status[1])
          this.status[2] = this.status[2].length > 15 ? this.status[2].substr(0, 14) + '\u2026' : this.status[2]
          this.color = ResponseStyle[code[0]]
          this.active = true
        })
      },
      next (prev) {
        data().then((res) => {
          const ms = Object.keys(res)
          let ind = ms.indexOf(this.type) + (prev ? -1 : 1)
          ind = ind < 0 ? ms.length - 1 : ind >= ms.length ? 0 : ind
          this.show(ms[ind])
        })
      }
    },
    created () {
      bus.$on('dialog:status', this.show)
    },
    destroyed () {
      bus.$off('dialog:status', this.show)
    }
  }
</script>
