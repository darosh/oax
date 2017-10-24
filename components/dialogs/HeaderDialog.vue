<template lang="pug">
  v-dialog(v-model="active" max-width="360" content-class="dialog--info")
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
        v-btn(flat icon to="headers" tag="a")
          v-icon list
        v-btn(flat icon @click.native.stop="next()")
          v-icon keyboard_arrow_right
        v-spacer
        v-btn.btn--short.primary--text(flat v-if="header[3]" target="_blank" rel="noopener", @click.native.stop="active = false", :href="header[3]") Spec
        v-btn(flat @click.native.stop="active = false") Close
</template>

<script>
  import limit from '../../assets/scripts/utils/limit'
  import dialog from '../mixins/dialog'

  const headers = () => import('../../assets/data/http-header.json')

  export default {
    mixins: [dialog],
    data () {
      return {
        dialog: 'header',
        header: []
      }
    },
    methods: {
      show (param) {
        this.type = param.toLowerCase()
        headers().then((res) => {
          this.initialized = true
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
