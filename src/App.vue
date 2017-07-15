<template>
  <v-app>
    <v-navigation-drawer
      persistent
      clipped
      v-model="drawerRight"
      right
      enable-resize-watcher
      overflow
      absolute></v-navigation-drawer>
    <app-toolbar v-model="that"></app-toolbar>
    <main>
      <app-meta-list :metas="metas"></app-meta-list>
      <app-resource-list v-if="viewResourceList" :resources="resources"
                         :description="viewDescription"></app-resource-list>
      <app-operation-list v-if="!viewResourceList" :description="viewDescription"></app-operation-list>
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
      appToolbar: () => import('./components/Toolbar')
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
        drawerRight: true
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
