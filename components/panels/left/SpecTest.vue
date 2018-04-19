<template lang="pug">
  div
    v-divider
    .mt-3.text-xs-center(v-if="!VALIDATOR")
      v-progress-circular(class="primary--text" indeterminate)
    div(v-else)
      v-alert.ma-0(v-if="!Object.keys(VALIDATOR).length" color="success" icon="check_circle" value="true") There are no issues.
      div.scroller(v-else)
        v-alert.ma-0(color="error" icon="warning" value="true") There are issues.
        pre.app-example.pa-3
          app-json(:item="VALIDATOR")
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as types from '../../../store/types'
  import appJson from '../../elements/api/Json'

  export default {
    components: {
      appJson
    },
    created () {
      this.update()
    },
    methods: {
      ...mapActions([
        types.VALIDATOR_RUN
      ]),
      update () {
        if (this.SPEC_URL) {
          // TODO WORKAROUND doc PROPERTY
          this.VALIDATOR_RUN({url: this.SPEC_URL, json: this.$store.state.spec.doc})
        }
      }
    },
    computed: {
      ...mapGetters([
        types.SPEC_URL,
        types.SPEC_JSON,
        types.VALIDATOR
      ])
    },
    watch: {
      SPEC_URL: function () {
        this.update()
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../../assets/style/config/variables.styl'

  $margin-scroll := 48px

  .scroller
    overflow: scroll
    height 'calc(100vh - %s)' % ($margin-scroll + 64px)

    @media $mobile-portrait
      height 'calc(100vh - %s)' % ($margin-scroll + 56px)

    @media $mobile-landscape
      height 'calc(100vh - %s)' % ($margin-scroll + 48px)
</style>
