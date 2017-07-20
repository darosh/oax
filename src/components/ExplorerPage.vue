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
  import { OAS } from '../models/oas'
  import { mapActions } from 'vuex'

  export default {
    components: {
      appMetaList: () => import('./MetaList'),
      appResourceList: () => import('./ResourceList'),
      appOperationList: () => import('./OperationList'),
      appToolbar: () => import('./Toolbar'),
      appDetail: () => import('./Detail'),
      appMethodDialog: () => import('./MethodDialog'),
      appStatusDialog: () => import('./StatusDialog'),
      appHeaderDialog: () => import('./HeaderDialog'),
      appProxyDialog: () => import('./ProxyDialog'),
      appSecurityDialog: () => import('./SecurityDialog')
    },
    data () {
      return {
        url: 'http://petstore.swagger.io/v2/swagger.json',
        drawer: false,
        small: window.innerWidth < 1260
      }
    },
    created () {
      window.addEventListener('resize', this.resize)
      this.loadUrl(this.url)
    },
    destroyed () {
      window.removeEventListener('resize', this.resize)
    },
    methods: {
      ...mapActions([
        'loadUrl'
      ]),
      selected (operation) {
        this.operation = operation
        this.drawer = true
      },
      resize () {
        this.small = window.innerWidth < 1260
      }
    },
    computed: {
      operation: {
        get () {
          return this.$store.state.operation
        }
      }
    },
    watch: {
      url: function () { this.load() },
      search: function () { OAS.filterSearch(this.resources, OAS.getSearch(this.search)) },
      operation: function (val) {
        this.selected(val)
      }
    }
  }
</script>
