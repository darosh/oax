<template>
  <v-app>
    <v-toolbar fixed>
      <v-toolbar-items>
        <v-text-field v-bind:style="{width: this.editing ? 'inherit' : '24px'}"
                      prepend-icon="edit"
                      :prepend-icon-cb="edit"
                      v-model="url"
                      name="url"
                      label="Open API Specification URL"
                      single-line></v-text-field>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-text-field prepend-icon="search"
                      v-model="search"
                      name="search"
                      label="Search"
                      single-line></v-text-field>
      </v-toolbar-items>
      <v-btn icon>
        <v-icon>keyboard_arrow_down</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
      <v-btn icon @click.native="viewResourceList = !viewResourceList">
        <v-icon>{{viewResourceList ? '_view_columns' : 'view_comfy'}}</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>speaker_notes</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>security</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>vpn_key</v-icon>
      </v-btn>
    </v-toolbar>
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
      appOperationList: () => import('./components/OperationList')
    },
    data () {
      return {
        url: 'http://petstore.swagger.io/v2/swagger.json',
        schema: {},
        meta: [],
        resources: [],
        editing: false,
        search: '',
        viewResourceList: true
      }
    },
    created () {
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
      },
      edit () {
        this.editing = !this.editing
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
