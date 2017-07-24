<template lang="pug">
  v-dialog(v-model="active" width="480")
    v-card
      v-card-title
        span.headline Security
      v-tabs.dlg-tabs(v-if="tab" v-model="tab", :scrollable="false")
        v-tabs-bar.tabs--transparent(slot="activators")
          v-tabs-item(ripple :href="secKey" v-for="(sec, secKey) in SPEC.securityDefinitions", :key="secKey") {{sec.type}}
          v-tabs-slider
        v-tabs-content(:id="secKey" v-for="(sec, secKey) in SPEC.securityDefinitions", :key="secKey")
          div.pa-3 {{sec.description}}
          template(v-if="sec.type === 'oauth2'")
            .pa-3
              | {{sec}}
              v-checkbox(:label="scopeKey", color="primary" v-for="(scope, scopeKey) in sec.scopes", :key="scopeKey")
      v-card-actions
        v-spacer
        v-btn(flat @click.native.stop="SET_DIALOG()") Close
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import * as types from '../../store/types'
  import { first } from '../../services/utils'

  export default {
    data () {
      return {
        tab: null
      }
    },
    created () {
      this.setTab(this.SPEC)
    },
    computed: {
      ...mapGetters([
        types.DIALOG_IS,
        types.SPEC
      ]),
      active: {
        get () {
          return this.DIALOG_IS('security')
        },
        set (value) {
          if (!value) {
            this.SET_DIALOG()
          }
        }
      }
    },
    methods: {
      ...mapMutations([
        types.SET_DIALOG
      ]),
      setTab (val) {
        if (val) {
          this.tab = first(val.securityDefinitions)
        } else {
          this.tab = null
        }
      }
    },
    watch: {
      SPEC: function (val) { this.setTab(val) },
      active: function (val) {
        if (val) {
          this.setTab(this.SPEC)
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .tabs--transparent
    background-color transparent

  //.app--tabs >>> .tabs__items
    //border-width 1px 0 0 0 !important

  .dlg-tabs
    width 480px
    max-width 480px
</style>
