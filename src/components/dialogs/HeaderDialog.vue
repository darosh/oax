<template lang="pug">
  v-dialog(v-model='active')
    v-card
      v-toolbar(:class='color')
        v-toolbar-title
          span.headline {{type}}
        v-spacer
        v-toolbar-title
          span.subheader HTTP Method
      v-card-text
        | {{method[0]}}
      v-card-actions
        a.btn.btn--flat.primary--text(target='_blank', @click.native='active = false', :href='method[2]')
          .btn__content {{method[1]}}
        v-spacer
        v-btn(flat @click.native='active = false') Close
</template>

<script>
  import { MethodStyle } from '../../services/method-style'
  import { mapMutations, mapGetters } from 'vuex'
  const methods = () => import('../../assets/http-method.json')
  import * as types from '../../store/types'

  export default {
    data () {
      return {
        active: false,
        method: {},
        type: '',
        color: ''
      }
    },
    computed: {
      ...mapGetters([
        types.DIALOG_IS
      ])
    },
    methods: {
      ...mapMutations([
        types.SET_DIALOG
      ]),
      show (method) {
        methods().then((res) => {
          this.type = method
          this.method = res[method]
          this.color = MethodStyle[method]
          this.active = true
        })
      }
    }
  }
</script>
