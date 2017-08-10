<template lang="pug">
  v-container(fluid :class="ERROR ? 'pa-0' : ''")
    v-alert.ma-0(error v-if="ERROR" value="true")
      .pre(v-if="!ERROR.message") {{JSON.stringify(ERROR, null, 2)}}
      span(v-if="ERROR.message") {{ERROR.message}}
    div(v-if="!SEARCH")
      h2.pa-3.mb-0.headline.hidden-sm-and-up(v-if="SPEC && SPEC.info") {{SPEC.info.title}}
      app-meta-list(:metas="METAS")
    app-resource-list(v-if="IS_GROUPED")
    app-operation-list(v-if="!IS_GROUPED")
    app-method-dialog
    app-status-dialog
    app-header-dialog
    app-security-dialog
    app-fab
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../../store/types'

  export default {
    components: {
      appMetaList: () => import('../MetaList'),
      appResourceList: () => import('../ResourceList'),
      appOperationList: () => import('../OperationList'),
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
        types.IS_GROUPED,
        types.OPERATIONS,
        types.RESOURCES,
        types.SPEC,
        types.SEARCH
      ])
    }
  }
</script>

<style scoped lang="stylus">
  .pre
    white-space pre
</style>
