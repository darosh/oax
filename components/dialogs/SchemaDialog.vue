<template lang="pug">
  v-dialog(v-model="active" max-width="360" content-class="dialog--info")
    v-card
      v-toolbar.elevation-0.transparent.primary--text
        v-toolbar-title.main-title
          b {{name}}
        v-spacer
        v-toolbar-title
          span.subheader Schema
      // TODO: missing initial tab bar
      v-tabs(grow :scrollable="false" v-model="tab")
        v-tab(href="#tab-schema" v-ripple="true") Schema
        v-tab(href="#tab-example" v-ripple="true") Example
        v-tab(href="#tab-json" v-ripple="true") Raw
      v-divider
      v-tabs-items(touchless v-model="tab")
        v-tab-item#tab-schema
          pre.app-example.pa-3(style="max-height: calc(70vh); overflow: auto")
            v-layout.ma-0
              v-spacer
              v-btn.btn--mini.transparent.elevation-0.btn--tool.mt-0.mr-0(@click.stop="expColSchema = !expColSchema") {{expColSchema ? 'Collapse' : 'Expand'}}
            .mt-4
            app-model(v-if="json", :item="json" v-model="expColSchema")
        v-tab-item#tab-example
          pre.app-example.pa-3(style="max-height: calc(70vh); overflow: auto")
            v-layout.ma-0
              v-spacer
              v-btn.btn--mini.transparent.elevation-0.btn--tool.mt-0.mr-0(@click.stop="expColExample = !expColExample") {{expColExample ? 'Collapse' : 'Expand'}}
            app-example(v-if="json", :item="json" v-model="expColExample")
        v-tab-item#tab-json
          pre.app-example.pa-3(style="max-height: calc(70vh); overflow: auto")
            v-layout.ma-0
              v-spacer
              v-btn.btn--mini.transparent.elevation-0.btn--tool.mt-0.mr-0(@click.stop="expColJson = !expColJson") {{expColJson ? 'Collapse' : 'Expand'}}
            app-json(v-if="json", :item="json" v-model="expColJson")
      v-card-actions
        v-btn(flat icon @click.native.stop="next(true)")
          v-icon keyboard_arrow_left
        v-btn(flat icon @click="VIEW_SET_VIEW(3); UI_SET_DIALOG()")
          v-icon list
        v-btn(flat icon @click.native.stop="next()")
          v-icon keyboard_arrow_right
        v-spacer
        v-btn.btn--short(flat @click.native.stop="UI_SET_DIALOG()") Close
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import * as types from '../../store/types'

  import dialog from '../mixins/dialog'
  import appJson from '../elements/api/Json'
  import appExample from '../elements/api/Example'
  import appModel from '../elements/api/Model'

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
        initialized: true,
        tab: 'tab-schema'
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
      ...mapMutations([
        types.VIEW_SET_VIEW
      ]),
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
    max-width: 240px
    font-family "Roboto Mono", monospace
</style>
