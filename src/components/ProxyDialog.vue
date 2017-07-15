<template>
  <v-dialog v-model="active">
    <v-card>
      <v-card-title>
        <span class="headline">Proxy</span>
      </v-card-title>
      <v-card-text>
        <v-text-field label="URL"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click.native="active = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { bus } from '../services/bus'

  export default {
    data () {
      return {
        active: false
      }
    },
    methods: {
      show () {
        this.active = true
      }
    },
    created () {
      bus.$on('dialog:proxy', this.show)
    },
    destroyed () {
      bus.$off('dialog:proxy', this.show)
    }
  }
</script>
