<template lang="pug">
  v-container(fluid :class="ERROR ? 'pa-0' : ''")
    v-layout.ma-0(v-if="LOADING")
      v-spacer
      div.pt-2
        v-progress-linear(:value="Math.round(LOADING[0].done * 100)", :height="4", class="primary--text")
        app-log(:items="LOADING")
      v-spacer
    v-alert.ma-0(error v-if="ERROR" value="true")
      .pre(v-if="!ERROR.message") {{JSON.stringify(ERROR, null, 2)}}
      span(v-if="ERROR.message") {{ERROR.message}}
    div(v-if="!SEARCH && SPEC && SPEC.info")
      v-container.pa-0-sm(fluid grid-list-xl)
        v-layout(column)
          v-flex
            v-expansion-panel.expansion-panel-round(expand :class="{'expansion-panel--disabled': !SPEC.info._.description}")
              v-expansion-panel-content.bg.relative(v-model="exp1", ripple)
                .title(slot="header") {{SPEC.info.title}}
                v-divider(v-if="SPEC.info._.description")
                v-card.bg(v-if="SPEC.info._.description")
                  v-card-text
                    v-layout
                      div.main-description(v-markdown="SPEC.info._")

      app-meta-list(v-if="METAS", :metas="METAS")
    app-resource-list(:class="{wide: IS_WIDE}" v-if="IS_GROUPED === 0")
    app-operation-list(:class="{wide: IS_WIDE}" v-else-if="IS_GROUPED === 1")
    app-operation-table(v-else-if="IS_GROUPED === 2")
    app-documentation(v-else-if="IS_GROUPED === 3")
    app-definitions(v-else-if="IS_GROUPED === 4")
    app-method-dialog
    app-status-dialog
    app-header-dialog
    app-security-dialog
    app-fab
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as types from '../../store/types'

  import appLog from '../Log'
  import appMetaList from '../MetaList'
  import appResourceList from '../ResourceList'

  import markdown from '../../directives/markdown'

  export default {
    directives: {
      markdown
    },
    components: {
      appLog,
      appMetaList,
      appResourceList,
      appOperationList: () => import('../OperationList'),
      appOperationTable: () => import('../OperationTable'),
      appDocumentation: () => import('../Documentation'),
      appDefinitions: () => import('../Definitions'),
      appMethodDialog: () => import('../dialogs/MethodDialog'),
      appStatusDialog: () => import('../dialogs/StatusDialog'),
      appHeaderDialog: () => import('../dialogs/HeaderDialog'),
      appSecurityDialog: () => import('../dialogs/SecurityDialog'),
      appFab: () => import('../FAB')
    },
    data () {
      return {
        exp1: true
      }
    },
    computed: {
      ...mapGetters([
        types.METAS,
        types.ERROR,
        types.LOADING,
        types.IS_GROUPED,
        types.IS_WIDE,
        types.OPERATIONS,
        types.RESOURCES,
        types.SPEC,
        types.SEARCH
      ])
    },
    methods: {
      ...mapActions([
        types.LOAD_URL
      ])
    },
    created () {
      if (this.$route.query.url) {
        //        this.LOAD_URL(this.$route.query.url)
      }
    },
    watch: {
      $route: function (value) {
        if (value.query.url) {
          this.LOAD_URL(value.query.url)
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
