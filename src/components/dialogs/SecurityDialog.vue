<template lang="pug">
  v-dialog(v-model="active" width="480")
    v-card
      v-toolbar.elevation-0(style="background-color: transparent")
        v-toolbar-title Security
        v-spacer
        v-btn(icon @click.native.stop="SET_DIALOG()")
          v-icon close
      v-divider
      v-tabs.dlg-tabs(v-if="tab && active || activated" v-model="tab", :scrollable="false" style="max-height: calc(90vh - 64px - 1px); overflow: auto")
        v-tabs-bar.tabs--transparent(slot="activators")
          v-tabs-item(ripple :href="secKey" v-for="(sec, secKey) in SPEC.securityDefinitions", :key="secKey") {{name(sec)}}
          v-tabs-slider
        v-tabs-content(:id="secKey" v-for="(sec, secKey) in SPEC.securityDefinitions", :key="secKey")
          h3.pl-3.pr-3.pt-3.title OAuth 2.0 Authentication
            span.subheading.uppercase  {{sec.flow}}
          div.pl-3.pr-3.pt-1 {{sec.description}}
          template(v-if="sec.type === 'oauth2'")
            .pa-3
              v-checkbox.pa-0(hide-details :label="scopeKey", color="primary" v-model="sec._scopes[scopeKey]" v-for="(scope, scopeKey) in sec.scopes", :key="scopeKey")
              .pt-3
                v-text-field(hide-details v-model="sec._clientId" label="Client ID")
                v-text-field(hide-details v-model="sec._clientSecret" label="Client secret")
                v-text-field(hide-details v-model="sec._callbackUrl" label="Authorization callback URL")
                v-text-field(v-if="sec.authorizationUrl" hide-details readonly v-model="sec.authorizationUrl" label="Authorization URL")
                v-text-field(v-if="sec.tokenUrl" hide-details readonly v-model="sec.tokenUrl" label="Token URL")
                v-text-field(v-if="sec._accessToken" persistent-hint :hint="(sec._validFrom ? 'Valid from ' + sec._validFrom : '') + (sec._validFrom && sec._expiresIn ? ', ' : '') + (sec._expiresIn ? 'Expires in ' + sec._expiresIn : '')" readonly v-model="sec._accessToken" label="Access token")
            v-btn.ml-3.mb-3(primary @click="authorize(sec)") Authorize
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import * as types from '../../store/types'
  import { first } from '../../services/utils'
  import { oauth2, name } from '../../services/security'

  export default {
    data () {
      return {
        tab: null,
        activated: false
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
          this.activated = this.DIALOG_IS('security') || this.activated
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
      },
      authorize (sec) {
        oauth2(sec)
      },
      name (sec) {
        return name(sec)
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

  .dlg-tabs >>> .tabs__items
    border-width 1px 0 1px 0 !important

  .uppercase
    text-transform uppercase
</style>
