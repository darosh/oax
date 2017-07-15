<template>
  <v-app>
    <app-toolbar v-model="that"></app-toolbar>
    <main>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 sm6 md3 pa-0 v-for="m in meta" v-if="m.value || m.download || m.image" :key="m.icon">
            <app-meta :m="m"></app-meta>
          </v-flex>
        </v-layout>
      </v-container>
      <app-resource-list v-if="viewResourceList" :resources="resources"></app-resource-list>
      <app-operation-list v-if="!viewResourceList"></app-operation-list>
    </main>
  </v-app>
</template>

<script>
  import { OAS } from './services/oas'
  import Loader from './services/loader'

  export default {
    components: {
      appMeta: () => import('./components/Meta'),
      appResourceList: () => import('./components/ResourceList'),
      appOperationList: () => import('./components/OperationList'),
      appToolbar: () => import('./components/Toolbar')
    },
    data () {
      return {
        url: 'http://petstore.swagger.io/v2/swagger.json',
        schema: {},
        meta: [],
        resources: [],
        search: '',
        viewResourceList: true,
        that: {}
      }
    },
    created () {
      this.that = this
      this.load()
    },
    methods: {
      load () {
        Loader.load(this.url).then(res => {
          this.schema = res
          this.spec = res.bundled
          const oas = new OAS(this.spec, this.url)
          this.meta = oas.meta
          this.resources = oas.resources
        }).catch(() => {
          this.schema = {}
        })
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
