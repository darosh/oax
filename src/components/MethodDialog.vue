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
        router-link(to="http-method" class="btn btn--flat btn--icon")
          v-icon list
        v-btn(flat icon @click.native.stop="next()")
          v-icon keyboard_arrow_right
        v-spacer
        a(class="btn btn--flat primary--text" target="_blank" :href="method[2]")
          div(class="btn__content") {{method[1]}}
        v-btn(flat @click.native="setDialog()") Close
</template>

<script>
  import { MethodStyle } from '../services/method-style'
  const methods = () => import('../assets/http-method.json')
  import { mapMutations } from 'vuex'

  export default {
    data () {
      return {
        method: {},
        type: '',
        color: ''
      }
    },
    computed: {
      active: {
        get () {
          return this.$store.state.dialog.name === 'method'
        },
        set (value) {
          if (!value) {
            this.setDialog()
          }
        }
      }
    },
    watch: {
      active: function (val) {
        if (val) {
          this.show(this.$store.state.dialog.payload)
        }
      }
    },
    methods: {
      show (method) {
        methods().then((res) => {
          this.type = method
          this.method = res[method]
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
      },
      ...mapMutations([
        'setDialog'
      ])
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
