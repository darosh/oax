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
      <v-btn icon>
        <v-icon>_view_columns</v-icon>
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

      <v-container fluid grid-list-xl>
        <v-layout row wrap>
          <v-flex xs12 sm6 md3 v-for="r in resources" :key="r.name">
            <app-resource :r="r"></app-resource>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
  </v-app>
</template>

<script>
  import { OAS } from './services/oas'
  import Loader from './services/loader'

  export default {
    components: {
      appMeta: () => import('./components/Meta'),
      appResource: () => import('./components/Resource')
    },
    data () {
      return {
        url: 'http://petstore.swagger.io/v2/swagger.json',
        schema: {},
        meta: [],
        resources: [],
        editing: false,
        search: ''
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
