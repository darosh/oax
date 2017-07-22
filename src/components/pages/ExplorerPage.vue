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
    v-btn(v-if="FAB", @click.native.stop="FAB_METHOD && FAB_METHOD()" fab fixed bottom right secondary :class="'white--text fab--on-top' + (FAB_PENDING ? ' fab--on-top--disabled' : '')")
      v-progress-circular(v-if="FAB_PENDING" indeterminate :width="3")
      v-icon(v-if="!FAB_PENDING" ) play_arrow
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
        types.FAB,
        types.FAB_METHOD,
        types.FAB_PENDING
      ])
    }
  }
</script>

<style lang="stylus">
  .fab--on-top
    z-index 4
    position fixed !important

  .fab--on-top.fab--on-top--disabled
    opacity 0.75
    pointer-events none
    box-shadow none
</style>
