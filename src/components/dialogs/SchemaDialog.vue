<template lang="pug">
  v-dialog(v-model="active" width="360" content-class="dialog--info")
    v-card
      v-toolbar.elevation-0.primary.white--text
        v-toolbar-title.main-title
          b {{name}}
        v-spacer
        v-toolbar-title
          span.subheader.white--text Schema
      v-tabs(grow :scrollable="false")
        v-tabs-bar.transparent
          v-tabs-item(href="tab-schema" v-ripple="") Schema
          v-tabs-item(href="tab-example" v-ripple="") Example
          v-tabs-item(href="tab-json" v-ripple="") Raw
          v-tabs-slider
        v-divider
        v-tabs-items
          v-tabs-content#tab-schema
            pre.app-example.pa-3(style="max-height: calc(70vh); overflow: auto")
              v-layout.ma-0
                v-spacer
                v-btn.btn--mini.transparent.elevation-0.btn--tool.mt-0.mr-0(@click.stop="expColSchema = !expColSchema") {{expColSchema ? 'Collapse' : 'Expand'}}
              .mt-4
              app-model(v-if="json", :item="json" v-model="expColSchema")
          v-tabs-content#tab-example
            pre.app-example.pa-3(style="max-height: calc(70vh); overflow: auto")
              v-layout.ma-0
                v-spacer
                v-btn.btn--mini.transparent.elevation-0.btn--tool.mt-0.mr-0(@click.stop="expColExample = !expColExample") {{expColExample ? 'Collapse' : 'Expand'}}
              app-example(v-if="json", :item="json" v-model="expColExample")
          v-tabs-content#tab-json
            pre.app-example.pa-3(style="max-height: calc(70vh); overflow: auto")
              v-layout.ma-0
                v-spacer
                v-btn.btn--mini.transparent.elevation-0.btn--tool.mt-0.mr-0(@click.stop="expColJson = !expColJson") {{expColJson ? 'Collapse' : 'Expand'}}
              app-json(v-if="json", :item="json" v-model="expColJson")
      v-card-actions
        v-btn(flat icon @click.native.stop="next(true)")
          v-icon keyboard_arrow_left
        v-btn(flat icon to="statuses" tag="a")
          v-icon list
        v-btn(flat icon @click.native.stop="next()")
          v-icon keyboard_arrow_right
        v-spacer
        v-btn.btn--short(flat @click.native.stop="UI_SET_DIALOG()") Close
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../../store/types'

  import dialog from '../../mixins/dialog'
  import appJson from '../parts/Json'
  import appExample from '../parts/Example'
  import appModel from '../parts/Model'

  export default {
    mixins: [dialog],
    components: {
      appJson,
      appExample,
      appModel
    },
    data () {
      return {
        dialog: 'schema',
        name: null,
        json: null,
        expColJson: null,
        expColExample: null,
        expColSchema: null,
        initialized: true
      }
    },
    computed: {
      ...mapGetters([
        types.SPEC,
        types.UI_DIALOG_PARAM,
        types.UI_DLG
      ])
    },
    methods: {
      show (name) {
        this.name = name
        this.json = this.SPEC.definitions[name]
      },
      next (prev) {
        let ms = Object.keys(this.SPEC.definitions)
        let ind = ms.indexOf(this.name) + (prev ? -1 : 1)
        ind = ind < 0 ? ms.length - 1 : ind >= ms.length ? 0 : ind
        this.show(ms[ind])
      }
    },
    watch: {
      UI_DIALOG_PARAM: function (name) {
        if (this.UI_DLG === 'schema') {
          this.show(name)
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .main-title.toolbar__title
    max-width: 220px
    font-family "Roboto Mono", monospace
</style>
