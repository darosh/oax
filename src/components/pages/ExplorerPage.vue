<template lang="pug">
  v-container(fluid :class="ERROR ? 'pa-0' : ''")
    v-layout.ma-0(v-if="LOADING" style="padding-top: calc(50vh - 64px)")
      v-spacer
      v-progress-circular(indeterminate :width="4", :size="28" class="primary--text")
      .subheading.secondary--text.ml-2(style="margin-top: 2px; min-width: 160px" v-if="LOADING && typeof (LOADING === 'string')") {{LOADING}}&hellip;
      v-spacer
    v-alert.ma-0(error v-if="ERROR" value="true")
      .pre(v-if="!ERROR.message") {{JSON.stringify(ERROR, null, 2)}}
      span(v-if="ERROR.message") {{ERROR.message}}
    div(v-if="!SEARCH")
      v-container.pa-0-sm(fluid grid-list-xl)
        v-layout(column)
          v-flex
            h2.pa-0.mb-0.headline(v-if="SPEC && SPEC.info && SPEC.info.title") {{SPEC.info.title}}
          v-flex.md(v-if="SPEC && SPEC.info && SPEC.info.description" v-html="md(SPEC.info)")
        .hidden-xs-only.mt-5(v-if="SPEC && SPEC.info && SPEC && SPEC.info.description")
          v-divider(v-if="SPEC && SPEC.info && SPEC && SPEC.info.description")
      app-meta-list(v-if="METAS", :metas="METAS")
    app-resource-list(:class="{wide: IS_WIDE}" v-if="IS_GROUPED === 0")
    app-operation-list(:class="{wide: IS_WIDE}" v-else-if="IS_GROUPED === 1")
    app-operation-table(v-else-if="IS_GROUPED === 2")
    app-documentation(v-else)
    app-method-dialog
    app-status-dialog
    app-header-dialog
    app-security-dialog
    app-fab
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as types from '../../store/types'

  import {md} from '../../services/md'

  export default {
    components: {
      appMetaList: () => import('../MetaList'),
      appResourceList: () => import('../ResourceList'),
      appOperationList: () => import('../OperationList'),
      appOperationTable: () => import('../OperationTable'),
      appDocumentation: () => import('../Documentation'),
      appMethodDialog: () => import('../dialogs/MethodDialog'),
      appStatusDialog: () => import('../dialogs/StatusDialog'),
      appHeaderDialog: () => import('../dialogs/HeaderDialog'),
      appSecurityDialog: () => import('../dialogs/SecurityDialog'),
      appFab: () => import('../FAB')
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
      ]),
      md
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
  .pre
    white-space pre
</style>
