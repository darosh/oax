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
</template>

<script>
  export default {
    props: ['value'],
    data () {
      return {
        editing: false
      }
    },
    methods: {
      edit () {
        this.editing = !this.editing
      }
    }
  }
</script>
