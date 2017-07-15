<template>
  <v-expansion-panel expand>
    <v-expansion-panel-content v-model="value._opened">
      <div slot="header" class="title">{{value.name}}</div>
      <v-card>
        <v-card-title v-if="value.description">{{value.description}}</v-card-title>
        <v-divider v-if="value.description"></v-divider>
        <v-card-text v-if="value.externalDocs && value.externalDocs.url">
          <a :href="value.externalDocs.url">{{value.externalDocs.description}}</a>
        </v-card-text>
        <v-divider v-if="value.externalDocs && value.externalDocs.url"></v-divider>
        <v-card-text v-for="o in value._operations" :key="o._id">
          <app-operation :o="o" @click.native="selected(o)"></app-operation>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
  import { bus } from '../services/bus'

  export default {
    components: {
      appOperation: () => import('./Operation')
    },
    props: ['value'],
    methods: {
      selected (item) {
        bus.$emit('selected', item)
      }
    }
  }
</script>

<style scoped lang="stylus">
</style>
