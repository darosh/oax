<template>
  <v-toolbar fixed>
    <v-toolbar-items>
      <v-text-field v-bind:style="{width: editing ? 'inherit' : '24px'}"
                    prepend-icon="edit"
                    :prepend-icon-cb="edit"
                    v-model="value.url"
                    name="url"
                    label="Open API Specification URL"
                    single-line></v-text-field>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-text-field prepend-icon="search"
                    v-model="value.search"
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
    <v-btn icon @click.native="value.viewResourceList = !value.viewResourceList">
      <v-icon>{{value.viewResourceList ? '_view_columns' : 'view_comfy'}}</v-icon>
    </v-btn>
    <v-btn icon @click.native="value.viewDescription = !value.viewDescription">
      <v-icon>{{value.viewDescription ? 'speaker_notes_off' : 'speaker_notes'}}</v-icon>
    </v-btn>
    <v-btn icon @click.native.stop="proxy.show = true">
      <v-icon>security</v-icon>
    </v-btn>
    <v-btn icon @click.native.stop="security.show = true">
      <v-icon>vpn_key</v-icon>
    </v-btn>
    <v-btn icon @click.native.stop="value.dark = !value.dark">
      <v-icon>{{value.dark ? 'brightness_5' : 'brightness_4'}}</v-icon>
    </v-btn>

    <app-proxy v-model="proxy"></app-proxy>
    <app-security v-model="security"></app-security>
  </v-toolbar>
</template>

<script>
  export default {
    props: ['value'],
    components: {
      'appProxy': () => import('./Proxy'),
      'appSecurity': () => import('./Security')
    },
    data () {
      return {
        editing: false,
        proxy: {show: false},
        security: {show: false}
      }
    },
    methods: {
      edit () {
        this.editing = !this.editing
      }
    }
  }
</script>
