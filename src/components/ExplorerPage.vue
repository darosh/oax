<template lang="pug">
  v-container(fluid)
    v-alert(error v-model="$store.state.error") {{$store.state.error}}
    app-meta-list(:metas='$store.state.metas')
    app-resource-list(v-if='$store.state.view.grouped', :resources='$store.state.resources')
    app-operation-list(v-if='!$store.state.view.grouped', :items='$store.state.operations')
    app-method-dialog
    app-status-dialog
    app-header-dialog
    app-proxy-dialog
    app-security-dialog
</template>

<script>
  export default {
    components: {
      appMetaList: () => import('./MetaList'),
      appResourceList: () => import('./ResourceList'),
      appOperationList: () => import('./OperationList'),

      appMethodDialog: () => import('./MethodDialog'),
      appStatusDialog: () => import('./StatusDialog'),
      appHeaderDialog: () => import('./HeaderDialog'),
      appProxyDialog: () => import('./ProxyDialog'),
      appSecurityDialog: () => import('./SecurityDialog')
    }
  }
</script>
