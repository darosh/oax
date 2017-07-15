<template>
  <v-app :dark="dark">
    <v-navigation-drawer persistent v-model="drawerRight" right enable-resize-watcher overflow>
      <app-detail v-if="operation" :operation="operation"></app-detail>
    </v-navigation-drawer>
    <app-toolbar v-model="that"></app-toolbar>
    <main>
      <v-container fluid>
        <app-meta-list :metas="metas"></app-meta-list>
        <app-resource-list v-if="viewResourceList" :resources="resources"
                           :description="viewDescription"></app-resource-list>
        <app-operation-list v-if="!viewResourceList" :description="viewDescription"></app-operation-list>
      </v-container>
    </main>
  </v-app>
</template>

<script>
  import { OAS } from './services/oas'
  import Loader from './services/loader'
  import { bus } from './services/bus'

  export default {
    components: {
      appMetaList: () => import('./components/MetaList'),
      appResourceList: () => import('./components/ResourceList'),
      appOperationList: () => import('./components/OperationList'),
      appToolbar: () => import('./components/Toolbar'),
      appDetail: () => import('./components/Detail')
    },
    data () {
      return {
        url: 'http://petstore.swagger.io/v2/swagger.json',
        schema: {},
        metas: [],
        resources: [],
        search: '',
        viewResourceList: true,
        viewDescription: false,
        that: {},
        drawerRight: true,
        operation: null,
        dark: true
      }
    },
    created () {
      this.that = this
      this.load()
      bus.$on('selected', this.selected)
    },
    methods: {
      load () {
        Loader.load(this.url).then(res => {
          this.schema = res
          this.spec = res.bundled
          const oas = new OAS(this.spec, this.url)
          this.metas = oas.metas
          this.resources = oas.resources
        }).catch(() => {
          this.schema = {}
        })
      },
      selected (operation) {
        this.operation = operation
      }
    },
    watch: {
      url: function () { this.load() }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
