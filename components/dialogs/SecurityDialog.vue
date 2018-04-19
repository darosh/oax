<template lang="pug">
  v-dialog(v-model="active" max-width="480")
    v-card
      v-toolbar.elevation-0(style="background-color: transparent")
        v-toolbar-title Security
        v-spacer
        v-btn(icon @click.native.stop="UI_SET_DIALOG()")
          v-icon close
      v-divider
      v-tabs.dlg-tabs(v-if="SPEC && (tab && active || activated)" v-model="tab", :scrollable="false" style="max-height: calc(90vh - 64px - 1px); overflow: auto")
        //- v-tabs-slider.transparent(:class="Object.keys((SPEC && SPEC.securityDefinitions) || {}).length === 1 ? 'tabs--single' : ''")
        v-tab(ripple :href="'#' + secKey" v-for="(sec, secKey) in SPEC.securityDefinitions", :key="secKey") {{name(sec)}}
        v-tab-item(:id="secKey" v-for="(sec, secKey) in SPEC.securityDefinitions", :key="secKey")
          template(v-if="sec.type === 'oauth2'")
            h3.pl-3.pr-3.pt-3.title
              span.uppercase {{sec.flow}}
              |  OAuth 2.0 Authentication
            div.pl-3.pr-3.pt-1(v-if="sec._.description" v-markdown="sec._")
            .pa-3
              v-checkbox.pa-0(hide-details :label="scopeKey", color="primary" v-model="sec._._scopes[scopeKey]" v-for="(scope, scopeKey) in sec.scopes", :key="scopeKey")
              .pt-3
                v-text-field(hide-details v-model="sec._._clientId" label="Client ID")
                v-text-field(v-if="sec.flow !== 'implicit'" hide-details v-model="sec._._clientSecret" label="Client secret")
                v-text-field(hide-details v-model="sec._._callbackUrl" label="Authorization callback URL")
                v-text-field(v-if="sec.authorizationUrl" hide-details readonly v-model="sec.authorizationUrl" label="Authorization URL")
                v-text-field(v-if="sec.tokenUrl" hide-details readonly v-model="sec.tokenUrl" label="Token URL")
                v-text-field(v-if="sec._._accessToken" persistent-hint :hint="(sec._validFrom ? 'Valid from ' + sec._validFrom : '') + (sec._validFrom && sec._expiresIn ? ', ' : '') + (sec._expiresIn ? 'Expires in ' + sec._expiresIn : '')" readonly v-model="sec._accessToken" label="Access token")
            v-btn.ml-3.mb-3(color="primary", @click="authorize(sec)") Authorize
          template(v-else-if="sec.type === 'apiKey'")
            h3.pl-3.pr-3.pt-3.title API Key Authentication
            div.pl-3.pr-3.pt-1(v-if="sec._.description" v-markdown="sec._")
            .pa-3
              v-text-field(hide-details v-model="sec._._apiKey" label="API key")
          template(v-else-if="sec.type === 'basic'")
            h3.pl-3.pr-3.pt-3.title Basic Authentication
            div.pl-3.pr-3.pt-1(v-if="sec._.description" v-markdown="sec._")
            .pa-3
              v-text-field(hide-details v-model="sec._._user" label="User")
              v-text-field(hide-details type="password" v-model="sec._._password" label="Password")
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import * as types from '../../store/types'
  import { first } from '../../assets/scripts/utils/first'
  import { oauth2, name } from '../../assets/scripts/utils/security'
  import markdown from '../../components/directives/markdown'

  export default {
    directives: {
      markdown
    },
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
        types.UI_DIALOG,
        types.SPEC
      ]),
      active: {
        get () {
          this.activated = this.UI_DIALOG('security') || this.activated
          return this.UI_DIALOG('security')
        },
        set (value) {
          if (!value) {
            this.UI_SET_DIALOG()
          }
        }
      }
    },
    methods: {
      ...mapMutations([
        types.UI_SET_DIALOG
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
  .tabs--single
    display none

  .dlg-tabs >>> .tabs__items
    border-width 1px 0 0 0 !important

  .dlg-tabs >>> .tabs--single + .tabs__items
    border-width 0 !important

  .uppercase
    text-transform uppercase
</style>
