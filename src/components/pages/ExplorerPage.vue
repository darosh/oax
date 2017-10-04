<template lang="pug">
  v-container.gpu(fluid :class="UI_ERROR ? 'pa-0' : ''")
    v-layout.ma-0(v-if="UI_LOADING")
      v-spacer
      v-flex.pt-2.pl-4.pr-4(xs12 sm6 md4 lg3 xl2 style="min-width: 300px; max-width: 600")
        v-progress-linear(:value="Math.round(UI_LOADING[0].done * 100)", :height="4", class="primary--text")
        app-log(:items="UI_LOADING")
      v-spacer
    v-alert.ma-0(error v-if="UI_ERROR" icon="warning" value="true")
      .pre(v-if="!UI_ERROR.message") {{JSON.stringify(ERROR, null, 2)}}
      span(v-if="UI_ERROR.message") {{UI_ERROR.message}}
    div(v-if="!SETTINGS_SEARCH && SPEC && SPEC.info && (VIEW_VIEW < 1)")
      v-container.pa-0-sm(fluid grid-list-xl v-if="SPEC.info._.description || SPEC.info.title")
        v-layout(column)
          v-flex
            v-expansion-panel.expansion-panel-round(v-if="SPEC.info._.description" expand :class="{'expansion-panel--disabled': !SPEC.info._.description}")
              v-expansion-panel-content.bg.relative(v-model="exp1", ripple)
                .title(slot="header") {{SPEC.info.title}}
                v-divider(v-if="SPEC.info._.description")
                v-card.bg(v-if="SPEC.info._.description")
                  v-card-text
                    .main-description(v-markdown="SPEC.info._")
            .title(v-else) {{SPEC.info.title}}

      app-meta-list(v-if="SPEC_METAS", :metas="SPEC_METAS")
    app-tag-list(:class="{wide: VIEW_WIDE}" v-if="VIEW_VIEW === 0")
    app-operation-list(:class="{wide: VIEW_WIDE}" v-else-if="VIEW_VIEW === 1")
    app-operation-table(v-else-if="VIEW_VIEW === 2")
    app-definitions(:class="{wide: VIEW_WIDE}" v-else-if="VIEW_VIEW === 3")
    app-documentation(v-else-if="VIEW_VIEW === 4")
    app-method-dialog
    app-status-dialog
    app-header-dialog
    app-security-dialog
    app-download-dialog
    app-generator-dialog
    app-schema-dialog
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as types from '../../store/types'

  import appLog from '../app/Log'
  import appMetaList from '../views/MetaList'
  import appTagList from '../views/TagList'

  import markdown from '../../directives/markdown'

  export default {
    directives: {
      markdown
    },
    components: {
      appLog,
      appMetaList,
      appTagList,
      appOperationList: () => import('../views/OperationList'),
      appOperationTable: () => import('../views/OperationTable'),
      appDocumentation: () => import('../views/Documentation'),
      appDefinitions: () => import('../views/Definitions'),
      appMethodDialog: () => import('../dialogs/MethodDialog'),
      appStatusDialog: () => import('../dialogs/StatusDialog'),
      appHeaderDialog: () => import('../dialogs/HeaderDialog'),
      appSecurityDialog: () => import('../dialogs/SecurityDialog'),
      appDownloadDialog: () => import('../dialogs/DownloadDialog'),
      appGeneratorDialog: () => import('../dialogs/GeneratorDialog'),
      appSchemaDialog: () => import('../dialogs/SchemaDialog')
    },
    data () {
      return {
        exp1: true
      }
    },
    computed: {
      ...mapGetters([
        types.SPEC_METAS,
        types.UI_ERROR,
        types.UI_LOADING,
        types.VIEW_VIEW,
        types.VIEW_WIDE,
        types.SPEC_OPERATIONS,
        types.SPEC_RESOURCES,
        types.SPEC,
        types.SETTINGS_SEARCH
      ])
    },
    methods: {
      ...mapActions([
        types.SPEC_SET_LOAD_URL
      ])
    },
    created () {
      if (this.$route.query.url) {
        //        this.SPEC_SET_LOAD_URL(this.$route.query.url)
      }
    },
    watch: {
      $route: function (value) {
        if (value.query.url) {
          this.SPEC_SET_LOAD_URL(value.query.url)
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .expansion-panel--disabled >>> .header__icon
    opacity 0.44

  .pre
    white-space pre
</style>
