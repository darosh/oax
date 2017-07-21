<template lang="pug">
  v-container(fluid)
    v-alert(error v-model="ERROR") {{$store.state.error}}
    app-meta-list(:metas='METAS')
    app-resource-list(v-if='IS_GROUPED', :resources='RESOURCES')
    app-operation-list(v-if='!IS_GROUPED', :items='OPERATIONS')
    app-method-dialog
    app-status-dialog
    app-header-dialog
    app-proxy-dialog
    app-security-dialog
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
        types.RESOURCES
      ])
    }
  }
</script>
