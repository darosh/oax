<template lang="pug">
  div
    v-navigation-drawer(right overflow persistent v-model='drawer')
      app-detail(v-if='operation', :operation='operation')
    app-toolbar(v-model='that', v-on:open='open', v-on:close='close')
    main
      v-container(fluid)
        app-meta-list(:metas='metas')
        app-resource-list(v-if='$store.state.view.grouped', :resources='resources')
        app-operation-list(v-if='!$store.state.view.grouped', :items='operations')
    app-method-dialog
    app-status-dialog
    app-header-dialog
    app-proxy-dialog
    app-security-dialog
</template>

<script>
  import { OAS } from '../models/oas'
  import Loader from '../services/loader'

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
        schema: {},
        spec: {},
        metas: [],
        resources: [],
        search: '',
        that: {},
        operations: [],
        drawer: false,
        small: window.innerWidth < 1260
      }
    },
    created () {
      this.that = this
      this.load()
      window.addEventListener('resize', this.resize)
    },
    destroyed () {
      window.removeEventListener('resize', this.resize)
    },
    methods: {
      load () {
        Loader.load(this.url).then(res => {
          const oas = new OAS(res.bundled, this.url)
          this.metas = oas.metas
          this.resources = oas.resources
          this.operations = oas.operations
          this.spec = res.bundled
          this.schema = res
        }).catch(() => {
        })
      },
      selected (operation) {
        this.operation = operation
        this.drawer = true
      },
      open () {
        OAS.openAll(this.resources)
      },
      close () {
        OAS.openAll(this.resources, false)
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
