<template lang="pug">
  v-container.pa-0-sm.gpu(fluid :class="UI_ERROR ? 'pa-0' : ''")
    v-layout(v-if="UI_LOADING")
      v-spacer
      v-flex.pt-2.px-4(xs12 sm6 md4 lg3 xl2 style="min-width: 300px; max-width: 600")
        v-progress-linear(:value="Math.round(UI_LOADING[0].done * 100)", :height="4", class="primary--text")
        app-log(:items="UI_LOADING" style="max-height: 5000em")
      v-spacer

    v-alert.ma-0(error v-if="UI_ERROR" icon="warning" value="true")
      .pre(v-if="!UI_ERROR.message") {{JSON.stringify(ERROR, null, 2)}}
      span(v-if="UI_ERROR.message") {{UI_ERROR.message}}

    template(v-if="!SETTINGS_SEARCH && SPEC && SPEC.info && (VIEW_VIEW < 1)")
      v-container.pa-0-sm(fluid grid-list-xl v-if="SPEC.info._.description || SPEC.info.title")
        v-layout(column)
          v-flex
            //- .hidden-sm-and-up.mt-3
            v-expansion-panel.mb-2.expansion-panel-round(v-if="SPEC.info._.description" expand :class="{'expansion-panel--disabled': !SPEC.info._.description}")
              v-expansion-panel-content.bg.relative(v-model="exp1", ripple)
                .title(slot="header") {{SPEC.info.title}}
                v-divider(v-if="SPEC.info._.description")
                v-card.bg(v-if="SPEC.info._.description")
                  v-card-text
                    .main-description(v-markdown="SPEC.info._")
            .title.pt-3.pb-3(v-else)
              span.pl-3.hidden-md-and-up(style="display: inline-block; width: 16px")
              span.pl-3.hidden-sm-and-up(style="display: inline-block; width: 8px")
              | {{SPEC.info.title}}

      app-meta-list(v-if="SPEC_METAS", :metas="SPEC_METAS")

    app-tag-list(:class="{wide: VIEW_WIDE}" v-if="VIEW_VIEW === 0")
    app-operation-list(:class="{wide: VIEW_WIDE}" v-else-if="VIEW_VIEW === 1")
    app-operation-table(v-else-if="VIEW_VIEW === 2")
    app-definitions(:class="{wide: VIEW_WIDE}" v-else-if="VIEW_VIEW === 3")
    app-documentation(v-else-if="VIEW_VIEW === 4")
    app-paths(v-else-if="VIEW_VIEW === 5")
    //- .hidden-sm-and-up.pb-3
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
  import * as types from '../store/types'

  import appLog from '../components/elements/misc/Log'
  import appMetaList from '../components/views/MetaList'
  import appTagList from '../components/views/TagList'

  import markdown from '../components/directives/markdown'
  import { configuration } from '../assets/scripts/services/configuration'

  export default {
    directives: {
      markdown
    },
    components: {
      appLog,
      appMetaList,
      appTagList,
      appOperationList: () => import('../components/views/OperationList'),
      appOperationTable: () => import('../components/views/OperationTable'),
      appDocumentation: () => import('../components/views/Documentation'),
      appPaths: () => import('../components/views/Paths'),
      appDefinitions: () => import('../components/views/Definitions'),
      appMethodDialog: () => import('../components/dialogs/MethodDialog'),
      appStatusDialog: () => import('../components/dialogs/StatusDialog'),
      appHeaderDialog: () => import('../components/dialogs/HeaderDialog'),
      appSecurityDialog: () => import('../components/dialogs/SecurityDialog'),
      appDownloadDialog: () => import('../components/dialogs/DownloadDialog'),
      appGeneratorDialog: () => import('../components/dialogs/GeneratorDialog'),
      appSchemaDialog: () => import('../components/dialogs/SchemaDialog')
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
      this.SPEC_SET_LOAD_URL(this.$route.query.url || configuration.url)
    },
    watch: {
      $route: function (value) {
        this.SPEC_SET_LOAD_URL(value.query.url || configuration.url)
      }
    }
  }
</script>
