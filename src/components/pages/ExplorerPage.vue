<template lang="pug">
  v-container(fluid)
    v-alert(error v-model="ERROR") {{ERROR}}
    app-meta-list(:metas="METAS")
    app-resource-list(v-if="IS_GROUPED")
    app-operation-list(v-if="!IS_GROUPED")
    app-method-dialog
    app-status-dialog
    app-header-dialog
    app-proxy-dialog
    app-security-dialog
    v-btn(v-if="FAB" fab fixed bottom right class="fab--on-top")
      v-icon play_arrow
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
      appProxyDialog: () => import('../dialogs/ProxyDialog'),
      appSecurityDialog: () => import('../dialogs/SecurityDialog')
    },
    computed: {
      ...mapGetters([
        types.METAS,
        types.ERROR,
        types.IS_GROUPED,
        types.OPERATIONS,
        types.RESOURCES,
        types.FAB
      ])
    }
  }
</script>

<style lang="stylus">
  .fab--on-top
    z-index 4
</style>
