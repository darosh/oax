<template>
  <v-expansion-panel>
    <v-expansion-panel-content>
      <div slot="header">{{r.name}}</div>
      <v-card>
        <v-card-title>{{r.description}}</v-card-title>
        <v-card-text v-if="r.externalDocs && r.externalDocs.url">
          <a :href="r.externalDocs.url">{{r.externalDocs.description}}</a>
        </v-card-text>
        <v-card-text v-for="o in r._operations" :key="o._id">
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
    props: ['r'],
    methods: {
      selected (item) {
        bus.$emit('selected', item)
      }
    }
  }
</script>

<style scoped lang="stylus">
</style>
